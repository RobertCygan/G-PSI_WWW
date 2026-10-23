import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

export function ProjectIndex({ live }: { live?: boolean }) {
  const { t } = useI18n();
  const items = t.projects.items;
  const [id, setId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (items.some((item) => item.id === hash)) setId(hash);
  }, [items]);

  const item = items.find((entry) => entry.id === id) ?? items[0];
  if (!item) return null;

  function choose(next: string) {
    setId(next);
    const url = `${window.location.pathname}${window.location.search}#${next}`;
    window.history.replaceState(null, "", url);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <ol className="lg:col-span-4">
        {items.map((entry, index) => {
          const on = entry.id === item.id;
          return (
            <li key={entry.id} className="border-t border-line">
              <button
                type="button"
                className={on ? "work-btn w-full py-4 text-left text-fg" : "work-btn w-full py-4 text-left text-muted"}
                aria-pressed={on}
                onClick={() => choose(entry.id)}
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="text-xs tracking-widest text-metal">0{index + 1}</span>
                  <span className="text-xs tracking-widest">{entry.status}</span>
                </span>
                <span className="mt-2 block text-lg text-fg">{entry.title}</span>
                <span className="mt-1 block text-xs tracking-wide text-metal">{entry.file}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="lg:col-span-8">
        <p className="max-w-xl leading-relaxed text-muted">{item.text}</p>
        <div className="surface mt-5">
          <div className="surface-bar">
            <span>{item.file}</span>
            <a href={item.href} target="_blank" rel="noreferrer">
              {t.projects.open}
            </a>
          </div>
          {live ? (
            <iframe title={item.title} src={item.href} className="h-[min(78svh,880px)] w-full bg-white" />
          ) : (
            <img src={item.preview} alt="" className="aspect-video w-full object-cover object-top" />
          )}
        </div>
        {live ? (
          <p className="mt-3 text-sm text-metal">{t.projects.running}</p>
        ) : (
          <Link
            to="/prosjekter"
            hash={item.id}
            className="mt-5 inline-flex h-12 items-center border border-line px-6 text-sm text-fg hover:border-accent"
          >
            {t.home.openSurface}
          </Link>
        )}
      </div>
    </div>
  );
}
