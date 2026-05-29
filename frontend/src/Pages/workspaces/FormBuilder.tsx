import { useEffect, useMemo, useState } from "react";
import { FORMS_RESPONSE, WORKSPACES_RESPONSE } from "./mock";
import { Button } from "../../components/ui/button";
import { CheckIcon, LayoutPanelTop, PlusIcon, Presentation, SaveIcon, Search, Trash, TrashIcon, UserPlus2, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";
import { useTables } from "../../hooks/useTables";
import { useWorkspaces } from "../../hooks/useWorkspaces";

const FIELD_TYPES = [
    "text",
    "textarea",
    "number",
    "email",
    "password",
    "date",
    "file",
    "select",
    "checkbox",
    "radio",
];

const FIELD_TYPE_ICONS: Record<string, string> = {
    text: "T",
    textarea: "¶",
    number: "#",
    email: "@",
    password: "•••",
    date: "📅",
    file: "📎",
    select: "▾",
    checkbox: "☑",
    radio: "◉",
};

function toKey(label: string): string {
    return label
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^a-z0-9_]/g, "");
}

export default function FormBuilder() {

    const { formId } = useParams();
    const navigate = useNavigate();
    const currentForm = FORMS_RESPONSE;
    const { getUsersByEmail } = useAuth();
    const { tables, createTable } = useTables();
    const { workspaces } = useWorkspaces();


    const tableSchema = useMemo(() => {
        return (
            currentForm.data.find((form) => form.id === formId)?.fields || []
        );
    }, [formId, currentForm]);


    const [workspaceId, setWorkspaceId] = useState("");

    const [tableName, setTableName] = useState("");

    const [description, setDescription] = useState("");
    const [users, setUsers] = useState<any[]>([]);

    const [viewers, setViewers] = useState<any>([]);
    const [editors, setEditors] = useState<any>([]);
    const [viewerSearch, setViewerSearch] = useState("");
    const [editorSearch, setEditorSearch] = useState("");

    const [fields, setFields] = useState<any[]>([
        {
            label: "",
            key: "",
            type: "text",
            required: false,
            options: [],
        },
    ]);

    const addField = () => {

        setFields([
            ...fields,
            {
                label: "",
                key: "",
                type: "text",
                required: false,
                options: [],
            },
        ]);
    };

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

    const filteredEditors = useMemo(() => {

        return users.filter((user) => {

            const alreadyAdded = editors
                .filter((editor: any) => editor.role_type === "editor")
                .some((editor) => editor.id === user.id);

            return (
                !alreadyAdded &&
                user.email
                    .toLowerCase()
                    .includes(editorSearch.toLowerCase())
            );
        });

    }, [editorSearch, users, editors]);

    const filteredViewers = useMemo(() => {

        return users.filter((user) => {

            const alreadyAdded = viewers
                .filter((viewer: any) => viewer.role_type === "viewer")
                .some(
                    (viewer) => viewer.id === user.id
                );

            return (
                !alreadyAdded &&
                user.email
                    .toLowerCase()
                    .includes(viewerSearch.toLowerCase())
            );
        });

    }, [viewerSearch, users, viewers]);


    const updateField = (index: number, key: string,
        value: any) => {

        const updatedFields = [...fields];

        updatedFields[index][key] = value;

        setFields(updatedFields);
    };

    const removeField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const addOption = (fieldIndex: number) => {

        const updatedFields = [...fields];

        updatedFields[fieldIndex].options.push("");

        setFields(updatedFields);
    };

    const updateOption = (
        fieldIndex: number,
        optionIndex: number,
        value: string
    ) => {

        const updatedFields = [...fields];

        updatedFields[fieldIndex].options[optionIndex] = value;

        setFields(updatedFields);
    };

    const removeOption = (fieldIndex: number, optionIndex: number) => {
        const updatedFields = [...fields];
        updatedFields[fieldIndex].options = updatedFields[fieldIndex].options.filter(
            (_: string, i: number) => i !== optionIndex
        );
        setFields(updatedFields);
    };

    const handleSave = async () => {
        const schema = fields
            .filter((f) => f.label.trim() !== "")
            .map((f) => {
                const entry: any = {
                    key: f.key || toKey(f.label),
                    label: f.label,
                    type: f.type,
                    required: f.required,
                };
                if ((f.type === "select" || f.type === "radio") && f.options.length > 0) {
                    entry.options = f.options.filter((o: string) => o.trim() !== "");
                }
                return entry;
            });

        const payload = {
            workspace_id: "ab4bbd30-661d-497c-aef9-a04a3829c1c0",
            name: tableName,
            description: description || "",
            editors: editors.map((e: any) => e.id),
            viewers: viewers.map((v: any) => v.id),
            schema: schema,
        };

        const response = await createTable(payload);
        if(response.success) {
            navigate(`/dashboard/workspace-view/${response.data.workspace_id}`);
        }
    };

    // Derive preview fields for right panel
    const previewFields = fields.filter((f) => f.label.trim() !== "");

    useEffect(() => {
        if (formId) {
            setFields(tableSchema);
        } else {
            setFields([
                {
                    label: "",
                    key: "",
                    type: "text",
                    required: false,
                    options: [],
                },
            ]);
        }
    }, [tableSchema, formId])


    return (
        <div className="bg-[#F6F8FB] min-h-screen p-3 md:p-4">

            <div className="max-w-7xl mx-auto flex flex-col gap-3">

                {/* ── Top header card ── */}
                <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        <div className="flex justify-between w-full items-center gap-3">
                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                    <LayoutPanelTop className="w-4 h-4 text-orange-500" />
                                </div>

                                <div>
                                    <h1 className="text-lg font-bold tracking-tight text-gray-800">
                                        Create Dynamic Table
                                    </h1>

                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Build dynamic forms and database tables
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">

                                {
                                    formId && (
                                        <>
                                            <button
                                                onClick={() => alert("Delete Table")}
                                                className="w-10 h-10 cursor-pointer rounded-lg border border-red-100 bg-red-50 text-red-500 flex items-center justify-center transition-all">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                            <Button
                                                variant="primary"
                                                leftIcon={<PlusIcon className="w-4 h-4" />}
                                                onClick={() => navigate("/dashboard/form-builder")}>
                                                Create New
                                            </Button>
                                        </>
                                    )
                                }



                            </div>
                        </div>

                    </div>

                    {/* Top form: workspace / table name / description */}
                    <div className="mt-3 pt-3 border-t border-gray-100">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            {/* Workspace */}
                            <div className="flex flex-col gap-1.5">

                                <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                    Workspace
                                </label>

                                <select
                                    value={workspaceId}
                                    onChange={(e) => setWorkspaceId(e.target.value)}
                                    className="h-9 px-3 text-sm rounded-lg border border-gray-200  outline-none focus:border-orange-400 transition-colors text-gray-700"
                                >
                                    <option value="">Select Workspace</option>

                                    {workspaces.map((workspace) => (

                                        <option
                                            key={workspace.id}
                                            value={workspace.id}
                                        >
                                            {workspace.name}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* Table name */}
                            <div className="flex flex-col gap-1.5">

                                <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                    Table Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="e.g. Customer Orders"
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                    className="h-9 px-3 text-sm rounded-lg border border-gray-200 outline-none focus:border-orange-400 transition-colors placeholder:text-gray-300 text-gray-800"
                                />

                            </div>

                        </div>

                        <div className="mt-2 pt-2 ">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">


                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Viewers
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Search viewer by email"
                                            value={viewerSearch}
                                            onChange={(e) => setViewerSearch(e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleSearchUsers(viewerSearch, "viewers")}
                                            className="cursor-pointer border border-gray-200 rounded-xl p-2 h-10 w-10">
                                            <Search className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>

                                    {viewerSearch && (
                                        <div className="border border-gray-100 rounded-xl overflow-hidden">
                                            {filteredViewers.length > 0 ? (
                                                filteredViewers.map((user) => (
                                                    <button
                                                        key={user.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setViewers((prev: any) => [...prev, user]);
                                                            setViewerSearch("");
                                                        }}
                                                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-blue-50 transition-all border-b border-gray-100 last:border-none cursor-pointer"
                                                    >
                                                        <div className="flex flex-col items-start">
                                                            <span className="text-sm font-medium text-gray-700">{user.full_name}</span>
                                                            <span className="text-xs text-gray-400">{user.email}</span>
                                                        </div>
                                                        <UserPlus2 className="w-4 h-4 text-blue-500" />
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-4 text-xs text-gray-400">No users found</div>
                                            )}
                                        </div>
                                    )}

                                    {/* Selected viewers */}
                                    <div className="flex flex-wrap gap-2">
                                        {viewers.map((viewer: any) => (
                                            <div key={viewer.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100">
                                                <span className="text-xs font-medium text-gray-700">{viewer.email}</span>
                                                <button type="button" onClick={() => setViewers((prev: any) => prev.filter((v: any) => v.id !== viewer.id))} className="cursor-pointer">
                                                    <X className="w-3.5 h-3.5 text-red-500" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Editors
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Search editor by email"
                                            value={editorSearch}
                                            onChange={(e) => setEditorSearch(e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleSearchUsers(editorSearch, "editors")}
                                            className="cursor-pointer border border-gray-200 rounded-xl p-2 h-10 w-10">
                                            <Search className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>

                                    {editorSearch && (
                                        <div className="border border-gray-100 rounded-xl overflow-hidden">
                                            {filteredEditors.length > 0 ? (
                                                filteredEditors.map((user) => (
                                                    <button
                                                        key={user.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setEditors((prev: any) => [...prev, user]);
                                                            setEditorSearch("");
                                                        }}
                                                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-orange-50 transition-all border-b border-gray-100 last:border-none cursor-pointer"
                                                    >
                                                        <div className="flex flex-col items-start">
                                                            <span className="text-sm font-medium text-gray-700">{user.full_name}</span>
                                                            <span className="text-xs text-gray-400">{user.email}</span>
                                                        </div>
                                                        <UserPlus2 className="w-4 h-4 text-orange-500" />
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-4 py-4 text-xs text-gray-400">No users found</div>
                                            )}
                                        </div>
                                    )}

                                    {/* Selected editors */}
                                    <div className="flex flex-wrap gap-2">
                                        {editors.map((editor: any) => (
                                            <div key={editor.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
                                                <span className="text-xs font-medium text-gray-700">{editor.email}</span>
                                                <button type="button" onClick={() => setEditors((prev: any) => prev.filter((e: any) => e.id !== editor.id))} className="cursor-pointer">
                                                    <X className="w-3.5 h-3.5 text-red-500" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 flex flex-col gap-1.5">

                            <label className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                Description
                            </label>

                            <textarea
                                placeholder="Describe what this table stores..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={2}
                                className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 transition-colors placeholder:text-gray-300 text-gray-800 resize-none leading-relaxed"
                            />

                        </div>

                    </div>

                </div>

                {/* ── Left / Right two-column layout ── */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 items-start">

                    {/* ── LEFT: Field builder ── */}
                    <div className="flex flex-col gap-3">

                        <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">

                            <div className="flex items-center justify-between">

                                <div>
                                    <h2 className="text-sm font-bold tracking-tight text-gray-800">
                                        Dynamic Fields
                                    </h2>

                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Define columns for your table schema
                                    </p>
                                </div>

                                <Button
                                    onClick={addField}
                                    variant="secondary"
                                    leftIcon={<PlusIcon className="w-3.5 h-3.5" />}
                                >
                                    Add Field
                                </Button>

                            </div>

                        </div>

                        {/* Field rows */}
                        <div className="flex flex-col gap-2">

                            {fields.map((field, index) => (

                                <div
                                    key={index}
                                    className="bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 overflow-hidden"
                                >

                                    {/* Field row header */}
                                    <div className="px-4 py-3 flex items-center gap-2">

                                        {/* Drag handle / index indicator */}
                                        <div className="w-6 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                                            <span className="text-[10px] font-medium text-gray-400">
                                                {index + 1}
                                            </span>
                                        </div>

                                        {/* Label input */}
                                        <input
                                            type="text"
                                            placeholder="Field Label  e.g. Customer Name"
                                            value={field.label}
                                            onChange={(e) => {
                                                updateField(index, "label", e.target.value);
                                                updateField(index, "key", toKey(e.target.value));
                                            }}
                                            className="flex-1 h-8 px-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 transition-colors placeholder:text-gray-300 text-gray-800 min-w-0"
                                        />

                                        {/* Type selector */}
                                        <select
                                            value={field.type}
                                            onChange={(e) => updateField(index, "type", e.target.value)}
                                            className="h-8 px-2 text-xs rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 transition-colors text-gray-700 shrink-0"
                                        >
                                            {FIELD_TYPES.map((type) => (

                                                <option
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </option>

                                            ))}

                                        </select>

                                        {/* Required toggle */}
                                        <label className="flex items-center gap-1.5 shrink-0 cursor-pointer select-none">

                                            <div className="relative">
                                                <input
                                                    type="checkbox"
                                                    checked={field.required}
                                                    onChange={(e) =>
                                                        updateField(index, "required", e.target.checked)
                                                    }
                                                    className="peer sr-only"
                                                />

                                                <div className={`w-5 h-5 rounded-md border-2 transition-all duration-150 flex items-center justify-center ${field.required ? "bg-orange-500 border-orange-500" : "bg-white border-gray-300"}`}>
                                                    {field.required && (
                                                        <CheckIcon className="w-3.5 h-3.5 text-white" />
                                                    )}
                                                </div>
                                            </div>

                                            <span className="text-xs text-gray-400">Req</span>

                                        </label>

                                        {/* Remove field */}
                                        {fields.length > 1 && (
                                            <button
                                                onClick={() => removeField(index)}
                                                className="w-7 h-7 cursor-pointer rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-all flex items-center justify-center shrink-0"
                                            >
                                                <TrashIcon className="w-3.5 h-3.5" />
                                            </button>
                                        )}

                                    </div>

                                    {/* Key preview pill */}
                                    {field.key && (
                                        <div className="px-4 pb-2 flex items-center gap-1.5">
                                            <span className="text-[10px] text-gray-400">key:</span>
                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-100 font-mono">
                                                {field.key}
                                            </span>
                                        </div>
                                    )}

                                    {/* Options (select / radio) */}
                                    {(field.type === "select" || field.type === "radio") && (

                                        <div className="px-4 pb-3 pt-1 border-t border-gray-100">

                                            <div className="flex items-center justify-between mb-2">

                                                <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                                    Options
                                                </span>

                                                <button
                                                    onClick={() => addOption(index)}
                                                    className="h-6 px-2 cursor-pointer text-[11px] font-medium rounded-md border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all flex items-center gap-1"
                                                >
                                                    <PlusIcon className="w-3.5 h-3.5" />
                                                    Add Option
                                                </button>

                                            </div>

                                            {field.options.length === 0 ? (

                                                <p className="text-xs text-gray-300 italic">
                                                    No options yet — click Add Option
                                                </p>

                                            ) : (

                                                <div className="flex flex-col gap-1.5">

                                                    {field.options.map(
                                                        (option: string, optionIndex: number) => (

                                                            <div
                                                                key={optionIndex}
                                                                className="flex items-center gap-2"
                                                            >

                                                                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                                                                    {field.type === "radio" ? (
                                                                        <div className="w-3 h-3 rounded-full border-2 border-gray-300" />
                                                                    ) : (
                                                                        <div className="w-3 h-3 rounded border-2 border-gray-300" />
                                                                    )}
                                                                </div>

                                                                <input
                                                                    type="text"
                                                                    placeholder={`Option ${optionIndex + 1}`}
                                                                    value={option}
                                                                    onChange={(e) =>
                                                                        updateOption(index, optionIndex, e.target.value)
                                                                    }
                                                                    className="flex-1 h-7 px-2.5 text-xs rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 transition-colors placeholder:text-gray-300 text-gray-700"
                                                                />

                                                                <button
                                                                    onClick={() => removeOption(index, optionIndex)}
                                                                    className="w-6 h-6 cursor-pointer rounded-md border border-red-100 bg-red-50 text-red-400 hover:bg-red-100 transition-all flex items-center justify-center shrink-0"
                                                                >
                                                                    <TrashIcon className="w-3.5 h-3.5" />
                                                                </button>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            )}

                                        </div>

                                    )}

                                </div>

                            ))}

                        </div>

                        {/* Add another field — bottom inline ghost */}
                        <button
                            onClick={addField}
                            className="h-9 w-full cursor-pointer rounded-xl border border-dashed border-gray-200 bg-white text-gray-400 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all text-sm flex items-center justify-center gap-1.5"
                        >
                            <PlusIcon className="w-3.5 h-3.5" />
                            Add another field
                        </button>

                    </div>

                    {/* ── RIGHT: Preview + Save ── */}
                    <div className="flex flex-col gap-3 xl:sticky xl:top-4">

                        {/* Save card */}
                        <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">

                            <div className="flex items-start justify-between gap-3">

                                <div>
                                    <h2 className="text-sm font-bold tracking-tight text-gray-800">
                                        {tableName || "Untitled Table"}
                                    </h2>

                                    <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">
                                        {description || "No description provided."}
                                    </p>
                                </div>

                                <Button
                                    onClick={handleSave}
                                    variant="primary"
                                    leftIcon={<SaveIcon className="w-3.5 h-3.5" />}
                                >
                                    Save Table
                                </Button>

                            </div>

                            {workspaceId && (
                                <div className="mt-2 pt-2 border-t border-gray-100 flex items-center gap-1.5">
                                    <span className="text-xs text-gray-400">Workspace:</span>
                                    <span className="text-xs font-medium text-gray-700">
                                        {workspaces.find((w) => w.id === workspaceId)?.name ?? workspaceId}
                                    </span>
                                </div>
                            )}

                        </div>

                        {/* Live form preview */}
                        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">

                                <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                    Form Preview
                                </span>

                                <span className="text-[10px] font-medium px-1.5 py-px rounded-full text-white bg-orange-500">
                                    {previewFields.length} fields
                                </span>

                            </div>

                            <div className="px-4 py-4">

                                {previewFields.length === 0 ? (

                                    <div className="flex flex-col items-center justify-center py-8 gap-2">

                                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                                            <Presentation className="w-4 h-4 text-gray-300" />
                                        </div>

                                        <p className="text-xs text-gray-400">
                                            Add fields to see the form preview
                                        </p>

                                    </div>

                                ) : (

                                    <div className="flex flex-col gap-4">

                                        {previewFields.map((field, i) => (

                                            <div
                                                key={i}
                                                className="flex flex-col gap-1.5"
                                            >

                                                <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                                                    {field.label}
                                                    {field.required && (
                                                        <span className="text-orange-500 text-xs">*</span>
                                                    )}
                                                    <span className="ml-auto text-[10px] font-medium px-1.5 py-px rounded-full bg-gray-100 text-gray-400">
                                                        {FIELD_TYPE_ICONS[field.type] ?? field.type}
                                                    </span>
                                                </label>

                                                {field.type === "textarea" && (
                                                    <textarea
                                                        disabled
                                                        placeholder={`Enter ${field.label}...`}
                                                        rows={3}
                                                        className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 bg-gray-50 text-gray-400 placeholder:text-gray-300 resize-none outline-none cursor-not-allowed"
                                                    />
                                                )}

                                                {field.type === "select" && (
                                                    <select
                                                        disabled
                                                        className="h-8 px-2.5 text-xs rounded-lg border border-gray-200 bg-gray-50 text-gray-400 outline-none cursor-not-allowed"
                                                    >
                                                        <option>
                                                            {field.options.length > 0
                                                                ? `${field.options.filter((o: string) => o).length} options`
                                                                : "No options yet"}
                                                        </option>
                                                    </select>
                                                )}

                                                {field.type === "checkbox" && (
                                                    <div className="flex items-center gap-2 h-8">
                                                        <div className="w-4 h-4 rounded border-2 border-gray-300" />
                                                        <span className="text-xs text-gray-400">
                                                            {field.label}
                                                        </span>
                                                    </div>
                                                )}

                                                {field.type === "radio" && (
                                                    <div className="flex flex-col gap-1.5">
                                                        {field.options.filter((o: string) => o).length > 0 ? (
                                                            field.options
                                                                .filter((o: string) => o)
                                                                .map((opt: string, oi: number) => (
                                                                    <div
                                                                        key={oi}
                                                                        className="flex items-center gap-2"
                                                                    >
                                                                        <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                                                                        <span className="text-xs text-gray-500">
                                                                            {opt}
                                                                        </span>
                                                                    </div>
                                                                ))
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300" />
                                                                <span className="text-xs text-gray-300">
                                                                    No options yet
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

                                                {field.type === "file" && (
                                                    <div className="h-16 rounded-lg border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
                                                        <span className="text-xs text-gray-300">
                                                            📎 Upload file
                                                        </span>
                                                    </div>
                                                )}

                                                {!["textarea", "select", "checkbox", "radio", "file"].includes(field.type) && (
                                                    <input
                                                        type={field.type}
                                                        disabled
                                                        placeholder={`Enter ${field.label}...`}
                                                        className="h-8 px-2.5 text-xs rounded-lg border border-gray-200 bg-gray-50 text-gray-400 placeholder:text-gray-300 outline-none cursor-not-allowed"
                                                    />
                                                )}

                                            </div>

                                        ))}

                                        {/* Dummy submit */}
                                        <Button
                                            disabled
                                            variant="secondary"
                                            className="w-full mt-1"
                                        >
                                            Submit
                                        </Button>

                                    </div>

                                )}

                            </div>

                        </div>

                        {/* Schema preview */}
                        {previewFields.length > 0 && (
                            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">

                                <div className="px-4 py-3 border-b border-gray-100">
                                    <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                        Schema Preview
                                    </span>
                                </div>

                                <div className="divide-y divide-gray-100">

                                    {previewFields.map((field, i) => (

                                        <div
                                            key={i}
                                            className="px-4 py-2.5 flex items-center gap-3"
                                        >

                                            <div className="w-6 h-6 rounded-md bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                                                <span className="text-[9px] font-bold text-orange-500">
                                                    {FIELD_TYPE_ICONS[field.type] ?? "?"}
                                                </span>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-gray-700 truncate">
                                                    {field.label}
                                                </p>
                                                <p className="text-[10px] text-gray-400 font-mono truncate">
                                                    {field.key || toKey(field.label)}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1.5 shrink-0">

                                                <span className="text-[10px] font-medium px-1.5 py-px rounded-full bg-gray-100 text-gray-500">
                                                    {field.type}
                                                </span>

                                                {field.required && (
                                                    <span className="text-[10px] font-medium px-1.5 py-px rounded-full bg-orange-50 text-orange-600 border border-orange-100">
                                                        req
                                                    </span>
                                                )}

                                                {(field.type === "select" || field.type === "radio") &&
                                                    field.options.filter((o: string) => o).length > 0 && (
                                                        <span className="text-[10px] font-medium px-1.5 py-px rounded-full bg-blue-50 text-blue-500 border border-blue-100">
                                                            {field.options.filter((o: string) => o).length} opts
                                                        </span>
                                                    )}

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            </div>
                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}