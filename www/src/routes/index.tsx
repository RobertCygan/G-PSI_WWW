import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoFilm } from "@/components/logo-film";
import { Shell } from "@/components/shell";
import { useI18n, usePageTitle } from "@/lib/i18n";

const serviceIds = ["data", "finance", "auto", "gov"];

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
  usePageTitle(t.meta.homeTitle);
  const services = serviceIds
    .map((id) => t.capabilities.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <Shell>
      <section className="hero-stage relative px-5 pt-24 pb-8">
        <div className="hero-glow" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-6 lg:grid-cols-12">
          <div className="hero-copy lg:col-span-6">
            <p className="text-sm tracking-[0.22em] text-accent">{t.hero.kicker}</p>
            <h1 className="mt-4 max-w-xl text-4xl font-medium leading-[1.08] text-fg md:text-6xl">{t.hero.title}</h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{t.hero.position}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#arbeider"
                className="inline-flex h-12 items-center bg-accent px-6 text-sm font-medium text-bg"
              >
                {t.hero.primary}
              </a>
              <Link
                to="/kontakt"
                className="inline-flex h-12 items-center border border-line px-6 text-sm text-fg hover:border-accent"
              >
                {t.hero.secondary}
              </Link>
            </div>
          </div>
          <div className="hero-mark lg:col-span-6">
            <LogoFilm />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-14 md:grid-cols-2 xl:grid-cols-4">
          {services.map((item) => (
            <Link key={item.id} to="/losninger" hash={item.id} className="glow-card block p-5">
              <p className="text-xs tracking-widest text-accent">{item.title}</p>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="arbeider" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-sm tracking-widest text-accent">{t.home.worksKicker}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium text-fg md:text-4xl">{t.home.worksTitle}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t.home.worksLead}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {t.projects.items.map((item) => (
              <Link key={item.id} to="/prosjekter" hash={item.id} className="glow-card group block overflow-hidden">
                <img
                  src={item.preview}
                  alt=""
                  className="aspect-video w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex items-end justify-between gap-4 p-5">
                  <div>
                    <p className="text-xs tracking-widest text-accent">{item.status}</p>
                    <h3 className="mt-2 text-xl text-fg">{item.title}</h3>
                    <p className="mt-1 text-sm text-metal">{item.file}</p>
                  </div>
                  <span className="text-sm text-accent">{t.home.openSurface}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-sm tracking-widest text-accent">{t.home.approachKicker}</p>
            <h2 className="mt-3 text-3xl font-medium text-fg">{t.home.approachTitle}</h2>
          </div>
          <ol className="space-y-6 md:col-span-8">
            {t.home.approach.map((line, index) => (
              <li key={line} className="border-l border-accent/40 pl-5 leading-relaxed text-muted">
                <span className="mb-1 block text-xs tracking-widest text-metal">0{index + 1}</span>
                {line}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-medium text-fg">{t.home.ctaTitle}</h2>
            <p className="mt-3 max-w-xl text-muted">{t.home.ctaText}</p>
          </div>
          <Link
            to="/kontakt"
            className="inline-flex h-12 items-center bg-accent px-6 text-sm font-medium text-bg"
          >
            {t.home.cta}
          </Link>
        </div>
      </section>
    </Shell>
  );
}
