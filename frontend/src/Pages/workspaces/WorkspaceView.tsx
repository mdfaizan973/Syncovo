import { useParams, useNavigate } from "react-router-dom";
// import { WORKSPACES_RESPONSE } from "./mock";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import { useTables } from "../../hooks/useTables";
import { isNonViewer } from "../../utils/commonUtils";
import { Edit, FileSearch, Plus, Trash, Search } from "lucide-react";
import { useState } from "react";
import { getUsersByEmail } from "../../services/auth";
import { toast } from "sonner";
import WorkSpaceFormModal from "../../shared/WorkSpaceFormModal";
import Loader from "../../shared/Loader";

export default function WorkspaceView() {

    const { workspaceId } = useParams();
    const navigate = useNavigate();

    const { workspaces, workspaceLoading, createWorkspace } = useWorkspaces();

    const { tables, tableLoading, deleteTable } = useTables(workspaceId);

    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [tableSearch, setTableSearch] = useState("");
    
    const workspace = workspaces?.find((item) => item.id === workspaceId) || null;

    const handleUpdateTable = async (table: any) => {
        navigate(`/dashboard/form-builder/${table.id}`, { state: { workspaceId: workspaceId } });
    }

    const handleSubmit = async (payload: any) => {

        try {
            const response = await createWorkspace(payload);
            if (response.success) {
                setOpen(false);
                navigate(-1)
            }
        } catch (error) {
            console.error("Error submitting workspace:", error);
        }
    }

    const handleSearchUsers = async (email: string, roleType: string = "") => {

        if (users.some((user) => user.email === email)) {
            toast.error("User already exists");
            return;
        }

        const response = await getUsersByEmail(email);

        if (response.success) {

            const userData = response.data;

            if (!userData) return;

            const formattedUser = {
                ...userData,
                role_type: roleType === "editors" ? "editor" : "viewer",
            };

            setUsers((prev) => [formattedUser, ...prev,]);
        }

    }

    if (workspaceLoading || tableLoading) {
        return (
            <Loader loading={workspaceLoading || tableLoading} />
        )
    }

    const filteredTables = tables?.filter((table: any) =>
        table.name.toLowerCase().includes(tableSearch.toLowerCase().trim())
    ) ?? [];

    if (!workspace) {
        return (
            <>
                <div className="flex items-center justify-center h-full flex-col gap-3 py-16">
                    <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center">
                        <FileSearch className="w-6 h-6 text-orange-400" />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-sm font-medium text-gray-700">No workspaces found</p>
                        <p className="text-xs text-gray-400">Get started by creating your first workspace</p>
                    </div>
                    <button
                        onClick={() => {
                            setOpen(true)
                        }}
                        className="h-9 px-4 flex items-center gap-2 cursor-pointer text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Create Workspace
                    </button>
                </div>
    
                {/* ✅ Modal was missing here */}
                <WorkSpaceFormModal
                    open={open}
                    users={users}
                    onClose={() => setOpen(false)}
                    onSubmit={handleSubmit}
                    handleSearchUsers={handleSearchUsers}
                />
            </>
        );
    }



    return (
        <>

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
                                        {workspace.name}
                                    </h1>

                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {workspace.description}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-2 flex-wrap">

                                {/* Search by table name */}
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                                    <input
                                        type="text"
                                        placeholder="Search tables by name..."
                                        value={tableSearch}
                                        onChange={(e) => setTableSearch(e.target.value)}
                                        className="h-9 pl-8 pr-3 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-orange-400 transition-colors text-gray-700 placeholder:text-gray-300 w-48 sm:w-56"
                                    />
                                </div>
                            
                                {isNonViewer(workspace?.viewers || []) && tables?.length > 0 && (
                                    <button
                                        onClick={() =>
                                            navigate(`/dashboard/form-builder`, { state: { workspaceId: workspace.id } })
                                        }
                                        className="h-9 px-4 cursor-pointer text-sm font-semibold rounded-lg border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 transition-all"
                                    >
                                        Create Table
                                    </button>
                                )}
                            
                            </div>

                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100">

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Owner
                                    </p>

                                    <h3 className="text-sm font-medium text-gray-800 mt-1">
                                        {workspace.owner.name}
                                    </h3>
                                </div>


                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Total Tables
                                    </p>

                                    <h3 className="text-sm font-medium text-gray-800 mt-1">
                                        {workspace?.total_tables || 0}
                                    </h3>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Editors
                                    </p>

                                    <h3 className="text-sm font-medium text-gray-800 mt-1">
                                        {workspace?.editors?.length || 0}
                                    </h3>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Viewers
                                    </p>

                                    <h3 className="text-sm font-medium text-gray-800 mt-1">
                                        {workspace?.viewers?.length || 0}
                                    </h3>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col gap-3">

                        <div className="flex items-center gap-3 px-1">

                            <h2 className="text-lg font-bold tracking-tight text-gray-800">
                                Tables
                            </h2>

                        </div>

                        {filteredTables?.length > 0 ? 
                        (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">

                            {filteredTables?.map((table) => (

                                <div
                                    key={table.id}
                                    onClick={() =>
                                        navigate(`/dashboard/table-view/${table.workspace_id}/${table.id}`)
                                    }
                                    className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
                                >

                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                                <span className="text-base">🗃️</span>
                                            </div>

                                            <div className="min-w-0">
                                                <h3 className="text-sm font-medium text-gray-800 truncate">
                                                    {table.name}
                                                </h3>

                                                <p className="text-xs text-gray-400 truncate mt-0.5">
                                                    {table.description}
                                                </p>
                                            </div>
                                        </div>

                                        {isNonViewer(table?.viewers || []) && (
                                            <div className="flex items-center gap-2">
                                                <button

                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleUpdateTable(table);
                                                    }}
                                                    className="w-7 h-7 cursor-pointer rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-all">
                                                    <Edit className="w-3.5 h-3.5" />
                                                </button>
                                                <button

                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        await deleteTable(table.id);
                                                    }}
                                                    className="w-7 h-7 cursor-pointer rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-all">
                                                    <Trash className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}

                                    </div>

                                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">

                                        <div className="flex-1 bg-gray-50 rounded-xl p-2.5">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                                Rows
                                            </p>

                                            <p className="text-sm font-medium text-gray-800 mt-0.5">
                                                {table?.row_count || 0}
                                            </p>
                                        </div>

                                        <div className="flex-1 bg-gray-50 rounded-xl p-2.5">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                                Fields
                                            </p>

                                            <p className="text-sm font-medium text-gray-800 mt-0.5">
                                                {table?.schema?.length || 0}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>) : (
                             <div className="flex items-center justify-center h-full flex-col gap-3 py-16">
                                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center">
                                    <FileSearch className="w-6 h-6 text-orange-400" />
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <p className="text-sm font-medium text-gray-700">
                                        {tableSearch.trim() ? `No tables matching "${tableSearch}"` : "No Tables found"}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {tableSearch.trim() ? "Try searching a different name" : "Get started by creating your first table"}
                                    </p>
                                </div>
                                {!tableSearch.trim() && (
                                    <button
                                        onClick={() =>
                                            navigate(`/dashboard/form-builder`, { state: { workspaceId: workspace.id } })
                                        }
                                        className="h-9 px-4 flex items-center gap-2 cursor-pointer text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create Table
                                    </button>
                                )}
                            </div>
                        )}

                    </div>

                </div>

            </div>

            {/* <WorkSpaceFormModal
                open={open}
                users={users}
                onClose={() => setOpen(false)}
                onSubmit={handleSubmit}
                handleSearchUsers={handleSearchUsers}
            /> */}
        </>
    );
}
