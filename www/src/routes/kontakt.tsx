import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageIntro, Shell } from "@/components/shell";
import { useI18n, usePageTitle } from "@/lib/i18n";

export const Route = createFileRoute("/kontakt")({
  head: () => ({
    meta: [
      { title: "Kontakt — G-PSI" },
      {
        name: "description",
        content: "Kontakt G-PSI. Skjemaet åpner e-post og lagrer ingenting på siden.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { t, lang } = useI18n();
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  usePageTitle(lang === "no" ? "Kontakt — G-PSI" : "Contact — G-PSI");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const org = String(data.get("org") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setReady(false);
      setError(t.contact.missing);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setReady(false);
      setError(t.contact.invalidEmail);
      return;
    }
    setError("");
    setReady(true);
    const subject = encodeURIComponent(`G-PSI — ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}${org ? `\n${org}` : ""}`);
    window.location.href = `mailto:${t.contact.address}?subject=${subject}&body=${body}`;
  }

  return (
    <Shell>
      <PageIntro kicker={t.contact.kicker} title={t.contact.title} lead={t.contact.lead} />
      <form className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 md:grid-cols-2" onSubmit={onSubmit} noValidate>
        <Field label={t.contact.name} name="name" autoComplete="name" />
        <Field label={t.contact.email} name="email" type="email" autoComplete="email" />
        <div className="md:col-span-2">
          <Field label={t.contact.org} name="org" autoComplete="organization" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-metal" htmlFor="message">
            {t.contact.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className="mt-2 w-full border border-line bg-raise px-4 py-3 text-fg outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <p className="max-w-2xl text-sm leading-relaxed text-muted">{t.contact.privacy}</p>
          {error ? (
            <p className="mt-4 text-sm text-accent" role="alert">
              {error}
            </p>
          ) : null}
          {ready ? <p className="mt-4 text-sm text-metal">{t.contact.ready}</p> : null}
          <button type="submit" className="mt-6 h-12 border border-line px-6 text-sm text-fg hover:border-accent">
            {t.contact.send}
          </button>
        </div>
      </form>
    </Shell>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block text-sm text-metal" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full border border-line bg-raise px-4 text-fg outline-none"
      />
    </div>
  );
}
