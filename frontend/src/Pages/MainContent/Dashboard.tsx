import { useEffect, useState } from "react";
import Sidebar from "../../shared/Sidebar";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen">
            {loading ? (
                <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
                    <div className="flex flex-col items-center">

                        {/* Logo */}
                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-200">
                                <span className="text-white text-2xl font-bold">
                                    S
                                </span>
                            </div>

                            {/* Rotating border */}
                            <div className="absolute -inset-2 rounded-[20px] border-2 border-transparent border-t-orange-500 border-r-orange-300 animate-spin" />
                        </div>

                        {/* Brand */}
                        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
                            Sync<span className="text-orange-500">ovo</span>
                        </h1>

                        {/* Loading text */}
                        <p className="mt-2 text-sm text-gray-400">
                            Preparing your workspace
                        </p>

                        {/* Loading dots */}
                        <div className="flex items-center gap-1.5 mt-5">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-2 h-2 rounded-full bg-orange-400 animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-2 h-2 rounded-full bg-orange-300 animate-bounce" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in duration-500">
                    <Sidebar />
                </div>
            )}
        </div>
    );
}
