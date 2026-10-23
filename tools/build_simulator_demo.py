#!/usr/bin/env python3
"""Lag simulator.html for nettsiden: G-PSI-simulatoren med de fiktive Fjordvik-dataene.

Inndata:
  --simulator  dist/simulator.html bygget i G-PSI-Web (tools/build_single.py simulator)
  --data       eiendomsskatt.html i dette depotet (Fjordvik-demoen med DATA, GEO og BUILDINGS)

Skriptet bytter ut Steigen-dataene og -logoen med Fjordvik, merker siden som demo,
og regner ut CSP-hashene på nytt. Resultatet skrives til simulator.html og
www/public/prosjekter/simulator.html.
"""

import argparse
import base64
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANNER = (
    '<div class="demo-banner" role="note"><b>Demo.</b> Fjordvik kommune finnes ikke. '
    "Grunnkretser, navn og skattetall er syntetiske.</div>"
)
DEMO_CSS = """<style>
.demo-banner{margin:0 0 16px;padding:10px 14px;border-radius:8px;font-size:13px;
  background:rgba(250,178,25,.08);border:1px solid rgba(250,178,25,.3);color:var(--text)}
.demo-banner b{color:var(--warn)}
#clientLogo{background:#fff;border-radius:8px;padding:4px 8px;box-sizing:content-box}
</style>"""


def js_value(source, name):
    """Les `const NAME = {...}` fra en skriptblokk som JSON."""
    start = re.search(rf"const {name}\s*=\s*", source)
    if not start:
        raise ValueError(f"Fant ikke {name} i datafilen")
    value, _ = json.JSONDecoder().raw_decode(source, start.end())
    return value


def js(value):
    text = json.dumps(value, ensure_ascii=False, separators=(",", ":"))
    return text.replace("<", "\\u003c").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")


def with_policy(html):
    hashes = [
        "'sha256-" + base64.b64encode(hashlib.sha256(body.encode()).digest()).decode() + "'"
        for body in re.findall(r"<script(?:\s[^>]*)?>([\s\S]*?)</script>", html)
        if body.strip()
    ]
    html, n = re.subn(
        r"(script-src 'self')[^;]*;", lambda m: m[1] + " " + " ".join(hashes) + ";", html, count=1
    )
    if not n:
        raise ValueError("Fant ikke CSP i simulatoren")
    return html


def build(simulator, data, outs):
    html = simulator.read_text(encoding="utf-8")
    source = data.read_text(encoding="utf-8")

    # Data: bytt skriptblokken med Steigen-dataene.
    payload = "\n".join(
        f"const {name}={js(js_value(source, name))};" for name in ("DATA", "GEO", "BUILDINGS")
    )
    html, n = re.subn(
        r"<script>\nconst DATA=[\s\S]*?</script>",
        lambda m: "<script>\n" + payload + "\n</script>",
        html,
        count=1,
    )
    if not n:
        raise ValueError("Fant ikke datablokken i simulatoren")

    # Logo og navn.
    logo = re.search(r'<img class="kommune-logo" id="kommuneLogo" src="([^"]+)"', source)
    if not logo:
        raise ValueError("Fant ikke Fjordvik-logoen")
    html = re.sub(
        r'(<img id="clientLogo" src=")[^"]+(" alt=")[^"]*(")',
        lambda m: m[1] + logo[1] + m[2] + "Fjordvik kommune (fiktiv)" + m[3],
        html,
        count=1,
    )
    # Bare hele ord, så innebygde base64-data ikke berøres.
    word = re.compile(r"(?<![A-Za-z0-9+/])Steigen(?![A-Za-z0-9+/])")
    head, body = html.split("<body", 1)
    parts = re.split(r"(<script[\s\S]*?</script>)", body)
    parts = [p if p.startswith("<script") else word.sub("Fjordvik", p) for p in parts]
    html = word.sub("Fjordvik (demo)", head) + "<body" + "".join(parts)
    html = html.replace(
        "Et analysekonsept fra G-PSI. Kommunens navn og våpen identifiserer datagrunnlaget.",
        "En demo fra G-PSI. Fjordvik kommune er fiktiv, og alle tall er syntetiske.",
    )
    # Databasesiden finnes ikke på nettsiden.
    html = re.sub(r'<button type="button" data-goto="database">Database</button\s*>', "", html)
    html = html.replace(
        '<main id="mainContent" tabindex="-1">',
        '<main id="mainContent" tabindex="-1">\n' + BANNER,
        1,
    )
    html = html.replace("</head>", DEMO_CSS + "\n</head>", 1)
    html = with_policy(html)
    for out in outs:
        out.write_text(html, encoding="utf-8")
        print(f"Skrev {out.relative_to(ROOT)} ({out.stat().st_size} byte)")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--simulator", type=Path, required=True)
    parser.add_argument("--data", type=Path, default=ROOT / "eiendomsskatt.html")
    args = parser.parse_args()
    build(
        args.simulator,
        args.data,
        [ROOT / "simulator.html", ROOT / "www/public/prosjekter/simulator.html"],
    )
