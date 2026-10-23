import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { useI18n, usePageTitle } from "@/lib/i18n";

export const Route = createFileRoute("/prosjekter")({
  head: () => ({
    meta: [
      { title: "Prosjekter — G-PSI" },
      {
        name: "description",
        content:
          "Utvalgte utviklingsprosjekter, prototyper og konsepter. Ingen oppdiktede kundereferanser.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  const { t, lang } = useI18n();
  usePageTitle(lang === "no" ? "Prosjekter — G-PSI" : "Projects — G-PSI");
  return (
    <Shell>
      <PageIntro kicker={t.projects.kicker} title={t.projects.title} lead={t.projects.lead} />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        {t.projects.items.map((item) => (
          <article key={item.id} className="border-t border-line py-10">
            <p className="text-sm tracking-widest text-metal">{item.status}</p>
            <h2 className="mt-2 text-2xl font-medium text-fg">{item.title}</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted">{item.text}</p>
            <a href={item.href} className="mt-6 inline-flex h-11 items-center text-sm text-accent">
              {t.projects.open}
            </a>
          </article>
        ))}
      </div>
    </Shell>
  );
}
