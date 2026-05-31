import { useMemo, useState } from "react";
import { LayoutGrid, Table2, Search, Star, Clock3, FileText, Trash, Eye, Plus } from "lucide-react";
import { Card } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import useNotes from "../../../../hooks/useNotes";
import DataNotFound from "../../../../shared/DataNotFound";
import { formatDate } from "../../../../utils/commonUtils";
import Loader from "../../../../shared/Loader";

type View = "table" | "grid";
type Tab = "all" | "favorites";

export default function QuickNotesDashboard() {
    const navigate = useNavigate();

    const { notes, noteLoading, deleteNote } = useNotes(true);
    const [activeTab, setActiveTab] = useState<Tab>("all");
    const [view, setView] = useState<View>("table");
    const [query, setQuery] = useState("");

    const filteredNotes = useMemo(() => {
        if (activeTab === "favorites") {
            return notes.filter((note) => note.favorite);
        }
        return notes;
    }, [notes, activeTab]);

    const favCount = notes?.filter((note) => note.favorite).length ?? 0;

    const handleDeleteNote = async (id: string) => {
        try {
            await deleteNote(id);
        } catch (error) {
            console.error("Error in handleDeleteNote:", error);
        }
    };


    return (
        <div className="min-h-screen bg-[#F6F8FB] p-3 md:p-4">
            <div className="max-w-7xl mx-auto flex flex-col gap-3">

                {/* Header */}
                <div
                    className="bg-white rounded-xl border border-gray-100 px-4 py-3 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4 text-orange-500" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight text-gray-800">Quick Notes</h1>
                                <p className="text-xs text-gray-400 mt-0.5">Manage meeting notes, sprint plans and workspace documents</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search notes..."
                                    className="h-9 pl-8 pr-3 text-sm rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-orange-400 transition-colors w-44"
                                />
                            </div>
                            <Button
                                variant="primary"
                                leftIcon={<Plus className="w-3.5 h-3.5" />}
                                onClick={() => navigate("/dashboard/create-note")}
                                className="text-sm font-semibold h-9 px-4"
                            >
                                New Note
                            </Button>
                        </div>
                    </div>

                    {/* Tabs + View Toggle */}
                    <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100 flex-wrap">
                        <div className="flex items-center gap-1.5">
                            {(["all", "favorites"] as Tab[]).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setActiveTab(t)}
                                    className={`h-7 px-3 cursor-pointer rounded-full text-xs font-medium transition-all border flex items-center gap-1.5 ${activeTab === t
                                            ? "bg-orange-500 text-white border-orange-200"
                                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                                        }`}
                                >
                                    {t === "favorites" && <Star className="w-3 h-3" />}
                                    {t === "all" ? "All Notes" : "Favorites"}
                                    <span
                                        className={`text-[10px] font-medium px-1.5 py-px rounded-full ${t === "favorites" ? "bg-white text-orange-500" : "bg-white text-orange-500"
                                            }`}
                                    >
                                        {t === "all" ? notes?.length ?? 0 : favCount}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{filteredNotes.length} notes</span>
                            <div className="flex bg-gray-50 border border-gray-100 rounded-lg p-0.5 gap-0.5">
                                {(["table", "grid"] as View[]).map((v) => (
                                    <button
                                        key={v}
                                        onClick={() => setView(v)}
                                        className={`w-7 h-7 cursor-pointer rounded-md flex items-center justify-center transition-all ${view === v
                                                ? "bg-white shadow-sm text-orange-500"
                                                : "text-gray-400 hover:text-orange-500"
                                            }`}
                                    >
                                        {v === "table" ? <Table2 className="w-3.5 h-3.5" /> : <LayoutGrid className="w-3.5 h-3.5" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {noteLoading ? (
                    <Loader loading={noteLoading} />
                ) :
                    filteredNotes?.length > 0 ? (
                        <QuickNotesTableGrid
                            filteredNotes={filteredNotes}
                            view={view}
                            handleDeleteNote={handleDeleteNote}
                        />
                    ) : (
                        <DataNotFound
                            title="No notes found"
                            description="We couldn't find anything here. Try creating a new entry or adjusting your filters."
                            actionLabel="Create New"
                            onAction={() => navigate("/dashboard/create-note")}
                        />
                    )}

            </div>
        </div>
    );
}


const QuickNotesTableGrid = ({
    filteredNotes,
    view,
    handleDeleteNote,
}: {
    filteredNotes: any;
    view: "table" | "grid";
    handleDeleteNote: (id: string) => void;
}) => {
    const navigate = useNavigate();

    const handleViewNote = (note: any) => {
        navigate(`/dashboard/view-note/${note.id}`);
    };

    return (
        <>
            {/* Table View */}
            {view === "table" && (
                <Card className="border border-gray-100 overflow-hidden rounded-xl hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                                        Note
                                    </th>
                                    <th className="text-left px-4 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                                        Last Updated
                                    </th>
                                    <th className="text-right px-4 py-2.5 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredNotes.map((note: any, index: number) => (
                                    <tr
                                        key={index}
                                        onClick={() => handleViewNote(note)}
                                        className="hover:bg-orange-50/30 transition-colors cursor-pointer"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg ${note.color} bg-orange-50 flex items-center justify-center shrink-0`}>
                                                    <FileText className="w-3.5 h-3.5 text-orange-500" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        <p className="text-sm font-medium text-gray-800 truncate">{note.title}</p>
                                                        {note.favorite && (
                                                            <Star className="w-3 h-3 fill-orange-500 text-orange-500 shrink-0" />
                                                        )}
                                                    </div>
                                                    {note.description ? (
                                                        <p className="text-xs text-gray-400 truncate mt-0.5">{note.description}</p>
                                                    ) : (
                                                        <p className="text-xs text-gray-400 truncate mt-0.5">No description available</p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                <Clock3 className="w-3.5 h-3.5" />
                                                {formatDate(note.updated_at || "")}
                                            </div>
                                        </td>

                                        <td className="px-4 py-3">
                                            <div
                                                className="flex items-center justify-end gap-1.5"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={() => handleViewNote(note)}
                                                    className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteNote(note.id)}
                                                    className="w-7 h-7 cursor-pointer flex items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                                                >
                                                    <Trash className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}

            {/* Grid View */}
            {view === "grid" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {filteredNotes.map((note: any, index: number) => (
                        <div
                            key={index}
                            onClick={() => handleViewNote(note)}
                            className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className={`w-9 h-9 rounded-xl ${note.color} bg-orange-50 flex items-center justify-center shrink-0`}>
                                    <FileText className="w-4 h-4 text-orange-500" />
                                </div>
                                <div
                                    className="flex items-center gap-1.5"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {note.favorite && (
                                        <button className="w-7 h-7 rounded-lg bg-yellow-50 border border-yellow-100 flex items-center justify-center">
                                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleViewNote(note)}
                                        className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 hover:bg-blue-100 transition-all"
                                    >
                                        <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteNote(note.id)}
                                        className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500 hover:bg-red-100 transition-all"
                                    >
                                        <Trash className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            <h2 className="text-sm font-medium text-gray-800 mt-3 leading-snug">{note.title}</h2>

                            {note.description ? (
                                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">{note.description}</p>
                            ) : (
                                <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">No description available</p>
                            )}

                            <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-3 pt-3 border-t border-gray-100">
                                <Clock3 className="w-3 h-3" />
                                {formatDate(note.updated_at || "")}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};