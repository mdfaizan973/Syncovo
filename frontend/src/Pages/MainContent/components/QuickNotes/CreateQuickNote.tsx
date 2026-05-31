import { SmilePlus, Save, List, Trash, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { BsStarFill } from "react-icons/bs";
import useNotes from "../../../../hooks/useNotes";
import { Button } from "../../../../components/ui/button";
import Loader from "../../../../shared/Loader";

export default function CreateQuickNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { singleNote, noteLoading, createNote, deleteNote, updateNote } = useNotes(false, id);

    const [note, setNote] = useState({ title: "", description: "", content: "", favorite: false });

    useEffect(() => {
        if (id && singleNote) setNote({ title: singleNote.title || "", description: singleNote.description || "", content: singleNote.content || "", favorite: singleNote.favorite || false });
        else setNote({ title: "", description: "", content: "", favorite: false });
    }, [singleNote, id]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNote({ ...note, [e.target.name]: e.target.value });

    const handleSaveNote = async () => {
        if (!note.title.trim() || !note.content.trim()) { toast.info("Title and content are required"); return; }
        try {
            const res = id ? await updateNote(id, note) : await createNote(note);
            if (res.success) navigate("/dashboard/quicknote");
        } catch (err) { console.error(err); }
    };

    const handleDeleteNote = async () => {
        try {
            const res = await deleteNote(id);
            if (res.success) navigate("/dashboard/quicknote");
        } catch (err) { console.error(err); }
    };

    if (noteLoading) {
        return (
            <Loader loading={noteLoading} />
        )
    }

    return (
        <div className="min-h-screen bg-[#F6F8FB] p-3 md:p-4">
            <div className="max-w-7xl mx-auto flex flex-col gap-3">

                {/* Header */}
                <div className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                            <SmilePlus className="w-4 h-4 text-orange-500" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-gray-800">{id ? "Edit Note" : "Create Note"}</h1>
                            <p className="text-xs text-gray-400 mt-0.5">Capture thoughts, meeting notes, tasks & ideas</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <Button variant="primary" leftIcon={<Save className="w-3.5 h-3.5" />} onClick={handleSaveNote} loading={noteLoading} className="text-sm font-semibold h-9 px-4">Save</Button>
                        {id && <Button variant="danger" onClick={handleDeleteNote} loading={noteLoading} className="h-9 w-9 p-0 flex items-center justify-center"><Trash className="w-3.5 h-3.5" /></Button>}
                        {note.title.trim() && <Button variant="secondary" onClick={() => setNote({ ...note, favorite: !note.favorite })} loading={noteLoading} className="h-9 w-9 p-0 flex items-center justify-center">{note.favorite ? <BsStarFill className="w-3.5 h-3.5 text-yellow-500" /> : <Star className="w-3.5 h-3.5" />}</Button>}
                        <button onClick={() => navigate("/dashboard/quicknote")} className="h-9 px-3 cursor-pointer rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-all text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                            <List className="w-3.5 h-3.5" /> All Notes
                        </button>
                    </div>
                </div>

                {/* Editor */}
                <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">
                    <div className="px-6 py-5">
                        <textarea name="title" value={note.title} onChange={handleChange} placeholder="Untitled Note" rows={1} className="w-full resize-none outline-none text-2xl md:text-3xl font-bold tracking-tight text-gray-800 placeholder:text-gray-300 overflow-hidden mb-2" />
                        <textarea name="description" value={note.description} onChange={handleChange} placeholder="Short description..." rows={2} className="w-full resize-none outline-none text-sm leading-7 text-gray-500 placeholder:text-gray-300 pb-3 border-b border-gray-100 mb-3" />
                        <textarea name="content" value={note.content} onChange={handleChange} placeholder="Start writing here..." className="w-full min-h-[460px] resize-none outline-none text-sm leading-7 text-gray-600 placeholder:text-gray-300" />
                    </div>
                </div>

            </div>
        </div>
    );
}