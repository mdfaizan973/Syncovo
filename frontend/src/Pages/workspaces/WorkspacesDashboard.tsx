import { useNavigate } from "react-router-dom";
import { WORKSPACES_RESPONSE } from "./mock";

export default function WorkspacesDashboard() {

    const navigate = useNavigate();

    const workspaces = WORKSPACES_RESPONSE.data;

    return (
        <div className="bg-[#F6F8FB] min-h-screen p-3 md:p-4">

            <div className="max-w-7xl mx-auto flex flex-col gap-3">

                <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                <span className="text-base">📁</span>
                            </div>

                            <div>
                                <h1 className="text-lg font-bold tracking-tight text-gray-800">
                                    Workspaces
                                </h1>

                                <p className="text-xs text-gray-400 mt-0.5">
                                    Manage all dynamic databases and tables
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-2">

                            <button
                                className="h-9 px-4 cursor-pointer text-sm font-semibold rounded-lg border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 transition-all"
                                onClick={() => navigate("/dashboard/form-builder")}
                            >
                                Create Table
                            </button>

                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

                    {workspaces.map((workspace) => (

                        <div
                            key={workspace.id}
                            onClick={() =>
                                navigate(`/dashboard/workspace-view/${workspace.id}`)
                            }
                            className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
                        >

                            <div className="flex items-start justify-between gap-2">

                                <div className="flex items-center gap-3">

                                    <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                        📁
                                    </div>

                                    <div>
                                        <h2 className="text-sm font-medium text-gray-800 truncate">
                                            {workspace.name}
                                        </h2>

                                        <p className="text-xs text-gray-400 truncate mt-0.5">
                                            {workspace.description}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-4">

                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Tables
                                    </p>

                                    <h3 className="text-lg font-bold tracking-tight text-gray-800 mt-1">
                                        {workspace.total_tables}
                                    </h3>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Members
                                    </p>

                                    <h3 className="text-lg font-bold tracking-tight text-gray-800 mt-1">
                                        {workspace.total_members}
                                    </h3>
                                </div>

                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-100">

                                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 mb-2">
                                    Owner
                                </p>

                                <div className="flex items-center gap-2">

                                    <div className="w-7 h-7 rounded-lg border border-orange-100 bg-orange-50 text-orange-500 flex items-center justify-center text-xs font-bold shrink-0">
                                        {workspace.owner.name[0]}
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-800">
                                            {workspace.owner.name}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {workspace.owner.email}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}