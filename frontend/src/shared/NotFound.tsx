import { ArrowLeftIcon, CompassIcon, HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import { useTranslation } from "../hooks/useTranslation";

export default function NotFound() {
    const { t } = useTranslation();

    const navigate = useNavigate();

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

            <div className="min-h-screen bg-white flex items-center justify-center px-6 py-10 font-sans">

                <div className="w-full max-w-md animate-[fadeUp_0.4s_ease_both]">

                    {/* Badge */}
                    <div className="flex justify-center mb-5">
                        <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full border border-orange-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse block" />
                            {t.notFound.badge || "Page Not Found"}
                        </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-3xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-sm">
                            <CompassIcon className="w-9 h-9 text-orange-500" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="text-center">

                        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#0f172a] leading-none">
                            404
                        </h1>

                        <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] mt-4 tracking-tight">
                            {t.notFound.title || "The page you’re looking for doesn’t exist."}
                        </h2>

                        <p className="text-sm sm:text-base leading-7 text-slate-500 mt-4">
                            {t.notFound.description || "The link may be broken, moved, or the page may no longer exist. Try navigating back or return to your workspace dashboard."}
                        </p>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">

                        <Button
                            fullWidth
                            size="lg"
                            onClick={() => navigate("/")}
                            leftIcon={<HomeIcon />}
                            className="font-semibold"
                        >
                            {t.notFound.buttons.home || "Go to Home"}
                        </Button>

                        <Button
                            fullWidth
                            size="lg"
                            variant="secondary"
                            onClick={() => navigate(-1)}
                            leftIcon={<ArrowLeftIcon />}
                            className="font-semibold"
                        >
                            {t.notFound.buttons.back || "Go Back"}
                        </Button>

                    </div>

                    {/* Bottom Card */}
                    <div className="mt-10 rounded-3xl border border-gray-100 bg-[#f8fafc] p-5 text-center">

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 mb-2">
                            {t.notFound.help.badge || "Need help?"}
                        </p>

                        <h3 className="text-sm font-semibold text-[#0f172a] leading-6">
                            {t.notFound.help.title || "If you believe this is a technical issue, contact your workspace administrator or support team."}
                        </h3>

                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-center gap-5 mt-10 pt-6 border-t border-gray-100">

                        {[t.notFound.links.privacy || "Privacy Policy", t.notFound.links.terms || "Terms of Use", t.notFound.links.support || "Support"].map((item) => (
                            <button
                                key={item}
                                type="button"
                                className="text-xs text-gray-300 hover:text-orange-500 font-medium transition-colors"
                            >
                                {item}
                            </button>
                        ))}

                    </div>

                </div>
            </div>
        </>
    );
}