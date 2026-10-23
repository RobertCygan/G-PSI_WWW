import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";

const links = [
  { to: "/", key: "home" },
  { to: "/losninger", key: "solutions" },
  { to: "/prosjekter", key: "projects" },
  { to: "/teknologi", key: "technology" },
  { to: "/om", key: "about" },
  { to: "/kontakt", key: "contact" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="min-h-svh bg-bg text-fg">
      <a href="#innhold" className="skip">
        {t.nav.skip}
      </a>
      <Header />
      <div id="innhold">{children}</div>
      <Footer />
    </div>
  );
}

function Header() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const labels = t.nav;

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-[#01060e]/45 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/brand/emblem.png" alt="" className="h-9 w-9 object-contain" />
          <span className="leading-tight">
            <span className="block text-sm font-medium tracking-widest text-metal">G-PSI</span>
            <span className="hidden text-[10px] tracking-[0.18em] text-muted sm:block">GOVTECH SOLUTIONS</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label={labels.menu}>
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm text-white/70 hover:text-white"
              activeProps={{ className: "rounded-full bg-white/10 px-3 py-2 text-sm text-white" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {labels[item.key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <Link to="/kontakt" className="cta cta-nav hidden md:inline-flex">
            {labels.contact}
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center text-fg md:hidden"
            aria-expanded={open}
            aria-label={open ? labels.close : labels.menu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-line px-5 py-3 md:hidden" aria-label={labels.menu}>
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block py-3 text-fg"
              onClick={() => setOpen(false)}
            >
              {labels[item.key]}
            </Link>
          ))}
          <p className="sr-only">{lang}</p>
        </nav>
      ) : null}
    </header>
  );
}

function LangSwitch() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="flex items-center" role="group" aria-label={t.nav.lang}>
      <button
        type="button"
        className={lang === "no" ? "h-11 px-3 text-sm text-fg" : "h-11 px-3 text-sm text-muted"}
        aria-pressed={lang === "no"}
        onClick={() => setLang("no")}
      >
        NO
      </button>
      <span className="text-line" aria-hidden>
        /
      </span>
      <button
        type="button"
        className={lang === "en" ? "h-11 px-3 text-sm text-fg" : "h-11 px-3 text-sm text-muted"}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}

function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.note}</p>
        <a
          className="text-metal hover:text-fg"
          href="https://github.com/RobertCygan/G-PSI_WWW"
          rel="noreferrer"
        >
          {t.footer.repo}
        </a>
      </div>
    </footer>
  );
}

export function PageIntro({ kicker, title, lead }: { kicker: string; title: string; lead: string }) {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-28 pb-10">
      <p className="text-sm tracking-widest text-accent">{kicker}</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-medium leading-tight text-fg md:text-5xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lead}</p>
    </header>
  );
}
