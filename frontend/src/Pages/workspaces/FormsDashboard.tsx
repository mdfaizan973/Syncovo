import { useNavigate } from "react-router-dom";
import {
    Plus,
    FileText,
    ArrowRight,
    Users,
    LayoutPanelTop,
    CalendarDays,
    BarChart3,
    Sparkles,
} from "lucide-react";

import { FORMS_RESPONSE } from "./mock";

export default function FormsDashboard() {

    const navigate = useNavigate();

    return (

        <div className="min-h-screen bg-[#F6F8FB] p-3 md:p-4">

            <div className="max-w-7xl mx-auto flex flex-col gap-3">

                {/* Header */}
                <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 px-4 py-3 flex items-center justify-between">

                    <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                            <LayoutPanelTop className="w-4 h-4 text-orange-500" />
                        </div>

                        <div>

                            <h1 className="text-lg font-bold tracking-tight text-gray-800">
                                Forms Dashboard
                            </h1>

                            <p className="text-xs text-gray-400 mt-0.5">
                                Manage all created forms and monitor submissions
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            className="h-9 px-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium transition-all flex items-center gap-2"
                        >
                            <BarChart3 className="w-4 h-4" />
                            Analytics
                        </button>

                        <button
                            onClick={() => navigate("/dashboard/form-builder")}
                            className="h-9 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-all flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create Form
                        </button>

                    </div>

                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

                    <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 p-4">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                    Total Forms
                                </p>

                                <h2 className="text-lg font-bold tracking-tight text-gray-800 mt-2">
                                    {FORMS_RESPONSE.data.length}
                                </h2>

                            </div>

                            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-orange-500" />
                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 p-4">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                    Total Submissions
                                </p>

                                <h2 className="text-lg font-bold tracking-tight text-gray-800 mt-2">
                                    {
                                        FORMS_RESPONSE.data.reduce(
                                            (acc, item) => acc + item.total_submissions,
                                            0
                                        )
                                    }
                                </h2>

                            </div>

                            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                                <BarChart3 className="w-4 h-4 text-blue-500" />
                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 p-4">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                    Total Fields
                                </p>

                                <h2 className="text-lg font-bold tracking-tight text-gray-800 mt-2">
                                    {
                                        FORMS_RESPONSE.data.reduce(
                                            (acc, item) => acc + item.fields.length,
                                            0
                                        )
                                    }
                                </h2>

                            </div>

                            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-green-500" />
                            </div>

                        </div>

                    </div>

                </div>

                {/* Forms Section */}
                <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

                    {/* Section Header */}
                    <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">

                        <div>

                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                All Forms
                            </p>

                            <h2 className="text-lg font-bold tracking-tight text-gray-800 mt-1">
                                Recently Created Forms
                            </h2>

                        </div>

                        <div className="h-7 px-3 rounded-full text-xs font-medium border bg-orange-50 text-orange-600 border-orange-200 flex items-center gap-2">
                            Active
                            <span className="text-[10px] font-medium px-1.5 py-px rounded-full text-white bg-orange-500">
                                {FORMS_RESPONSE.data.length}
                            </span>
                        </div>

                    </div>

                    {/* Grid */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

                        {FORMS_RESPONSE.data.map((form) => (

                            <div
                                key={form.id}
                                onClick={() =>
                                    alert("Go to the form builder page to edit the form")
                                }
                                className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
                            >

                                {/* Card Top */}
                                <div className="flex items-start justify-between">

                                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-orange-500" />
                                    </div>

                                    <button className="w-7 h-7 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-500 flex items-center justify-center transition-all">
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>

                                </div>

                                {/* Content */}
                                <h3 className="text-sm font-medium text-gray-800 mt-3 leading-snug">
                                    {form.name}
                                </h3>

                                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                                    {form.description}
                                </p>

                                {/* Tags */}
                                <div className="flex items-center gap-2 mt-3 flex-wrap">

                                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100">
                                        {form.fields.length} Fields
                                    </span>

                                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                                        {form.total_submissions} Submissions
                                    </span>

                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">

                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">

                                        <Users className="w-3.5 h-3.5" />

                                        <span>
                                            {form.assigned_users.length} Members
                                        </span>

                                    </div>

                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">

                                        <CalendarDays className="w-3.5 h-3.5" />

                                        <span>
                                            {form.created_at}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );
}