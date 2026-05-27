import {
    Database,
    ArrowRight,
    Table2,
    CalendarDays,
    Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { WORKSPACES_RESPONSE } from "./mock";

export default function TablesDashboard() {

    const navigate = useNavigate();

    const tables = WORKSPACES_RESPONSE.data.flatMap((workspace) =>
        workspace.tables.map((table) => ({
            ...table,
            workspaceId: workspace.id,
            workspaceName: workspace.name,
        }))
    );

    return (

        <div className="min-h-screen bg-[#F6F8FB] p-3 md:p-4">

            <div className="max-w-7xl mx-auto flex flex-col gap-3">

                {/* Header */}
                <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center justify-between hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

                    <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                            <Database className="w-4 h-4 text-orange-500" />
                        </div>

                        <div>

                            <h1 className="text-lg font-bold tracking-tight text-gray-800">
                                Tables
                            </h1>

                            <p className="text-xs text-gray-400 mt-0.5">
                                Manage all workspace tables and records
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-2">

                        <button
                            title="Click"
                            className="h-9 px-4 cursor-pointer rounded-lg bg-orange-500 text-white hover:bg-orange-600 text-sm font-medium transition-all flex items-center gap-2"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            Create
                        </button>

                        <div className="h-9 px-3 rounded-lg border border-gray-200 bg-white flex items-center gap-2">

                            <div className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center">
                                <Database className="w-3.5 h-3.5 text-orange-500" />
                            </div>

                            <div className="flex items-center gap-1.5">
                                <span className="text-xs text-gray-400">
                                    Total
                                </span>

                                <span className="text-sm font-medium text-gray-800">
                                    {tables.length}
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Tables Grid */}
                <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

                    {/* Section Header */}
                    <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">

                        <div>

                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                All Tables
                            </p>

                            <h2 className="text-lg font-bold tracking-tight text-gray-800 mt-1">
                                Recently Created Tables
                            </h2>

                        </div>



                    </div>

                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

                        {tables.map((table) => (

                            <div
                                key={table.id}
                                className="bg-white rounded-xl border border-gray-100 p-3.5 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
                            >

                                {/* Card Top */}
                                <div className="flex items-start justify-between">

                                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                        <Table2 className="w-4 h-4 text-orange-500" />
                                    </div>

                                        <button
                                            onClick={() => navigate(`/dashboard/table-view/${table.workspaceId}/${table.id}`)}
                                            title="Click to View Table"
                                            className="w-8 h-8 cursor-pointer rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-all"
                                        >
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                      
                                </div>

                                {/* Content */}
                                <div className="mt-2.5">

                                    <h2 className="text-sm font-medium text-gray-800 leading-snug">
                                        {table.name}
                                    </h2>

                                    <p className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100 inline-flex mt-1.5">
                                        {table.workspaceName}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                                        {table.description}
                                    </p>

                                </div>


                                {/* Footer */}
                                <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-100">

                                    <div>

                                        <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                                            Owner
                                        </p>

                                        <p className="text-xs text-gray-600 mt-1">
                                            {table.owner.name}
                                        </p>

                                    </div>

                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">

                                        <CalendarDays className="w-3.5 h-3.5" />

                                        <span>
                                            {table.created_at}
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