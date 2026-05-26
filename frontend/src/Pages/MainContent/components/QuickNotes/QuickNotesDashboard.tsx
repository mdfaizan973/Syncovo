import { useMemo, useState } from "react";
import {
    LayoutGrid,
    Table2,
    Search,
    Star,
    Clock3,
    FileText,
    Trash,
    Edit,
    MoreHorizontal,
    Plus,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "../../../../components/ui/card";

import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function QuickNotesDashboard() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("all");
    const [view, setView] = useState<"table" | "grid">("table");

    const notes = [
        {
            title: "Product Sprint Planning",
            description: "Finalize sprint goals, assign backend APIs, and review dashboard improvements for the next release cycle.",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
            updated: "2h ago",
            created_by: "Faizan",
            favorite: true,
            color: "bg-orange-50",
            created_at: "2026-05-26",
            updated_at: "2026-05-26",
        },
        {
            title: "Dashboard UX Improvements",
            description: "Reduce white spaces, improve spacing consistency and optimize responsive card layouts.",
            content: "UI alignment improvements and spacing refinements.",
            updated: "5h ago",
            created_by: "Faizan",
            favorite: false,
            color: "bg-blue-50",
            created_at: "2026-05-24",
            updated_at: "2026-05-25",
        },
        {
            title: "Realtime Notifications",
            description: "Socket events and notification syncing logic for task updates.",
            content: "Implement websocket handling and optimistic updates.",
            updated: "Yesterday",
            created_by: "Faizan",
            favorite: true,
            color: "bg-green-50",
            created_at: "2026-05-20",
            updated_at: "2026-05-25",
        },
        {
            title: "Team Meeting Notes",
            description: "Discuss onboarding flow, analytics widgets and API integration progress.",
            content: "Review action items for next sprint.",
            updated: "2d ago",
            created_by: "Faizan",
            favorite: false,
            color: "bg-purple-50",
            created_at: "2026-05-18",
            updated_at: "2026-05-24",
        },
    ];

    const filteredNotes = useMemo(() => {
        if (activeTab === "favorites") {
            return notes.filter((note) => note.favorite);
        }

        return notes;
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6">
            <div className="max-w-[1600px] mx-auto flex flex-col gap-4">

                {/* Header */}
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 p-5">

                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                        <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-orange-500" />
                                </div>

                                <p className="text-xs font-bold tracking-[0.15em] text-orange-500 uppercase">
                                    Workspace Notes
                                </p>
                            </div>

                            <h1 className="text-2xl md:text-[28px] font-black tracking-tight text-[#1F2937] leading-tight">
                                Quick Notes
                            </h1>

                            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                Manage meeting notes, sprint plans and workspace documents.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">

                            <div className="w-full sm:w-[300px]">
                                <Input
                                    placeholder="Search notes..."
                                    leftIcon={<Search className="w-4 h-4" />}
                                    variant="filled"
                                />
                            </div>

                            <Button
                                variant="primary"
                                leftIcon={<Plus className="w-4 h-4" />}
                                className="whitespace-nowrap shadow-sm"
                                onClick={() => navigate("/dashboard/create-note")}
                            >
                                Create Note
                            </Button>
                        </div>
                    </div>

                    {/* Tabs + View */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mt-4 pt-4 border-t border-gray-100">

                        {/* Tabs */}
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">

                            <button
                                onClick={() => setActiveTab("all")}
                                className={[
                                    "h-10 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap",
                                    activeTab === "all"
                                        ? "bg-orange-500 text-white shadow-sm"
                                        : "bg-white border border-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-500"
                                ].join(" ")}
                            >
                                All Notes
                            </button>

                            <button
                                onClick={() => setActiveTab("favorites")}
                                className={[
                                    "h-10 px-4 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap",
                                    activeTab === "favorites"
                                        ? "bg-orange-500 text-white shadow-sm"
                                        : "bg-white border border-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-500"
                                ].join(" ")}
                            >
                                <Star className="w-4 h-4" />
                                Favorites
                            </button>
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-2">

                            <div className="bg-gray-50 border border-gray-100 rounded-xl p-1 flex items-center gap-1">

                                <button
                                    onClick={() => setView("table")}
                                    className={[
                                        "h-8 w-8 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer",
                                        view === "table"
                                            ? "bg-white shadow-sm text-orange-500"
                                            : "text-gray-400 hover:text-orange-500"
                                    ].join(" ")}
                                >
                                    <Table2 className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => setView("grid")}
                                    className={[
                                        "h-8 w-8 rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer",
                                        view === "grid"
                                            ? "bg-white shadow-sm text-orange-500"
                                            : "text-gray-400 hover:text-orange-500"
                                    ].join(" ")}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table View */}
                {view === "table" && (
                    <Card className="border border-gray-100 overflow-hidden">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[950px]">

                                <thead className="bg-gray-50/70 border-b border-gray-100">
                                    <tr>

                                        <th className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em]">
                                            Note
                                        </th>

                                        <th className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em]">
                                           Last Updated
                                        </th>
{/* 
                                        <th className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em]">
                                            Created By
                                        </th> */}

                                        {/* <th className="text-left px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em]">
                                            Status
                                        </th> */}

                                        <th className="text-right px-5 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em]">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">

                                    {filteredNotes.map((note, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-orange-50/30 transition-all duration-200"
                                        >

                                            <td className="px-5 py-4">
                                                <div className="flex items-start gap-3">

                                                    <div className={`w-10 h-10 rounded-xl ${note.color} flex items-center justify-center flex-shrink-0`}>
                                                        <FileText className="w-4 h-4 text-orange-500" />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2">

                                                            <h3 className="text-sm font-bold text-[#1F2937] truncate">
                                                                {note.title}
                                                            </h3>

                                                            {note.favorite && (
                                                                <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500 flex-shrink-0" />
                                                            )}
                                                        </div>

                                                        <p className="text-xs text-gray-500 mt-1 line-clamp-1 leading-relaxed">
                                                            {note.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Clock3 className="w-4 h-4 text-gray-400" />
                                                    {note.updated_at}
                                                </div>
                                            </td>

                                            {/* <td className="px-5 py-4">
                                                <p className="text-sm font-medium text-gray-600">
                                                    {note.created_by}
                                                </p>
                                            </td> */}

                                            {/* <td className="px-5 py-4">
                                                {note.favorite ? (
                                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 border border-orange-100">
                                                        <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                                                        <span className="text-xs font-semibold text-orange-500">
                                                            Favorite
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100">
                                                        <span className="text-xs font-semibold text-gray-500">
                                                            Normal
                                                        </span>
                                                    </div>
                                                )}
                                            </td> */}

                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-2">

                                                    <button className="w-8 h-8 rounded-lg border border-gray-100 bg-blue-50 hover:bg-blue-100 transition-all duration-200 flex items-center justify-center text-blue-500 cursor-pointer">
                                                        <Edit className="w-4 h-4" />
                                                    </button>

                                                    <button className="w-8 h-8 rounded-lg border border-gray-100 bg-red-50 hover:bg-red-100 transition-all duration-200 flex items-center justify-center text-red-500 cursor-pointer">
                                                        <Trash className="w-4 h-4" />
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {/* Grid View */}
                {view === "grid" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                        {filteredNotes.map((note, index) => (
                            <Card
                                key={index}
                                hoverable
                                clickable
                                className="border border-gray-100"
                            >

                                <CardContent className="p-5">

                                    <div className="flex items-start justify-between gap-3">

                                        <div className={`w-11 h-11 rounded-2xl ${note.color} flex items-center justify-center flex-shrink-0`}>
                                            <FileText className="w-5 h-5 text-orange-500" />
                                        </div>

                                        <div className="flex items-center gap-2">

                                            {note.favorite && (
                                                <button className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 cursor-pointer">
                                                    <Star className="w-4 h-4 fill-orange-500" />
                                                </button>
                                            )}

                                            <button className="w-8 h-8 rounded-lg border border-gray-100 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center text-gray-500 cursor-pointer">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4">

                                        <h2 className="text-[15px] font-bold text-[#1F2937] leading-snug">
                                            {note.title}
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-2 leading-relaxed line-clamp-3">
                                            {note.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-100">

                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <Clock3 className="w-3.5 h-3.5" />
                                            {note.updated_at}
                                        </div>

                                        <div className="flex items-center gap-2">

                                            <button className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition-all duration-200 cursor-pointer">
                                                <Edit className="w-4 h-4" />
                                            </button>

                                            <button className="w-8 h-8 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100 transition-all duration-200 cursor-pointer">
                                                <Trash className="w-4 h-4" />
                                            </button>

                                        </div>
                                    </div>

                                </CardContent>
                            </Card>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
}