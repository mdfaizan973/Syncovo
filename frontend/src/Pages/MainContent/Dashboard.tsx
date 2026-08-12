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

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center">
                    
                    {/* Logo / Loader */}
                    <div className="relative flex items-center justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center shadow-xl">
                            <span className="text-white text-2xl font-bold">
                                F
                            </span>
                        </div>

                        {/* Spinner */}
                        <div className="absolute -inset-2 rounded-2xl border-2 border-transparent border-t-black animate-spin" />
                    </div>

                    {/* Loading text */}
                    <div className="mt-6 text-center">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Loading Dashboard
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Preparing everything for you...
                        </p>
                    </div>

                    {/* Loading dots */}
                    <div className="flex gap-1.5 mt-4">
                        <span className="w-2 h-2 rounded-full bg-gray-900 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" />
                    </div>
                </div>
            </div>
        );
    }

    return <Sidebar />;
}
