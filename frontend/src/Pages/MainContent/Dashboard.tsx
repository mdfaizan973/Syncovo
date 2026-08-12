import { useEffect, useState } from "react";
import Sidebar from "../../shared/Sidebar";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen">
            {loading ? (
                <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
                    <div className="flex flex-col items-center animate-in fade-in duration-500">

                        <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg">
                                <span className="text-white text-2xl font-bold">
                                    F
                                </span>
                            </div>

                            <div className="absolute -inset-2 rounded-2xl border border-gray-200 animate-pulse" />
                        </div>

                        <h2 className="mt-6 text-lg font-semibold text-gray-900">
                            Welcome back
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Loading your dashboard
                        </p>

                        <div className="mt-5 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-900 animate-bounce [animation-delay:-0.3s]" />
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.15s]" />
                            <span className="h-1.5 w-1.5 rounded-full bg-gray-300 animate-bounce" />
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
