import { useEffect, useState } from "react";
import Sidebar from "../../shared/Sidebar";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1600);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {loading ? (
                <div className="fixed inset-0 z-50 overflow-hidden bg-white flex items-center justify-center">

                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-[320px] h-[320px] rounded-full bg-orange-100/60 blur-3xl animate-pulse" />
                    </div>

                    {/* Loader content */}
                    <div className="relative flex flex-col items-center">

                        {/* Logo */}
                        <div className="relative flex items-center justify-center">

                            {/* Outer glow */}
                            <div className="absolute w-24 h-24 rounded-[28px] bg-orange-400/20 blur-xl animate-pulse" />

                            {/* Rotating ring */}
                            <div className="absolute -inset-3 rounded-[28px] border border-orange-200 border-t-orange-500 animate-spin [animation-duration:1.8s]" />

                            {/* Logo container */}
                            <div className="relative w-20 h-20 rounded-[24px] bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-300/40">

                                {/* Inner shine */}
                                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/25 to-transparent" />

                                <span className="relative text-white text-3xl font-bold tracking-tight">
                                    S
                                </span>
                            </div>
                        </div>

                        {/* Brand */}
                        <div className="mt-8 text-center">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                Sync<span className="text-orange-500">ovo</span>
                            </h1>

                            <p className="mt-2 text-sm text-gray-400">
                                Sync everything. Work smarter.
                            </p>
                        </div>

                        {/* Progress */}
                        <div className="mt-8 w-48">
                            <div className="h-1 w-full rounded-full bg-orange-100 overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-600 animate-[loading_1.6s_ease-in-out_forwards]" />
                            </div>

                            <div className="flex justify-between mt-2">
                                <span className="text-[11px] text-gray-400">
                                    Loading workspace
                                </span>

                                <span className="text-[11px] font-medium text-orange-500">
                                    Syncing
                                </span>
                            </div>
                        </div>

                        {/* Animated dots */}
                        <div className="flex gap-1 mt-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-300 animate-bounce" />
                        </div>
                    </div>

                    {/* Bottom branding */}
                    <div className="absolute bottom-8 left-0 right-0 text-center">
                        <p className="text-[11px] tracking-widest uppercase text-gray-300">
                            Your workspace is getting ready
                        </p>
                    </div>

                    {/* Custom animation */}
                    <style>
                        {`
                            @keyframes loading {
                                0% {
                                    width: 0%;
                                }
                                20% {
                                    width: 25%;
                                }
                                50% {
                                    width: 55%;
                                }
                                80% {
                                    width: 80%;
                                }
                                100% {
                                    width: 100%;
                                }
                            }
                        `}
                    </style>
                </div>
            ) : (
                <div className="animate-in fade-in duration-700">
                    <Sidebar />
                </div>
            )}
        </div>
    );
}
