import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { ChartColumnIncreasing, Check, ChevronDown, ChevronRight, Eye, Edit, FilterIcon, Plus, Search, TableIcon, Trash, Users, XIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import DynamicFormModal from "../../shared/Dynamicformmodal";
import { getUserInfoByKey } from "../../utils/storage";
import { Button } from "../../components/ui/button";
import { useTables } from "../../hooks/useTables";
import { useTablesRow } from "../../hooks/useTablesRow";
import { isNonViewer } from "../../utils/commonUtils";
import Loader from "../../shared/Loader";
import WorkSpaceRowViewModal from "./Workspacerowviewmodal";
import DeleteConfirmModal from "../../shared/DeleteConfirmModal";

export default function TableView() {

    const navigate = useNavigate();

    const { tableId, workspaceId } = useParams();
    const { tables, tableLoading, deleteTable } = useTables(workspaceId);
    const { tableRows, tableRowLoading, createTableRow, updateTableRow, deleteTableRow } = useTablesRow(tableId);

    const [search, setSearch] = useState("");
    const [statsOpen, setStatsOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);
    const [customerOpen, setCustomerOpen] = useState(false);
    const [initialValues, setInitialValues] = useState<Record<string, any>>({});
    const [members, setMembers] = useState<any[]>([]);
    const [openMembersModal, setOpenMembersModal] = useState(false);
    const [viewRow, setViewRow] = useState<any>(null);
    const [viewRowOpen, setViewRowOpen] = useState(false);

    // ── single shared delete modal state ──
    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        title: string;
        description: string;
        onConfirm: () => Promise<void>;
    } | null>(null);

    const [appliedFilters, setAppliedFilters] = useState<
        { id: number; field: string; operator: string; value: string }[]
    >([]);

    const [filters, setFilters] = useState<
        { id: number; field: string; operator: string; value: string }[]
    >([]);
    const [nextFilterId, setNextFilterId] = useState(1);

    const table = tables?.find((item) => item.id === tableId);

    const filteredRows = useMemo(() => {
        if (!tableRows) return [];

        let rows = tableRows;

        if (search.trim()) {
            const q = search.toLowerCase().trim();
            rows = rows.filter((row: any) => {
                if (!row?.row_data) return false;
                return Object.values(row.row_data).some((value) => {
                    if (value === null || value === undefined) return false;
                    return String(value).toLowerCase().includes(q);
                });
            });
        }

        if (appliedFilters.length > 0) {
            rows = rows.filter((row: any) => {
                return appliedFilters.every((filter) => {
                    const raw = row?.row_data?.[filter.field];
                    const val = raw === null || raw === undefined ? "" : String(raw).toLowerCase();
                    const filterVal = filter.value.toLowerCase();
                    switch (filter.operator) {
                        case "is":               return val === filterVal;
                        case "is not":           return val !== filterVal;
                        case "contains":         return val.includes(filterVal);
                        case "does not contain": return !val.includes(filterVal);
                        case "is empty":         return val === "";
                        case "is not empty":     return val !== "";
                        default:                 return true;
                    }
                });
            });
        }

        return rows;
    }, [search, tableRows, appliedFilters]);

    const addFilter = () => {
        setFilters((prev) => [
            ...prev,
            { id: nextFilterId, field: table?.schema?.[0]?.key ?? "", operator: "is", value: "" },
        ]);
        setNextFilterId((n) => n + 1);
    };

    const removeFilter = (id: number) => {
        setFilters((prev) => prev.filter((f) => f.id !== id));
    };

    const updateFilter = (id: number, key: string, value: string) => {
        setFilters((prev) =>
            prev.map((f) => (f.id === id ? { ...f, [key]: value } : f))
        );
    };

    useEffect(() => {
        const viewers = (table?.viewers || []).map((viewer) => ({ ...viewer, role: "Viewer" }));
        const editors = (table?.editors || []).map((editor) => ({ ...editor, role: "Editor" }));
        setMembers([...editors, ...viewers]);
    }, [table]);

    if (tableLoading || tableRowLoading) {
        return <Loader loading={tableLoading || tableRowLoading} />;
    }

    if (!table) {
        return (
            <div className="flex items-center justify-center h-full flex-col gap-3 py-16">
                <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center">
                    <TableIcon className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium text-gray-700">No tables found</p>
                    <p className="text-xs text-gray-400">Get started by creating your first table</p>
                </div>
                <button
                    onClick={() => navigate(`/dashboard/form-builder`, { state: { workspaceId } })}
                    className="h-9 px-4 flex items-center gap-2 cursor-pointer text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Create Table
                </button>
            </div>
        );
    }

    const handleSaveRow = async (payload: any) => {
        await createTableRow({ table_id: tableId, row_data: payload });
    };

    const handleUpdateRow = async (rowId: string, payload: any) => {
        await updateTableRow(rowId, { row_data: payload });
    };

    const handleDeleteRow = async (rowId: string) => {
        await deleteTableRow(rowId);
    };

    return (
        <>
            <div className="bg-[#F6F8FB] min-h-screen p-3 md:p-4">
                <div className="max-w-7xl mx-auto flex flex-col gap-3">

                    {/* ── Header card ── */}
                    <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                    <span className="text-base">🗃️</span>
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold tracking-tight text-gray-800">{table.name}</h1>
                                    <p className="text-xs text-gray-400 mt-0.5">{table.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">

                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                                    <Input
                                        type="text"
                                        placeholder="Search records..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        leftIcon={<Search className="w-3.5 h-3.5 text-gray-400 pointer-events-none" />}
                                    />
                                </div>

                                {/* Filter toggle */}
                                <button
                                    onClick={() => setFilterOpen((v) => !v)}
                                    className={`h-9 px-3 cursor-pointer text-sm font-medium rounded-lg border transition-all flex items-center gap-1.5 ${filterOpen
                                        ? "bg-orange-50 text-orange-600 border-orange-200"
                                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <FilterIcon className="w-3.5 h-3.5" />
                                    Filter
                                    {appliedFilters.length > 0 && (
                                        <span className="text-[10px] font-medium px-1.5 py-px rounded-full text-white bg-orange-500">
                                            {appliedFilters.length}
                                        </span>
                                    )}
                                </button>

                                {/* Stats toggle */}
                                <button
                                    onClick={() => setStatsOpen((v) => !v)}
                                    className="h-9 px-3 cursor-pointer text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-1.5"
                                >
                                    <ChartColumnIncreasing className="w-3.5 h-3.5" />
                                    Stats
                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>

                                {isNonViewer(table?.viewers) && (
                                    <>
                                        <button
                                            onClick={() => { setCustomerOpen(true); setInitialValues({}); }}
                                            className="h-9 px-4 cursor-pointer text-sm font-semibold rounded-lg border border-orange-500 bg-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 transition-all flex items-center gap-1.5"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                            Add Record
                                        </button>

                                        {/* ── Table delete button ── */}
                                        <button
                                            onClick={() => setDeleteModal({
                                                open: true,
                                                title: "Delete Table",
                                                description: "This will permanently delete this table and all its records. This action cannot be undone.",
                                                onConfirm: async () => {
                                                    await deleteTable(table.id);
                                                    navigate(`/dashboard/workspace-view/${workspaceId}`);
                                                },
                                            })}
                                            className="w-10 h-10 cursor-pointer rounded-lg border border-red-100 bg-red-50 text-red-500 flex items-center justify-center transition-all"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* ── Collapsible stats ── */}
                        {statsOpen && (
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <div className={`grid grid-cols-1 md:grid-cols-${table.owner.id === getUserInfoByKey("id") ? 4 : 3} gap-3`}>
                                    {table.owner.id === getUserInfoByKey("id") && (
                                        <div className="bg-gray-50 rounded-xl p-3">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Members</p>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-800">{members[0]?.name || "No members"}</span>
                                                {members?.length > 1 ? "," : ""}
                                                {members[1]?.name && <span className="text-sm font-medium text-gray-800">{members[1]?.name}</span>}
                                                <button
                                                    onClick={() => setOpenMembersModal(true)}
                                                    className="flex items-center text-xs cursor-pointer text-orange-400 hover:text-orange-600 transition-colors"
                                                >
                                                    View more <ChevronRight className="w-3 h-3 ml-0.5 mt-0.5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-gray-50 rounded-xl p-3">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Owner</p>
                                        <h3 className="text-sm font-medium text-gray-800 mt-1">{table.owner.name}</h3>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Total Records</p>
                                        <h3 className="text-lg font-bold tracking-tight text-gray-800 mt-1">{tableRows?.length || 0}</h3>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-3">
                                        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">Total Fields</p>
                                        <h3 className="text-lg font-bold tracking-tight text-gray-800 mt-1">{table.schema.length}</h3>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Filter panel ── */}
                    {filterOpen && (
                        <div className="bg-white rounded-xl border border-gray-100 px-4 py-3">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <FilterIcon className="w-3.5 h-3.5 text-orange-500" />
                                    <span className="text-sm font-medium text-gray-700">Filter</span>
                                    {filters.length > 0 && (
                                        <span className="text-[10px] font-medium px-1.5 py-px rounded-full text-white bg-orange-500">
                                            {filters.length} active
                                        </span>
                                    )}
                                </div>
                                {filters.length > 0 && (
                                    <button
                                        onClick={() => { setFilters([]); setAppliedFilters([]); }}
                                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        Clear all
                                    </button>
                                )}
                            </div>

                            {filters.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-7 gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                                        <FilterIcon className="w-4 h-4 text-gray-300" />
                                    </div>
                                    <p className="text-sm font-medium text-gray-500">You have not yet created a filter</p>
                                    <p className="text-xs text-gray-400 text-center max-w-xs leading-relaxed">
                                        Filters allow you to show rows that apply to your conditions.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 mb-3">
                                    {filters.map((filter, index) => (
                                        <div key={filter.id} className="flex items-center gap-2 flex-wrap">
                                            <span className="text-[11px] font-medium text-gray-400 w-10 text-right shrink-0">
                                                {index === 0 ? "Where" : "And"}
                                            </span>
                                            <select
                                                value={filter.field}
                                                onChange={(e) => updateFilter(filter.id, "field", e.target.value)}
                                                className="h-8 px-2 text-xs rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 transition-colors text-gray-700"
                                            >
                                                {table.schema.map((field: any) => (
                                                    <option key={field.key} value={field.key}>{field.label}</option>
                                                ))}
                                            </select>
                                            <select
                                                value={filter.operator}
                                                onChange={(e) => updateFilter(filter.id, "operator", e.target.value)}
                                                className="h-8 px-2 text-xs rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 transition-colors text-gray-700"
                                            >
                                                <option value="is">is</option>
                                                <option value="is not">is not</option>
                                                <option value="contains">contains</option>
                                                <option value="does not contain">does not contain</option>
                                                <option value="is empty">is empty</option>
                                                <option value="is not empty">is not empty</option>
                                            </select>
                                            <input
                                                type="text"
                                                placeholder="Enter value..."
                                                value={filter.value}
                                                onChange={(e) => updateFilter(filter.id, "value", e.target.value)}
                                                className="h-8 px-2.5 text-xs rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 transition-colors text-gray-700 placeholder:text-gray-300 w-40"
                                            />
                                            <button
                                                onClick={() => removeFilter(filter.id)}
                                                className="w-7 h-7 rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-all flex items-center justify-center shrink-0"
                                            >
                                                <XIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                <button
                                    onClick={addFilter}
                                    className="h-8 px-3 cursor-pointer text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-1.5"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add filter
                                </button>
                                <button
                                    onClick={() => setAppliedFilters(filters)}
                                    className="h-8 px-3 cursor-pointer text-xs font-medium rounded-lg border border-green-200 bg-green-50 text-green-500 hover:bg-green-100 transition-all flex items-center gap-1.5"
                                >
                                    <Check className="w-3.5 h-3.5 text-green-500" />
                                    Apply filters
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── Data table ── */}
                    <Card className="border border-gray-100 overflow-hidden rounded-xl hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        {table.schema.map((field: any) => (
                                            <th
                                                key={field.key}
                                                className={`px-4 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide ${field.type === "number" ? "text-right" : "text-left"}`}
                                            >
                                                {field.label}
                                            </th>
                                        ))}
                                        {isNonViewer(table?.viewers) && (
                                            <th className="px-4 py-2.5 text-right text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                                                Actions
                                            </th>
                                        )}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {filteredRows.length > 0 ? (
                                        filteredRows.map((row: any) => (
                                            <tr key={row.id} className="hover:bg-orange-50/30 transition-colors">
                                                {table.schema.map((field: any) => (
                                                    <td
                                                        key={field.key}
                                                        className={`px-4 py-3 text-sm text-gray-600 ${field.type === "number" ? "text-right tabular-nums" : "text-left"}`}
                                                    >
                                                        <div className="max-w-[200px] truncate">
                                                            {row.row_data[field.key]}
                                                        </div>
                                                    </td>
                                                ))}

                                                {isNonViewer(table?.viewers) && (
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>

                                                            {/* View */}
                                                            <button
                                                                onClick={() => { setViewRow(row); setViewRowOpen(true); }}
                                                                className="w-7 h-7 cursor-pointer rounded-lg border border-green-100 bg-green-50 text-green-500 hover:bg-green-100 transition-all flex items-center justify-center"
                                                            >
                                                                <Eye className="w-3.5 h-3.5" />
                                                            </button>

                                                            {/* Edit */}
                                                            <button
                                                                onClick={() => { setInitialValues(row); setCustomerOpen(true); }}
                                                                className="w-7 h-7 cursor-pointer rounded-lg border border-blue-100 bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all flex items-center justify-center"
                                                            >
                                                                <Edit className="w-3.5 h-3.5" />
                                                            </button>

                                                            {/* ── Row delete button ── */}
                                                            <button
                                                                onClick={() => setDeleteModal({
                                                                    open: true,
                                                                    title: "Delete Record",
                                                                    description: "This action cannot be undone. The record will be permanently removed.",
                                                                    onConfirm: async () => await handleDeleteRow(row.id),
                                                                })}
                                                                className="w-7 h-7 cursor-pointer rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-all flex items-center justify-center"
                                                            >
                                                                <Trash className="w-3.5 h-3.5" />
                                                            </button>

                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={table.schema.length + 1} className="text-center py-14 text-sm text-gray-400">
                                                No Records Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-4 py-2.5 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                                {filteredRows?.length || 0} of {tableRows?.length || 0} records
                            </span>
                        </div>
                    </Card>

                </div>
            </div>

            {/* ── DynamicFormModal ── */}
            <DynamicFormModal
                open={customerOpen}
                onClose={() => setCustomerOpen(false)}
                title={table?.name || "Add Record"}
                description={table?.description || "Fill in the details below to create a new record."}
                fields={table.schema || []}
                submitLabel="Save Record"
                initialValues={initialValues?.row_data || {}}
                onSubmit={(data) => {
                    if (initialValues?.id) {
                        handleUpdateRow(initialValues?.id, data);
                    } else {
                        handleSaveRow(data);
                    }
                }}
            />

            {/* ── Members modal ── */}
            {openMembersModal && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-[2px] p-0 sm:p-4">
                    <div className="w-full sm:max-w-lg bg-white sm:rounded-xl rounded-t-xl border border-gray-100 shadow-xl shadow-gray-200/60 flex flex-col max-h-[85vh] sm:max-h-[88vh]">
                        <div className="px-5 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                                        <Users className="w-4 h-4 text-orange-500" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="text-lg font-bold tracking-tight text-gray-800">Members</h3>
                                        <p className="text-sm text-gray-500">View and manage the members of this table.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setOpenMembersModal(false)}
                                    className="w-8 h-8 cursor-pointer rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all shrink-0"
                                >
                                    <XIcon className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>

                        <div className="px-5 pt-2 pb-4 border-b border-gray-100 flex-shrink-0">
                            <div className="flex items-center justify-center gap-2 pb-2 border-b border-gray-100">
                                <Button variant="primary" className="h-4 cursor-pointer">All</Button>
                                <Button variant="secondary" className="h-4 cursor-pointer">Viewers</Button>
                                <Button variant="secondary" className="h-4 cursor-pointer">Editors</Button>
                            </div>

                            {members?.map((user) => (
                                <div key={user.id} className="pt-1 pb-2 border-b border-gray-100 flex-shrink-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                                                <span className="text-sm font-semibold text-orange-500">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <h2 className="text-base font-bold tracking-tight text-gray-800">{user.name}</h2>
                                                <p className="text-xs text-gray-400 mt-0.5">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`h-6 px-2.5 rounded-full text-[11px] font-medium border flex items-center ${user.role === "Editor" ? "bg-orange-50 text-orange-600 border-orange-200" : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                                                {user.role}
                                            </span>
                                            {/* ── Member remove button ── */}
                                            <button
                                                onClick={() => setDeleteModal({
                                                    open: true,
                                                    title: "Remove Member",
                                                    description: `${user.name} will lose access to this table. This action cannot be undone.`,
                                                    onConfirm: async () => {
                                                        alert("Remove member: " + user.id);
                                                    },
                                                })}
                                                className="w-7 h-7 cursor-pointer rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-all flex items-center justify-center shrink-0"
                                            >
                                                <XIcon className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Row view modal ── */}
            <WorkSpaceRowViewModal
                open={viewRowOpen}
                onClose={() => { setViewRowOpen(false); setViewRow(null); }}
                table={table!}
                row={viewRow!}
            />

            {/* ── Single shared delete confirmation modal ── */}
            {deleteModal &&
                <DeleteConfirmModal
                open={deleteModal? true: false}
                onClose={() => setDeleteModal(null)}
                onConfirm={async () => {
                    await deleteModal?.onConfirm();
                    setDeleteModal(null);
                }}
                title={deleteModal?.title ?? ""}
                description={deleteModal?.description ?? ""}
            />}
        </>
    );
}
