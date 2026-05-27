import { useNavigate } from "react-router-dom";
import { WORKSPACES_RESPONSE } from "./mock";

export default function WorkspacesDashboard() {

    const navigate = useNavigate();

    const workspaces = WORKSPACES_RESPONSE.data;

    return (
        <div className="p-6">

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-2xl font-black text-gray-900">
                        Workspaces
                    </h1>

                    <p className="text-sm text-gray-400 mt-1">
                        Manage all dynamic databases and tables
                    </p>
                </div>

                <button
                    className="
                        bg-orange-500
                        hover:bg-orange-600
                        text-white
                        px-5
                        py-2.5
                        rounded-xl
                        text-sm
                        font-semibold
                        transition-all
                    "
                    onClick={() => navigate("/dashboard/form-builder")}
                >
                    Create Table
                </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                {workspaces.map((workspace) => (

                    <div
                        key={workspace.id}
                        onClick={() =>
                            navigate(`/dashboard/workspace-view/${workspace.id}`)
                        }
                        className="
                            bg-white
                            border
                            border-gray-200
                            rounded-3xl
                            p-5
                            cursor-pointer
                            hover:border-orange-300
                            hover:shadow-xl
                            transition-all
                        "
                    >

                        <div className="flex items-start justify-between">

                            <div>

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            w-12
                                            h-12
                                            rounded-2xl
                                            bg-orange-100
                                            flex
                                            items-center
                                            justify-center
                                            text-2xl
                                        "
                                    >
                                        📁
                                    </div>

                                    <div>
                                        <h2 className="font-black text-lg text-gray-900">
                                            {workspace.name}
                                        </h2>

                                        <p className="text-xs text-gray-400">
                                            {workspace.description}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">

                            <div className="bg-gray-50 rounded-2xl p-3">
                                <p className="text-xs text-gray-400">
                                    Tables
                                </p>

                                <h3 className="text-lg font-black text-gray-900 mt-1">
                                    {workspace.total_tables}
                                </h3>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-3">
                                <p className="text-xs text-gray-400">
                                    Members
                                </p>

                                <h3 className="text-lg font-black text-gray-900 mt-1">
                                    {workspace.total_members}
                                </h3>
                            </div>

                        </div>

                        <div className="mt-5 pt-4 border-t border-gray-100">

                            <p className="text-xs text-gray-400 mb-2">
                                Owner
                            </p>

                            <div className="flex items-center gap-2">

                                <div
                                    className="
                                        w-8
                                        h-8
                                        rounded-full
                                        bg-orange-500
                                        text-white
                                        flex
                                        items-center
                                        justify-center
                                        text-xs
                                        font-bold
                                    "
                                >
                                    {workspace.owner.name[0]}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
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
    );
}