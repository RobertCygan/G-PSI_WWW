import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, type Copy, type Lang } from "@/lib/copy";

type I18nValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Copy;
};

const I18nContext = createContext<I18nValue | null>(null);
const KEY = "gpsi-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("no");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "no") setLang(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = lang === "no" ? "nb" : "en";
    localStorage.setItem(KEY, lang);
  }, [lang, ready]);

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t: copy[lang] }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n outside provider");
  return value;
}

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
