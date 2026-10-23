import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { LogoFilm } from "@/components/logo-film";
import { Shell } from "@/components/shell";
import { useI18n, usePageTitle } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "G-PSI — GovTech Solutions" },
      {
        name: "description",
        content:
          "G-PSI bygger systemer for offentlig sektor: automatisering, analyse og programvare som kan forklares.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  const [hit, setHit] = useState<string | null>(null);
  usePageTitle(t.meta.homeTitle);

  return (
    <Shell>
      <section className="hero-stage flex min-h-svh flex-col px-5 pt-16">
        <div className="flex flex-1 items-center justify-center">
          <LogoFilm />
        </div>
        <div className="mx-auto w-full max-w-xl pb-12">
          <p className="text-center text-sm leading-relaxed text-muted">{t.hero.position}</p>
          <Ask onHit={setHit} />
        </div>
      </section>

      <section id="evner" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20">
        <p className="text-sm tracking-widest text-accent">{t.home.capabilitiesKicker}</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium text-fg">{t.home.capabilitiesTitle}</h2>
        <ol className="mt-10 divide-y divide-line border-y border-line">
          {t.capabilities.map((item, index) => (
            <li key={item.id} id={item.id} className="grid scroll-mt-24 gap-2 py-6 md:grid-cols-12 md:gap-8">
              <span className="text-sm text-metal md:col-span-2">0{index + 1}</span>
              <h3 className={hit === item.id ? "text-lg text-accent md:col-span-3" : "text-lg text-fg md:col-span-3"}>
                {item.title}
              </h3>
              <p className="leading-relaxed text-muted md:col-span-7">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-sm tracking-widest text-accent">{t.home.approachKicker}</p>
            <h2 className="mt-3 text-3xl font-medium text-fg">{t.home.approachTitle}</h2>
          </div>
          <ol className="space-y-6 md:col-span-8">
            {t.home.approach.map((line) => (
              <li key={line} className="border-l border-line pl-5 leading-relaxed text-muted">
                {line}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-20 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-medium text-fg">{t.home.ctaTitle}</h2>
            <p className="mt-3 max-w-xl text-muted">{t.home.ctaText}</p>
          </div>
          <Link
            to="/kontakt"
            className="inline-flex h-12 items-center border border-line px-6 text-sm text-fg hover:border-accent"
          >
            {t.home.cta}
          </Link>
        </div>
      </section>
    </Shell>
  );
}

function Ask({ onHit }: { onHit: (id: string | null) => void }) {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []);

  function onAsk(event: FormEvent) {
    event.preventDefault();
    const q = query.trim().toLowerCase();
    const match = t.capabilities.find((item) => item.keys.some((key) => q.includes(key)));
    onHit(match?.id ?? null);
    document.getElementById(match?.id ?? "evner")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (!ready) {
    return (
      <div className="mt-6 flex h-12 items-center gap-3 border-b border-line">
        <span className="h-4 w-px bg-accent" aria-hidden />
        <span className="text-muted">{t.hero.prompt}</span>
      </div>
    );
  }

  return (
    <form className="mt-6 flex items-center gap-3 border-b border-line" onSubmit={onAsk}>
      <span className="h-4 w-px bg-accent" aria-hidden />
      <label className="sr-only" htmlFor="ask">
        {t.hero.promptLabel}
      </label>
      <input
        id="ask"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={t.hero.prompt}
        className="h-12 w-full bg-transparent text-fg outline-none placeholder:text-muted"
      />
    </form>
  );
}
