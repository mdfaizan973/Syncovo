import { CheckIcon, ChevronDownIcon, LanguagesIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import type { Language } from "../i18n";



type Position =
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";

type Props = {
    position?: Position;
};

const languages = [
    { code: "en", label: "English" },
    { code: "ja", label: "日本語" },
    { code: "fr", label: "Français" },
];

const positions = {
    "top-left": "top-5 left-5",
    "top-right": "top-5 right-5",
    "bottom-left": "bottom-5 left-5",
    "bottom-right": "bottom-5 right-5",
};

export default function Language({
    position = "bottom-right",
}: Props) {

    const [open, setOpen] = useState(false);

    const { lang, changeLanguage } = useTranslation();

    const selectedLanguage =
        languages.find((item) => item.code === lang);

    return (
        <div
            className={[
                "fixed z-50",
                positions[position],
            ].join(" ")}
        >

            <div className="relative">

                {/* Trigger */}
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="h-11 px-4 cursor-pointer rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/[0.03] flex items-center gap-3 hover:border-orange-200 hover:bg-white transition-all duration-200"
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
                        className={["w-4 h-4 text-gray-400 transition-transform duration-200",open ? "rotate-180" : "",].join(" ")}
                    />

                </button>

                {/* Dropdown */}
                {open && (
                    <div
                        className={[
                            "absolute w-56 rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/[0.06] overflow-hidden animate-[fadeUp_0.2s_ease]",
                            position.includes("bottom") ? "bottom-[56px]" : "top-[56px]",
                            position.includes("right") ? "right-0" : "left-0", ].join(" ")}
                    >

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
                                            active ? "bg-orange-50 text-orange-600": "text-gray-600 hover:bg-gray-50",].join(" ")}
                                    >

                                        <div className="flex items-center gap-3">

                                            <div
                                                className={[
                                                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                                                    active ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500",].join(" ")}
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
    );
}