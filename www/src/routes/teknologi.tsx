import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { useI18n, usePageTitle } from "@/lib/i18n";

export const Route = createFileRoute("/teknologi")({
  head: () => ({
    meta: [
      { title: "Teknologi — G-PSI" },
      {
        name: "description",
        content: "Ingeniørgrep, databehandling, KI, informasjonssikkerhet og arkitektur hos G-PSI.",
      },
    ],
  }),
  component: Technology,
});

function Technology() {
  const { t, lang } = useI18n();
  usePageTitle(lang === "no" ? "Teknologi — G-PSI" : "Technology — G-PSI");
  return (
    <Shell>
      <PageIntro kicker={t.technology.kicker} title={t.technology.title} lead={t.technology.lead} />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        {t.technology.items.map((item) => (
          <article key={item.title} className="grid gap-3 border-t border-line py-8 md:grid-cols-12">
            <h2 className="text-xl font-medium text-fg md:col-span-4">{item.title}</h2>
            <p className="leading-relaxed text-muted md:col-span-8">{item.text}</p>
          </article>
        ))}
      </div>
    </Shell>
  );
}
