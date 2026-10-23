import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, Shell } from "@/components/shell";
import { useI18n, usePageTitle } from "@/lib/i18n";

export const Route = createFileRoute("/losninger")({
  head: () => ({
    meta: [
      { title: "Løsninger — G-PSI" },
      {
        name: "description",
        content: "Kunstig intelligens, finansiell intelligens, dataanalyse, automatisering, programvare og GovTech.",
      },
    ],
  }),
  component: Solutions,
});

function Solutions() {
  const { t, lang } = useI18n();
  usePageTitle(lang === "no" ? "Løsninger — G-PSI" : "Solutions — G-PSI");
  return (
    <Shell>
      <PageIntro kicker={t.solutions.kicker} title={t.solutions.title} lead={t.solutions.lead} />
      <div className="mx-auto max-w-6xl px-5 pb-24">
        {t.capabilities.map((item) => (
          <article key={item.id} id={item.id} className="scroll-mt-24 border-t border-line py-10">
            <h2 className="text-2xl font-medium text-fg">{item.title}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{item.text}</p>
          </article>
        ))}
      </div>
    </Shell>
  );
}
