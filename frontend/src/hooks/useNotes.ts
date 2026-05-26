import { useEffect, useState } from "react";
import * as notesService from "../services/notes";

export default function useNotes(loadAllNotes = false, noteId = '') {
    const [notes, setNotes] = useState<any[]>([]);
    const [singleNote, setSingleNote] = useState<any | null>(null);
    const [noteLoading, setNoteLoading] = useState<boolean>(false);

    // POST NOTE
    const createNote = async (note: any) => {
        setNoteLoading(true);
        try {
            const response = await notesService.postNote(note);
            return response;
        } catch (error) {
            console.error("Error in createNote:", error);
            return error;
        } finally {
            setNoteLoading(false);
        }
    }
    // GET ALL NOTES
    const getAllNotes = async () => {
        setNoteLoading(true);

        try {
            const response = await notesService.getAllNotes();
            setNotes(response?.data ?? []);
            return response;
        } catch (error) {
            console.error("Error in getAllNotes:", error);
            return error;
        } finally {
            setNoteLoading(false);
        }

    }
    // GET SINGLE NOTE
    const getSingleNote = async (id: string) => {
        setNoteLoading(true);
        try {
            const response = await notesService.getSingleNote(id);
            setSingleNote(response?.data ?? null);
        } catch (error) {
            console.error("Error in getSingleNote:", error);
            return error;
        } finally {
            setNoteLoading(false);
        }
    }
    // UPDATE NOTE
    const updateNote = async (id: string, note: any) => {
        setNoteLoading(true);
        try {
            const response = await notesService.updateNote(id, note);
            if (response.success) {
                await getAllNotes()
                return response;
            }
        } catch (error) {
            console.error("Error in updateNote:", error);
            return error;
        } finally {
            setNoteLoading(false);
        }

    }
    // DELETE NOTE
    const deleteNote = async (id: string) => {

        setNoteLoading(true);
        try {
            const response = await notesService.deleteNote(id);
            if (response.success) {
                await getAllNotes()
                return response;
            }
        } catch (error) {
            console.error("Error in deleteNote:", error);
            return error;
        } finally {
            setNoteLoading(false);
        }
    }

    useEffect(() => {
        if (loadAllNotes) {
            getAllNotes();
        }
        if (noteId) {
            getSingleNote(noteId as string);
        }
    }, [loadAllNotes, noteId]);

    return {
        notes,
        singleNote,
        noteLoading,
        createNote,
        getAllNotes,
        getSingleNote,
        updateNote,
        deleteNote,
    };
}