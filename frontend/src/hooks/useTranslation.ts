// hooks/useTranslation.ts

import { useEffect, useMemo, useState } from "react";
import { messages, type Language } from "../i18n";

const DEFAULT_LANGUAGE: Language = "en";
const STORAGE_KEY = "language";

export function useTranslation() {
    const [lang, setLang] = useState<Language>(DEFAULT_LANGUAGE);

    /* ─────────────────────────────
        Load language from localStorage
    ───────────────────────────── */
    useEffect(() => {
        const savedLanguage = localStorage.getItem(STORAGE_KEY);

        if (
            savedLanguage &&
            savedLanguage in messages
        ) {
            setLang(savedLanguage as Language);
        }
    }, []);

    /* ─────────────────────────────
        Save language
    ───────────────────────────── */
    const changeLanguage = (newLanguage: Language) => {
        localStorage.setItem(STORAGE_KEY, newLanguage);
        setLang(newLanguage);
    };

    /* ─────────────────────────────
        Current translations
    ───────────────────────────── */
    const t = useMemo(() => {
        return messages[lang];
    }, [lang]);

    return {
        lang,
        t,
        changeLanguage,
    };
}