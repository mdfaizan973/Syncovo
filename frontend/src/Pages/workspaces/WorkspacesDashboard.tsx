import { useNavigate } from "react-router-dom";
import { Edit, FileSearch, Plus, Search, Trash } from "lucide-react";
import WorkSpaceFormModal from "../../shared/WorkSpaceFormModal";
import DeleteConfirmModal from "../../shared/DeleteConfirmModal";
import { useState } from "react";
import { useWorkspaces } from "../../hooks/useWorkspaces";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import Loader from "../../shared/Loader";
import { isNonViewer } from "../../utils/commonUtils";

export default function WorkspacesDashboard() {

    const navigate = useNavigate();

    const { workspaces, workspaceLoading, createWorkspace, updateWorkspace, deleteWorkspace } = useWorkspaces();

    const { getUsersByEmail } = useAuth();

    const [users, setUsers] = useState<any[]>([]);
    const [initialValues, setInitialValues] = useState<any>(null);
    const [open, setOpen] = useState(false);
    const [workspaceSearch, setWorkspaceSearch] = useState("");

    // ── single shared delete modal state ──
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        title: string;
        description: string;
        onConfirm: () => Promise<void>;
    } | null>(null);

    const filteredWorkspaces = workspaces?.filter((workspace: any) =>
        workspace.name.toLowerCase().includes(workspaceSearch.toLowerCase().trim())
    ) ?? [];

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
            setUsers((prev) => [formattedUser, ...prev]);
        }
    };

    const handleCreateWorkspace = () => {
        setInitialValues(null);
        setUsers([]);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleSubmit = async (payload: any, id: string = "") => {
        try {
            const response = id ? await updateWorkspace(id, payload) : await createWorkspace(payload);
            if (response.success) {
                setOpen(false);
            }
        } catch (error) {
            console.error("Error submitting workspace:", error);
        }
    };

    const handleUpdateWorkspace = async (payload: any) => {
        setInitialValues(payload);
        setOpen(true);
    };

    if (workspaceLoading) {
        return <Loader loading={workspaceLoading} />;
    }

    return (
        <>
            <div className="bg-[#F6F8FB] min-h-screen p-3 md:p-4">
                <div className="max-w-7xl mx-auto flex flex-col gap-3">

                    {/* ── Header ── */}
                    <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                    <span className="text-base">📁</span>
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold tracking-tight text-gray-800">Workspaces</h1>
                                    <p className="text-xs text-gray-400 mt-0.5">Manage all dynamic databases and tables</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">

                                {/* Search by workspace name */}
                                {workspaces?.length > 0 && (
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Search workspaces..."
                                            value={workspaceSearch}
                                            onChange={(e) => setWorkspaceSearch(e.target.value)}
                                            className="h-9 pl-8 pr-3 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-orange-400 transition-colors text-gray-700 placeholder:text-gray-300 w-48 sm:w-56"
                                        />
                                    </div>
                                )}

                                {workspaces?.length > 0 && (
                                    <button
                                        className="h-9 px-4 flex items-center gap-2 cursor-pointer text-sm font-semibold rounded-lg border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 transition-all"
                                        onClick={handleCreateWorkspace}
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create Workspace
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* ── Grid or empty state ── */}
                    {filteredWorkspaces.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                            {filteredWorkspaces.map((workspace: any) => (
                                <div
                                    key={workspace.id}
                                    onClick={() => navigate(`/dashboard/workspace-view/${workspace.id}`)}
                                    className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
                                >
                                    <div className="flex items-start justify-between gap-2 w-full">
                                        <div className="flex items-center justify-between gap-3 w-full">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                                    📁
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800 truncate">
                                                        {workspace.name}
                                                    </h2>
                                                    <p className="mt-0.5 text-xs text-gray-400 line-clamp-2 break-words">
                                                     ! {workspace.description} 
                                                    </p>
                                                </div>
                                            </div>

                                            {isNonViewer(workspace?.viewers || []) && (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleUpdateWorkspace(workspace);
                                                        }}
                                                        className="w-7 h-7 cursor-pointer rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-all"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDeleteModal({
                                                                open: true,
                                                                title: "Delete Workspace",
                                                                description: `"${workspace.name}" and all its tables and records will be permanently deleted. This action cannot be undone.`,
                                                                onConfirm: async () => {
                                                                    try {
                                                                        await deleteWorkspace(workspace.id);
                                                                    } catch (error) {
                                                                        console.error("Error deleting workspace:", error);
                                                                    }
                                                                },
                                                            });
                                                        }}
                                                        className="w-7 h-7 cursor-pointer rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center transition-all"
                                                    >
                                                        <Trash className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Tables</p>
                                            <h3 className="text-lg font-bold tracking-tight text-gray-800 mt-1">{workspace.total_tables}</h3>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Members</p>
                                            <h3 className="text-lg font-bold tracking-tight text-gray-800 mt-1">{workspace.total_members}</h3>
                                        </div>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400 mb-2">Owner</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-lg border border-orange-100 bg-orange-50 text-orange-500 flex items-center justify-center text-xs font-bold shrink-0">
                                                {workspace.owner.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{workspace.owner.name}</p>
                                                <p className="text-xs text-gray-400">{workspace.owner.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full flex-col gap-3 py-16">
                            <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center">
                                <FileSearch className="w-6 h-6 text-orange-400" />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <p className="text-sm font-medium text-gray-700">
                                    {workspaceSearch.trim() ? `No workspaces matching "${workspaceSearch}"` : "No workspaces found"}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {workspaceSearch.trim() ? "Try searching a different name" : "Get started by creating your first workspace"}
                                </p>
                            </div>
                            {!workspaceSearch.trim() && (
                                <button
                                    onClick={handleCreateWorkspace}
                                    className="h-9 px-4 flex items-center gap-2 cursor-pointer text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Workspace
                                </button>
                            )}
                        </div>
                    )}

                </div>
            </div>

            <WorkSpaceFormModal
                open={open}
                users={users}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
                initialValues={initialValues}
                handleSearchUsers={handleSearchUsers}
            />

            {/* ── Single shared delete confirmation modal ── */}
            <DeleteConfirmModal
                open={!!deleteModal}
                onClose={() => setDeleteModal(null)}
                onConfirm={async () => {
                    await deleteModal?.onConfirm();
                    setDeleteModal(null);
                }}
                title={deleteModal?.title ?? ""}
                description={deleteModal?.description ?? ""}
            />
        </>
    );
}
