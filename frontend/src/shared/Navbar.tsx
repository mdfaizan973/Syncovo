import { useState } from "react";

import {
    BellIcon,
    ChevronDownIcon,
    MenuIcon,
    SearchIcon,
    SettingsIcon,
    XIcon,
} from "lucide-react";

import Logo from "./Logo";
import { Button } from "../components/ui/button";
import { useTranslation } from "../hooks/useTranslation";


export default function Navbar() {
    const { t } = useTranslation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const navItems = [
        { label: t.navbar.links.home || "Dashboard", href: "#" },
        { label: t.navbar.links.features || "Features", href: "#" },
        { label: t.navbar.links.workspaces || "Workspaces", href: "#" },
    ];
    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-xl">

                <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                    {/* Left */}
                    <div className="flex items-center gap-10">

                        {/* Logo */}
                        <Logo />

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-1">

                            {navItems.map((item, index) => (
                                <button
                                    key={item.label}
                                    className={[
                                        "h-10 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                                        index === 0
                                            ? "bg-orange-50 text-orange-600"
                                            : "text-slate-500 hover:text-[#0f172a] hover:bg-gray-50",
                                    ].join(" ")}
                                >
                                    {item.label}
                                </button>
                            ))}

                        </nav>

                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* Search */}
                        <div className="hidden md:flex items-center gap-2 h-11 w-[240px] px-4 rounded-2xl border border-gray-100 bg-[#f8fafc]">

                            <SearchIcon className="w-4 h-4 text-slate-400" />

                            <input
                                type="text"
                                placeholder={t.navbar.search || "Search..."}
                                className="bg-transparent outline-none border-none w-full text-sm text-slate-600 placeholder:text-slate-400"
                            />

                        </div>

                        {/* Notification */}
                        <button className="relative h-11 w-11 rounded-2xl border border-gray-100 bg-white hover:bg-orange-50 hover:border-orange-100 transition-all duration-200 flex items-center justify-center">

                            <BellIcon className="w-5 h-5 text-slate-500" />

                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500" />

                        </button>

                        {/* Settings */}
                        <button className="hidden sm:flex h-11 w-11 rounded-2xl border border-gray-100 bg-white hover:bg-orange-50 hover:border-orange-100 transition-all duration-200 items-center justify-center">

                            <SettingsIcon className="w-5 h-5 text-slate-500" />

                        </button>

                        {/* Profile */}
                        <button className="hidden sm:flex items-center gap-3 h-11 pl-2.5 pr-3 rounded-2xl border border-gray-100 bg-white hover:border-orange-100 hover:bg-orange-50/40 transition-all duration-200">

                            <div className="w-8 h-8 rounded-xl bg-[#0f172a] flex items-center justify-center text-white text-xs font-bold">
                                F
                            </div>

                            <div className="text-left">
                                <p className="text-sm font-semibold text-[#0f172a] leading-none">
                                    Faizan
                                </p>

                                <p className="text-[11px] text-slate-400 mt-1 leading-none">
                                    User                </p>
                            </div>

                            <ChevronDownIcon className="w-4 h-4 text-slate-400" />

                        </button>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileOpen((prev) => !prev)}
                            className="lg:hidden h-11 w-11 rounded-2xl border border-gray-100 bg-white flex items-center justify-center"
                        >
                            {mobileOpen ? (
                                <XIcon className="w-5 h-5 text-slate-600" />
                            ) : (
                                <MenuIcon className="w-5 h-5 text-slate-600" />
                            )}
                        </button>

                    </div>

                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="lg:hidden border-t border-gray-100 bg-white animate-[fadeUp_0.25s_ease]">

                        <div className="px-4 py-4 space-y-2">

                            {/* Search */}
                            <div className="flex items-center gap-2 h-11 px-4 rounded-2xl border border-gray-100 bg-[#f8fafc] mb-4">

                                <SearchIcon className="w-4 h-4 text-slate-400" />

                                <input
                                    type="text"
                                    placeholder={t.navbar.search || "Search..."}
                                    className="bg-transparent outline-none border-none w-full text-sm text-slate-600 placeholder:text-slate-400"
                                />

                            </div>

                            {/* Nav Items */}
                            {navItems.map((item, index) => (
                                <button
                                    key={item.label}
                                    className={[
                                        "w-full h-11 px-4 rounded-2xl flex items-center text-sm font-semibold transition-all duration-200",
                                        index === 0
                                            ? "bg-orange-50 text-orange-600"
                                            : "text-slate-600 hover:bg-gray-50",
                                    ].join(" ")}
                                >
                                    {item.label}
                                </button>
                            ))}

                            {/* Mobile Profile */}
                            <div className="pt-4 mt-4 border-t border-gray-100">

                                <div className="flex items-center gap-3 px-2">

                                    <div className="w-10 h-10 rounded-2xl bg-[#0f172a] flex items-center justify-center text-white text-sm font-bold">
                                        F
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-[#0f172a]">
                                            Faizan
                                        </p>

                                        <p className="text-xs text-slate-400 mt-0.5">
                                            User
                                        </p>
                                    </div>

                                </div>

                                <div className="flex gap-2 mt-4">

                                    <Button
                                        fullWidth
                                        variant="secondary"
                                        leftIcon={<SettingsIcon />}
                                    >
                                        Settings
                                    </Button>

                                    <Button
                                        fullWidth
                                        leftIcon={<BellIcon />}
                                    >
                                        Notifications
                                    </Button>

                                </div>

                            </div>

                        </div>
                    </div>
                )}
            </header>
        </>
    );
}