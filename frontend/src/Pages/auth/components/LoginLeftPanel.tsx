import {
    LayoutDashboardIcon,
    DatabaseIcon,
} from "lucide-react";
import { CardContent, Card } from "../../../components/ui/card";
import Logo from "../../../shared/Logo";
import { useTranslation } from "../../../hooks/useTranslation";



export default function LoginLeftPanel() {
    const { t } = useTranslation();

    const features = [
        {
            icon: <LayoutDashboardIcon className="w-4 h-4" />,
            title: t.brandPanel.features.dynamicWorkspaces.title || "Dynamic Workspaces",
            desc: t.brandPanel.features.dynamicWorkspaces.description || "Flexible workflows and boards tailored for every team.",
        },
        {
            icon: <DatabaseIcon className="w-4 h-4" />,
            title: t.brandPanel.features.customTables.title || "Custom Tables",
            desc: t.brandPanel.features.customTables.description || "Create tables, forms, and fields without fixed schemas.",
        },
    ];
    return (
        <div className="relative flex flex-col justify-between min-h-screen bg-[#f8fafc] px-6 py-4 lg:px-12 overflow-hidden">

            <div className="relative z-10">

                {/* Logo */}
                <Logo />

                {/* Hero */}
                <div className="max-w-md mb-8">

                    <h1 className="text-[30px] leading-[1.15] tracking-tight font-black text-[#0f172a] mt-5">
                        {t.brandPanel.hero.title.line1 || "Manage projects"}
                        <br />
                        {t.brandPanel.hero.title.line2 || "with clarity."}
                    </h1>

                    <p className="text-sm leading-7 text-slate-600 mt-4">
                        {t.brandPanel.hero.description || "Syncovo is a modern multi-user task management platform inspired by tools like Notion, Trello, and NocoDB — built for flexible workflows, dynamic tables, and real-time collaboration."}
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="space-y-2 max-w-lg">

                    {features.map((feature) => (
                        <Card
                            key={feature.title}
                            hoverable
                            className="bg-white/80 backdrop-blur-sm"
                            variant="outlined"
                        >
                            <CardContent className="flex items-start gap-4">

                                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#f97316] flex items-center justify-center flex-shrink-0">
                                    {feature.icon}
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-[#0f172a]">
                                        {feature.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 leading-6 mt-1">
                                        {feature.desc}
                                    </p>
                                </div>

                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Bottom Info Card */}
            <div className="relative z-10 mt-8 max-w-lg">

                <Card
                    variant="filled"
                    className="border-orange-100 bg-orange-50/70 backdrop-blur-sm"
                >
                    <CardContent>

                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 mb-3">
                            {t.brandPanel.bottomCard.badge || "Built for modern teams"}
                        </p>

                        <h3 className="text-base font-semibold text-[#0f172a] leading-7">
                            {t.brandPanel.bottomCard.title || "Create custom workflows, manage teams, and organise projects seamlessly from a single collaborative workspace."}
                            
                        </h3>

                        <div className="flex items-center gap-3 mt-3">

                            {/* Avatar Stack */}
                            <div className="flex -space-x-2">
                                {["A", "R", "P"].map((item) => (
                                    <div
                                        key={item}
                                        className="w-8 h-8 rounded-full border-2 border-white bg-[#1e293b] flex items-center justify-center text-white text-[11px] font-bold"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>

                            <p className="text-sm text-slate-600">
                                {t.brandPanel.bottomCard.description || "Trusted by growing startups and collaborative teams."}
                            </p>

                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}