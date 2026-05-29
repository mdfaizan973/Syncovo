// /src/components/modals/WorkSpaceFormModal.tsx

import { useEffect, useMemo, useState } from "react";
import {
    Mail,
    Search,
    ShieldCheck,
    UserPlus2,
    Users,
    X,
} from "lucide-react";

type User = {
    id: string;
    full_name: string;
    email: string;
};

type WorkspaceData = {
    id?: string;
    name: string;
    description: string;
    editors: User[];
    viewers: User[];
};

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (payload: WorkspaceData, id: string) => void;

    initialValues?: WorkspaceData;

    users?: User[];

    loading?: boolean;
};

export default function WorkSpaceFormModal({
    open,
    onClose,
    onSubmit,
    initialValues,
    users = [],
    loading = false,
}: Props) {
    console.log("initialValues", initialValues);

    const [formValues, setFormValues] = useState<any>({
        name: initialValues?.name || "",
        description: initialValues?.description || "",
        editors: initialValues?.editors || [],
        viewers: initialValues?.viewers || [],
    });

    useEffect(() => {
        if (initialValues) {
            setFormValues({
                name: initialValues.name,
                description: initialValues.description,
                editors: initialValues.editors,
                viewers: initialValues.viewers,
            });
        }
    }, [initialValues]);



    const handleChangeValues  = (e: any) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    const [editorSearch, setEditorSearch] = useState("");

    const [viewerSearch, setViewerSearch] = useState("");

    const filteredEditors = useMemo(() => {

        return users.filter((user) => {

            const alreadyAdded = formValues.editors.some(
                (editor) => editor.id === user.id
            );

            return (
                !alreadyAdded &&
                user.email
                    .toLowerCase()
                    .includes(editorSearch.toLowerCase())
            );
        });

    }, [editorSearch, users, formValues.editors]);

    const filteredViewers = useMemo(() => {

        return users.filter((user) => {

            const alreadyAdded = formValues.viewers.some(
                (viewer) => viewer.id === user.id
            );

            return (
                !alreadyAdded &&
                user.email
                    .toLowerCase()
                    .includes(viewerSearch.toLowerCase())
            );
        });

    }, [viewerSearch, users, formValues.viewers]);

    const addEditor = (user: User) => {
        setFormValues({ ...formValues, editors: [...formValues.editors, user] });
        setEditorSearch("");
    };

    const addViewer = (user: User) => {
        setFormValues({ ...formValues, viewers: [...formValues.viewers, user] });
        setViewerSearch("");
    };

    const removeEditor = (userId: string) => {
        setFormValues({ ...formValues, editors: formValues.editors.filter((user: User) => user.id !== userId) });
    };

    const removeViewer = (userId: string) => {
        setFormValues({ ...formValues, viewers: formValues.viewers.filter((user: User) => user.id !== userId) });
    };

    const handleSubmit = async() => {

        const payload = {
            name: formValues?.name || "",
            description: formValues?.description || "",
            editors: formValues?.editors.map((editor: User) => editor.id) || [],
            viewers: formValues?.viewers.map((viewer: User) => viewer.id) || [],
        }

        onSubmit(payload, initialValues?.id || "");
    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

            <div className="w-full max-w-3xl rounded-3xl bg-white border border-gray-100 shadow-2xl overflow-hidden">

                {/* HEADER */}

                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center">
                            <Users className="w-5 h-5 text-orange-500" />
                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-gray-800">
                                {initialValues
                                    ? "Edit Workspace"
                                    : "Create Workspace"}
                            </h2>

                            <p className="text-sm text-gray-400 mt-0.5">
                                Manage editors and viewers access
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
                    >
                        <X className="w-4 h-4 text-gray-500" />
                    </button>

                </div>

                {/* BODY */}

                <div className="p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">

                    {/* WORKSPACE NAME */}

                    <div className="flex flex-col gap-2">

                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Workspace Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter workspace name"
                            value={formValues.name}
                            onChange={handleChangeValues}
                            className="h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 text-sm"
                        />

                    </div>

                    {/* DESCRIPTION */}

                    <div className="flex flex-col gap-2">

                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            name="description"
                            placeholder="Enter workspace description"
                            value={formValues.description}
                            onChange={handleChangeValues}
                            className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 text-sm resize-none"
                        />

                    </div>

                    {/* EDITORS + VIEWERS */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                        {/* EDITORS */}

                        <div className="rounded-2xl border border-gray-100 overflow-hidden">

                            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 bg-orange-50/40">

                                <ShieldCheck className="w-4 h-4 text-orange-500" />

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        Editors
                                    </h3>

                                    <p className="text-xs text-gray-400">
                                        Can edit workspace and tables
                                    </p>
                                </div>

                            </div>

                            <div className="p-4 flex flex-col gap-4">

                                {/* SEARCH */}

                                <div className="relative">

                                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

                                    <input
                                        type="text"
                                        placeholder="Search editor by email"
                                        value={editorSearch}
                                        onChange={(e) =>
                                            setEditorSearch(e.target.value)
                                        }
                                        className="w-full h-10 pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 text-sm"
                                    />

                                </div>

                                {/* SEARCH RESULT */}

                                {editorSearch && (

                                    <div className="border border-gray-100 rounded-xl overflow-hidden">

                                        {filteredEditors.length > 0 ? (

                                            filteredEditors.map((user) => (

                                                <button
                                                    key={user.id}
                                                    type="button"
                                                    onClick={() => addEditor(user)}
                                                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-orange-50 transition-all border-b border-gray-100 last:border-none cursor-pointer"
                                                >

                                                    <div className="flex flex-col items-start">

                                                        <span className="text-sm font-medium text-gray-700">
                                                            {user.full_name}
                                                        </span>

                                                        <span className="text-xs text-gray-400">
                                                            {user.email}
                                                        </span>

                                                    </div>

                                                    <UserPlus2 className="w-4 h-4 text-orange-500" />

                                                </button>

                                            ))

                                        ) : (

                                            <div className="px-4 py-4 text-xs text-gray-400">
                                                No users found
                                            </div>

                                        )}

                                    </div>

                                )}

                                {/* SELECTED EDITORS */}

                                <div className="flex flex-wrap gap-2">

                                    {formValues.editors.map((editor: User) => (

                                        <div
                                            key={editor.id}
                                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100"
                                        >

                                            <Mail className="w-3.5 h-3.5 text-orange-500" />

                                            <span className="text-xs font-medium text-gray-700">
                                                {editor.email}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeEditor(editor.id)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <X className="w-3.5 h-3.5 text-red-500" />
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                        {/* VIEWERS */}

                        <div className="rounded-2xl border border-gray-100 overflow-hidden">

                            <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2 bg-blue-50/40">

                                <Users className="w-4 h-4 text-blue-500" />

                                <div>

                                    <h3 className="text-sm font-semibold text-gray-800">
                                        Viewers
                                    </h3>

                                    <p className="text-xs text-gray-400">
                                        Can only view workspace data
                                    </p>

                                </div>

                            </div>

                            <div className="p-4 flex flex-col gap-4">

                                {/* SEARCH */}

                                <div className="relative">

                                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

                                    <input
                                        type="text"
                                        placeholder="Search viewer by email"
                                        value={viewerSearch}
                                        onChange={(e) =>
                                            setViewerSearch(e.target.value)
                                        }
                                        className="w-full h-10 pl-10 pr-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-400 text-sm"
                                    />

                                </div>

                                {/* SEARCH RESULT */}

                                {viewerSearch && (

                                    <div className="border border-gray-100 rounded-xl overflow-hidden">

                                        {filteredViewers.length > 0 ? (

                                            filteredViewers.map((user) => (

                                                <button
                                                    key={user.id}
                                                    type="button"
                                                    onClick={() => addViewer(user)}
                                                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-50 transition-all border-b border-gray-100 last:border-none cursor-pointer"
                                                >

                                                    <div className="flex flex-col items-start">

                                                        <span className="text-sm font-medium text-gray-700">
                                                            {user.full_name}
                                                        </span>

                                                        <span className="text-xs text-gray-400">
                                                            {user.email}
                                                        </span>

                                                    </div>

                                                    <UserPlus2 className="w-4 h-4 text-blue-500" />

                                                </button>

                                            ))

                                        ) : (

                                            <div className="px-4 py-4 text-xs text-gray-400">
                                                No users found
                                            </div>

                                        )}

                                    </div>

                                )}

                                {/* SELECTED VIEWERS */}

                                <div className="flex flex-wrap gap-2">

                                    {formValues.viewers.map((viewer: User) => (

                                        <div
                                            key={viewer.id}
                                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100"
                                        >

                                            <Mail className="w-3.5 h-3.5 text-blue-500" />

                                            <span className="text-xs font-medium text-gray-700">
                                                {viewer.email}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeViewer(viewer.id)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <X className="w-3.5 h-3.5 text-red-500" />
                                            </button>

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* FOOTER */}

                <div className="px-6 py-5 border-t border-gray-100 flex items-center justify-end gap-3 bg-gray-50">

                    <button
                        onClick={onClose}
                        className="h-11 px-5 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="h-11 px-5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all cursor-pointer disabled:opacity-50"
                    >
                        {loading
                            ? "Saving..."
                            : initialValues
                                ? "Update Workspace"
                                : "Create Workspace"}
                    </button>

                </div>

            </div>

        </div>
    );
}