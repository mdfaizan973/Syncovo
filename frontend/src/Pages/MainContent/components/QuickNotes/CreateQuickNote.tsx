import {
    SmilePlus,
    Save,
    List,
    Trash,
    Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotes from "../../../../hooks/useNotes";
import { toast } from "sonner";
import { Button } from "../../../../components/ui/button";
import { BsStarFill } from "react-icons/bs";

export default function CreateQuickNote() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { singleNote, noteLoading, createNote, deleteNote, updateNote } = useNotes(false, id);

    const [note, setNote] = useState({
        title: "",
        description: "",
        content: "",
        favorite: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleSaveNote = async () => {
        if (note.title.trim() === "" || note.content.trim() === "") {
            toast.info("Title and content are required");
            return;
        }

        try {
            const response = id ? await updateNote(id, note) : await createNote(note);
            if (response.success) {
                navigate("/dashboard/quicknote");
            }
        } catch (error) {
            console.error("Error in handleSaveNote:", error);
        }
    };

    const handleDeleteNote = async () => {
        try {
            const response = await deleteNote(id);
            if (response.success) {
                navigate("/dashboard/quicknote");
            }
        } catch (error) {
            console.error("Error in handleDeleteNote:", error);
        }
    };

    useEffect(() => {
        if (id && singleNote) {
            setNote({
                title: singleNote.title || "",
                description: singleNote.description || "",
                content: singleNote.content || "",
                favorite: singleNote.favorite || false,
            });
        } else {
            setNote({
                title: "",
                description: "",
                content: "",
                favorite: false,
            });
        }
    }, [singleNote, id]);

    return (
        <div className="min-h-screen bg-[#F6F8FB] p-3 md:p-4 lg:p-5">

            <div className="max-w-6xl mx-auto flex flex-col gap-4">

                {/* Top Header */}
                <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200">

                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center">
                            <SmilePlus className="w-5 h-5 text-orange-500" />
                        </div>

                        <div>
                            <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#1F2937]">
                                {id ? "Edit Note" : "Create Note"}
                            </h1>

                            <p className="text-sm text-gray-400 mt-1">
                                Capture thoughts, meeting notes, tasks, ideas & docs
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-wrap">

                        <Button
                            variant="primary"
                            leftIcon={<Save className="w-4 h-4" />}
                            onClick={handleSaveNote}
                            loading={noteLoading}
                            className="font-bold tracking-wide text-base"
                        >
                            Save
                        </Button>


                        {id && (<Button
                            variant="danger"
                            title="Delete Note"
                            onClick={handleDeleteNote}
                            loading={noteLoading}
                            className="font-bold tracking-wide text-base"
                        >
                            <Trash className="w-4 h-4" />

                        </Button>)}

                        {note.title.trim() !== "" && (
                            <Button
                                title="Mark as Favorite"
                                variant="secondary"
                                loading={noteLoading}
                                onClick={() => setNote({ ...note, favorite: !note.favorite })}
                                className="font-bold tracking-wide text-base">
                                {note?.favorite ? <BsStarFill className="w-4 h-4 text-yellow-500" /> : <Star className="w-4 h-4" />}
                            </Button>
                        )}

                        <button
                            onClick={() => navigate("/dashboard/quicknote")}
                            className="h-10 px-4 cursor-pointer rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 flex items-center gap-2"
                        >
                            <List className="w-4 h-4" />
                            All Notes
                        </button>


                        {/* <button className="h-10 px-4 cursor-pointer rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all text-sm font-semibold text-gray-600 flex items-center gap-2">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button> */}


                    </div>
                </div>

                {/* Main Editor */}
                {/* <div className="grid grid-cols-1 xl:grid-cols-[220px_1fr] gap-4"> */}
                {/* Sidebar Content */}
                {/* Editor Area */}
                <div className="bg-white rounded-2xl border border-gray-100 hover:border-orange-100 hover:shadow-sm hover:shadow-orange-50 transition-all duration-200 overflow-hidden">


                    {/* Note Content */}
                    <div className="px-5 md:px-8 py-6">

                        {/* Title */}
                        <textarea
                            name="title"
                            value={note.title}
                            onChange={handleChange}
                            placeholder="Untitled Note"
                            rows={1}
                            className="w-full resize-none outline-none text-3xl md:text-4xl font-black tracking-tight text-[#1F2937] placeholder:text-gray-300 overflow-hidden"
                        />

                        <textarea
                            name="description"
                            value={note.description}
                            onChange={handleChange}
                            placeholder="Description here..."
                            className="w-full resize-none outline-none text-[15px] leading-8 text-gray-700 placeholder:text-gray-300"
                        />

                        {/* Content Area */}
                        <textarea
                            name="content"
                            value={note.content}
                            onChange={handleChange}
                            placeholder="Start writing content here..."
                            className="w-full min-h-[500px] resize-none outline-none text-[15px] leading-8 text-gray-700 placeholder:text-gray-300"
                        />

                    </div>

                </div>
                {/* </div> */}
            </div>
        </div>
    );
}