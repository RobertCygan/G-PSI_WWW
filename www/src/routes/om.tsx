import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { useI18n, usePageTitle } from "@/lib/i18n";

export const Route = createFileRoute("/om")({
  head: () => ({
    meta: [
      { title: "Om G-PSI" },
      {
        name: "description",
        content: "G-PSI, GovTech Solutions. Hensikt, arbeidsmåte og ansvar.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { t, lang } = useI18n();
  usePageTitle(lang === "no" ? "Om G-PSI" : "About G-PSI");
  return (
    <Shell>
      <PageIntro kicker={t.about.kicker} title={t.about.title} lead={t.about.lead} />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 md:grid-cols-3">
        {t.about.items.map((item) => (
          <article key={item.title} className="border-t border-line pt-6">
            <h2 className="text-xl font-medium text-fg">{item.title}</h2>
            <p className="mt-4 leading-relaxed text-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </Shell>
  );
}
