import { createFileRoute } from "@tanstack/react-router";
import { ProjectIndex } from "@/components/project-index";
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
        <ProjectIndex live />
      </div>
    </Shell>
  );
}
