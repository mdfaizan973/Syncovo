import { useState } from "react";
import {
  LanguagesIcon,
  ChevronDownIcon,
  CheckIcon,
} from "lucide-react";

import BrandPanel from "../components/widgets/BrandPanel";
import AuthPanel from "./components/AuthPanel";
import { useTranslation } from "../../hooks/useTranslation";
import type { Language } from "../../i18n";

const languages = [
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "fr", label: "Français" },
  // { code: "de", label: "Deutsch" },
  // { code: "es", label: "Español" },
  // { code: "hi", label: "हिन्दी" },
];

export default function Login() {
  // const [lang, setLang] = useState("en");
  const [open, setOpen] = useState(false);
  const { lang, changeLanguage } = useTranslation();

  const selectedLanguage =
    languages.find((item) => item.code === lang);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="relative flex flex-col lg:flex-row min-h-screen font-sans bg-[#f8fafc]">

        {/* ─────────────────────────────
            Language Switcher
        ───────────────────────────── */}
        <div className="absolute top-5 right-5 z-50">

          <div className="relative">

            {/* Trigger */}
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="h-11 px-4 cursor-pointer rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm flex items-center gap-3 hover:border-orange-200 hover:bg-white transition-all duration-200"
            >

              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                <LanguagesIcon className="w-4 h-4" />
              </div>

              <div className="flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold leading-none">
                  Language
                </span>

                <span className="text-sm font-semibold text-gray-700 leading-none mt-1">
                  {selectedLanguage?.label}
                </span>
              </div>

              <ChevronDownIcon
                className={[
                  "w-4 h-4 text-gray-400 transition-transform duration-200",
                  open ? "rotate-180" : "",
                ].join(" ")}
              />

            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute top-[56px] right-0 w-56 rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-100 overflow-hidden animate-[fadeUp_0.2s_ease]">

                <div className="p-2">

                  {languages.map((item) => {
                    const active = item.code === lang;

                    return (
                      <button
                        key={item.code}
                        onClick={() => {
                          changeLanguage(item.code as Language);
                          setOpen(false);
                        }}
                        className={[
                          "w-full cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-150",
                          active
                            ? "bg-orange-50 text-orange-600"
                            : "text-gray-600 hover:bg-gray-50",
                        ].join(" ")}
                      >

                        <div className="flex items-center gap-3">

                          <div
                            className={[
                              "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                              active
                                ? "bg-orange-100 text-orange-600"
                                : "bg-gray-100 text-gray-500",
                            ].join(" ")}
                          >
                            {item.code.toUpperCase()}
                          </div>

                          <span className="font-medium">
                            {item.label}
                          </span>

                        </div>

                        {active && (
                          <CheckIcon className="w-4 h-4 text-orange-500" />
                        )}

                      </button>
                    );
                  })}

                </div>
              </div>
            )}
          </div>
        </div>

        {/* Left — Brand Panel */}
        <div className="hidden lg:flex lg:w-5/12 xl:w-[46%] flex-col flex-shrink-0">
          <BrandPanel />
        </div>

        {/* Right — Auth Panel */}
        <div className="flex-1 flex flex-col">
          <AuthPanel />
        </div>

      </div>
    </>
  );
}