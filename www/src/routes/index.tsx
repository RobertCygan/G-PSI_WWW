import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart3, ShieldCheck, Workflow } from "lucide-react";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { useI18n, usePageTitle } from "@/lib/i18n";

const serviceIds = ["data", "finance", "auto", "gov"] as const;
const shots: Record<(typeof serviceIds)[number], string> = {
  data: "/prosjekter/previews/steigen.jpg",
  finance: "/prosjekter/previews/skatt.jpg",
  auto: "/prosjekter/previews/kalkulator.jpg",
  gov: "/prosjekter/previews/laanndet.jpg",
};
const chipIcons = [BarChart3, Workflow, ShieldCheck];

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
  const works = t.projects.items;
  const [activeId, setActiveId] = useState(works[0]?.id ?? "");
  const active = works.find((item) => item.id === activeId) ?? works[0];
  const services = serviceIds
    .map((id) => t.capabilities.find((item) => item.id === id))
    .filter((item) => item !== undefined);

  return (
    <Shell>
      <section className="hero-stage">
        <img src="/brand/fjord.jpg?v=3" alt="" className="hero-photo" />
        <div className="hero-scrim" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 pt-28 pb-16 lg:grid-cols-12 lg:pt-32">
          <div className="hero-copy lg:col-span-5">
            <p className="text-xs tracking-[0.28em] text-accent">{t.hero.kicker}</p>
            <h1 className="mt-4 text-5xl font-medium leading-[0.95] text-white md:text-7xl">{t.hero.title}</h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75 md:text-lg">{t.hero.position}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#arbeider" className="cta">
                {t.hero.primary}
              </a>
              <Link to="/kontakt" className="cta cta-ghost">
                {t.hero.secondary}
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-3">
              {t.hero.chips.map((chip, index) => {
                const Icon = chipIcons[index] ?? BarChart3;
                return (
                  <li key={chip} className="chip">
                    <Icon size={16} aria-hidden />
                    {chip}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="os lg:col-span-7">
            <div className="os-bar">
              <img src="/brand/emblem.png" alt="" />
              <strong>G-PSI</strong>
              <span>{active?.file}</span>
            </div>
            <div className="os-grid">
              {works.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="os-tile"
                  aria-pressed={item.id === active?.id}
                  onClick={() => setActiveId(item.id)}
                >
                  <img src={item.preview} alt="" />
                  <span>
                    <b>{item.title}</b>
                    <small>{item.status}</small>
                  </span>
                </button>
              ))}
            </div>
            {active ? (
              <Link to="/prosjekter" hash={active.id} className="os-stage">
                <img src={active.preview} alt="" />
                <span>
                  <b>{active.title}</b>
                  <small>{t.home.openSurface}</small>
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs tracking-[0.28em] text-accent">{t.home.capabilitiesKicker}</p>
            <h2 className="mt-3 text-4xl font-medium leading-tight text-fg md:text-5xl">{t.home.capabilitiesTitle}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {services.map((item) => (
              <Link key={item.id} to="/losninger" hash={item.id} className="shot">
                <img src={shots[item.id as keyof typeof shots]} alt="" />
                <span>
                  <b>{item.title}</b>
                  <small>{item.text}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="arbeider" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.28em] text-accent">{t.home.worksKicker}</p>
              <h2 className="mt-3 text-4xl font-medium leading-tight text-fg md:text-5xl">{t.home.worksTitle}</h2>
            </div>
            <p className="max-w-xl leading-relaxed text-muted lg:col-span-7">{t.home.worksLead}</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {works.map((item) => (
              <Link key={item.id} to="/prosjekter" hash={item.id} className="shot shot-tall">
                <img src={item.preview} alt="" />
                <span>
                  <small>{item.status}</small>
                  <b>{item.title}</b>
                  <small>{item.file}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="band mx-auto grid max-w-7xl sm:grid-cols-2 lg:grid-cols-4">
          {works.map((item) => (
            <Link key={item.id} to="/prosjekter" hash={item.id} className="band-cell">
              <b>{item.title}</b>
              <span>{item.status}</span>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}
