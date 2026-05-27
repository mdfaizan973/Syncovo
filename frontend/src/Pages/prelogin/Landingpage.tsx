import { useNavigate } from "react-router-dom";
import {
    ArrowRight,
    CheckCircle2,
    Database,
    FileText,
    LayoutDashboard,
    StickyNote,
    Users,
    Zap,
    Shield,
    BarChart3,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import Logo from "../../shared/Logo";

const features = [
    {
        icon: Database,
        title: "Dynamic Databases",
        description:
            "Build custom tables and schemas on the fly. Define fields, types, and relationships without writing a single line of SQL.",
        color: "text-orange-500",
        bg: "bg-orange-50",
    },
    {
        icon: FileText,
        title: "Form Builder",
        description:
            "Drag-and-drop form creation with 10+ field types. Auto-generate keys, set validations, and deploy instantly.",
        color: "text-indigo-500",
        bg: "bg-indigo-50",
    },
    {
        icon: LayoutDashboard,
        title: "Smart Dashboards",
        description:
            "Real-time analytics with task tracking, team stats, and notifications — all in one unified workspace view.",
        color: "text-green-500",
        bg: "bg-green-50",
    },
    {
        icon: StickyNote,
        title: "Quick Notes",
        description:
            "Capture ideas instantly. Rich text notes with categories, favorites, and powerful search across all your content.",
        color: "text-yellow-500",
        bg: "bg-yellow-50",
    },
    {
        icon: Users,
        title: "Team Workspaces",
        description:
            "Invite editors and viewers, assign tasks, manage roles, and keep every team member in sync.",
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        icon: Zap,
        title: "Instant Filters",
        description:
            "NocoDB-style filter system with AND/OR groups, 6 operator types, and live previews on any table.",
        color: "text-purple-500",
        bg: "bg-purple-50",
    },
];



export default function LandingPage() {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F6F8FB] font-sans">

            {/* ── NAV ── */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">

                <div className="max-w-7xl mx-auto px-4 md:px-6">

                    <div className="flex items-center justify-between h-14">

                        {/* Logo */}
                        <div className="">
                            <Logo />
                        </div>

                        {/* CTA buttons */}
                        <div className="hidden md:flex items-center gap-2">

                            <button
                                onClick={() => navigate("/login")}
                                className="h-9 px-4 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                Log in
                            </button>

                            <button
                                onClick={() => navigate("/register")}
                                className="h-9 px-4 text-sm font-semibold rounded-lg border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 transition-all"
                            >
                                Get Started
                            </button>

                        </div>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500"
                            onClick={() => setMobileMenuOpen((v) => !v)}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-4 h-4" />
                            ) : (
                                <Menu className="w-4 h-4" />
                            )}
                        </button>

                    </div>

                    {/* Mobile menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-100 py-3 flex flex-col gap-1">

                            <div className="flex gap-2 pt-2 border-t border-gray-100 mt-1">

                                <button
                                    onClick={() => navigate("/login")}
                                    className="flex-1 h-9 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all"
                                >
                                    Log in
                                </button>

                                <button
                                    onClick={() => navigate("/register")}
                                    className="flex-1 h-9 text-sm font-semibold rounded-lg border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 transition-all"
                                >
                                    Get Started
                                </button>

                            </div>

                        </div>
                    )}

                </div>

            </nav>

            {/* ── HERO ── */}
            <section className="relative overflow-hidden">

                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-orange-100/40" />
                    <div className="absolute top-1/2 -left-48 w-[400px] h-[400px] rounded-full bg-indigo-100/30" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-20 md:pt-24 md:pb-28">

                    <div className="max-w-3xl mx-auto text-center">

                        <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-full px-3 py-1.5 mb-6">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                            <span className="text-xs font-medium text-orange-700">
                                Now with AI-powered workflow automation
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                            The workspace platform that works
                            <br />
                            <span className="text-orange-500">
                                the way your team works
                            </span>
                        </h1>

                        <p className="mt-5 text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
                            Build collaborative workspaces, manage projects, automate workflows, track tasks, and organize everything your team needs — all in one place.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">

                            <button
                                onClick={() => navigate("/register")}
                                className="w-full sm:w-auto h-11 px-6 text-sm font-semibold rounded-lg border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 transition-all flex items-center justify-center gap-2"
                            >
                                Start for free
                                <ArrowRight className="w-4 h-4" />
                            </button>

                            <button
                                onClick={() => navigate("/login")}
                                className="w-full sm:w-auto h-11 px-6 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-all"
                            >
                                Sign in to your workspace
                            </button>

                        </div>

                        <p className="mt-4 text-xs text-gray-400">
                            No credit card required · Free plan forever · Setup in 2 minutes
                        </p>

                    </div>

                </div>

            </section>

            {/* ── HERO DASHBOARD MOCKUP ── */}
            <div className="mt-14 relative max-w-5xl mx-auto">

                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl shadow-gray-200/60">

                    {/* Fake browser chrome */}
                    <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-300" />
                        <div className="w-3 h-3 rounded-full bg-yellow-300" />
                        <div className="w-3 h-3 rounded-full bg-green-300" />
                        <div className="flex-1 mx-4 bg-gray-100 rounded-md px-3 py-1 text-xs text-gray-400 text-center">
                            {window.location.href}dashboard
                        </div>
                    </div>

                    {/* Dashboard preview */}
                    <div className="bg-[#F6F8FB] p-3 md:p-4 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-3">

                        {/* Sidebar */}
                        <div className="hidden md:flex flex-col gap-1 bg-white rounded-xl border border-gray-100 p-3">

                            <div className="flex items-center gap-2 px-2 py-1.5 mb-2">
                                <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center">
                                    <LayoutDashboard className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs font-bold text-gray-800">Syncovo</span>
                            </div>

                            {[
                                { icon: LayoutDashboard, label: "Dashboard", active: true },
                                { icon: Database, label: "Projects", active: false },
                                { icon: FileText, label: "Workflows", active: false },
                                { icon: StickyNote, label: "Notes", active: false },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg cursor-pointer ${item.active
                                        ? "bg-orange-50 text-orange-600"
                                        : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    <item.icon className="w-3.5 h-3.5" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </div>
                            ))}

                        </div>

                        {/* Main area */}
                        <div className="flex flex-col gap-3">

                            {/* Welcome card */}
                            <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-orange-500 font-medium">Welcome Back 👋</p>
                                    <p className="text-sm font-bold text-gray-800 mt-0.5">Good Morning, Faizan</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-7 px-3 rounded-lg bg-black text-white text-xs font-medium flex items-center gap-1.5">
                                        <StickyNote className="w-3 h-3" />
                                        Quick Task
                                    </div>
                                </div>
                            </div>

                            {/* Mini stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {[
                                    { label: "Running Projects", value: "18", color: "text-orange-500", bg: "bg-orange-50", icon: Zap },
                                    { label: "Due Today", value: "5", color: "text-red-500", bg: "bg-red-50", icon: Shield },
                                    { label: "Completed", value: "42", color: "text-green-500", bg: "bg-green-50", icon: CheckCircle2 },
                                    { label: "Notifications", value: "9", color: "text-indigo-500", bg: "bg-indigo-50", icon: BarChart3 },
                                ].map((s) => (
                                    <div
                                        key={s.label}
                                        className="bg-white rounded-xl border border-gray-100 p-3"
                                    >
                                        <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center mb-2`}>
                                            <s.icon className={`w-3.5 h-3.5 ${s.color}`} />
                                        </div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wide">{s.label}</p>
                                        <p className={`text-lg font-bold ${s.color} mt-0.5`}>{s.value}</p>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* ── FEATURES ── */}
            <section
                id="features"
                className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24"
            >

                <div className="text-center max-w-2xl mx-auto mb-12">

                    <p className="text-[11px] font-medium uppercase tracking-widest text-orange-500 mb-3">
                        Everything you need
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        Manage everything in one place
                    </h2>

                    <p className="mt-4 text-gray-500 text-sm leading-relaxed">
                        From project planning to workflow automation — Syncovo helps teams stay productive and organized.
                    </p>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                    {features.map((feature) => (

                        <div
                            key={feature.title}
                            className="bg-white rounded-xl border border-gray-100 p-5 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 group"
                        >

                            <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                            </div>

                            <h3 className="text-sm font-bold text-gray-800 mb-1.5">
                                {feature.title}
                            </h3>

                            <p className="text-xs text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>

                        </div>

                    ))}

                </div>

            </section>

            <section className="bg-orange-500 py-14 md:py-20">

                <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">

                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Ready to streamline your workflow with Syncovo?
                    </h2>

                    <p className="mt-3 text-sm text-orange-100 leading-relaxed">
                        Join thousands of teams already using Syncovo to manage projects, collaborate efficiently, and boost productivity.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-7">

                        <button
                            onClick={() => navigate("/register")}
                            className="w-full sm:w-auto h-11 px-6 text-sm font-semibold rounded-lg bg-white text-orange-600 hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                        >
                            Create free account
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="w-full sm:w-auto h-11 px-6 text-sm font-medium rounded-lg border border-orange-400/60 text-white hover:bg-orange-600 transition-all"
                        >
                            Sign in
                        </button>

                    </div>

                </div>

            </section>

        </div>
    );
}