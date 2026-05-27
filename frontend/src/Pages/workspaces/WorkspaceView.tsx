import { useParams, useNavigate } from "react-router-dom";
import { WORKSPACES_RESPONSE } from "./mock";

export default function WorkspaceView() {

    const {workspaceId} = useParams();

    const navigate = useNavigate();

    const workspace = WORKSPACES_RESPONSE.data.find(
        (item) => item.id === workspaceId
    );

    if (!workspace) {
        return (
            <div className="p-6">
                Workspace Not Found
            </div>
        );
    }

    return (
        <div className="p-6">

            <div className="bg-white border border-gray-200 rounded-3xl p-6">

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-2xl font-black text-gray-900">
                            {workspace.name}
                        </h1>

                        <p className="text-sm text-gray-400 mt-1">
                            {workspace.description}
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/dashboard/form-builder")
                        }
                        className="
                            bg-orange-500
                            hover:bg-orange-600
                            text-white
                            px-5
                            py-2.5
                            rounded-xl
                            text-sm
                            font-semibold
                        "
                    >
                        Create Table
                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                    <div className="bg-orange-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-500">
                            Owner
                        </p>

                        <h3 className="font-bold text-gray-900 mt-1">
                            {workspace.owner.name}
                        </h3>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-500">
                            Editors
                        </p>

                        <h3 className="font-bold text-gray-900 mt-1">
                            {workspace.editors.length}
                        </h3>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-xs text-gray-500">
                            Viewers
                        </p>

                        <h3 className="font-bold text-gray-900 mt-1">
                            {workspace.viewers.length}
                        </h3>
                    </div>

                </div>

            </div>

            <div className="mt-6">

                <h2 className="text-lg font-black text-gray-900 mb-4">
                    Tables
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                    {workspace.tables.map((table) => (

                        <div
                            key={table.id}
                            onClick={() =>
                                navigate(`/dashboard/table-view/${workspaceId}/${table.id}`)
                            }
                            className="
                                bg-white
                                border
                                border-gray-200
                                rounded-3xl
                                p-5
                                cursor-pointer
                                hover:border-orange-300
                                hover:shadow-lg
                                transition-all
                            "
                        >

                            <h3 className="font-black text-lg text-gray-900">
                                {table.name}
                            </h3>

                            <p className="text-xs text-gray-400 mt-1">
                                {table.description}
                            </p>

                            <div className="flex items-center justify-between mt-5">

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Rows
                                    </p>

                                    <p className="font-bold text-gray-900">
                                        {table.rows.length}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Fields
                                    </p>

                                    <p className="font-bold text-gray-900">
                                        {table.schema.length}
                                    </p>
                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}