import { createFileRoute, Link } from "@tanstack/react-router";
import { LogoFilm } from "@/components/logo-film";
import { ProjectIndex } from "@/components/project-index";
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
  usePageTitle(t.meta.homeTitle);

  return (
    <Shell>
      <section className="hero-stage flex min-h-svh flex-col px-5 pt-16">
        <div className="flex flex-1 items-center justify-center">
          <LogoFilm />
        </div>
        <div className="mx-auto flex w-full max-w-6xl items-end justify-between gap-6 pb-10">
          <p className="max-w-md text-sm leading-relaxed text-muted">{t.hero.position}</p>
          <a href="#arbeider" className="shrink-0 text-sm tracking-widest text-metal">
            {t.home.worksKicker}
          </a>
        </div>
      </section>

      <section id="arbeider" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-sm tracking-widest text-accent">{t.home.worksKicker}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium text-fg">{t.home.worksTitle}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t.home.worksLead}</p>
          <div className="mt-10">
            <ProjectIndex />
          </div>
        </div>
      </section>

      <section id="evner" className="border-t border-line">
        <div className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16">
          <p className="text-sm tracking-widest text-accent">{t.home.capabilitiesKicker}</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium text-fg">{t.home.capabilitiesTitle}</h2>
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {t.capabilities.map((item, index) => (
              <li key={item.id} id={item.id} className="grid scroll-mt-24 gap-2 py-6 md:grid-cols-12 md:gap-8">
                <span className="text-sm text-metal md:col-span-2">0{index + 1}</span>
                <h3 className="text-lg text-fg md:col-span-3">{item.title}</h3>
                <p className="leading-relaxed text-muted md:col-span-7">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-12">
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
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between">
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
