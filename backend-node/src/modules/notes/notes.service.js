const crypto = require('crypto');

const {
  createNoteQuery,
  getAllNotesQuery,
  getNoteByIdQuery,
  updateNoteQuery,
  deleteNoteQuery,
} = require('./notes.query');

const createNote = async (payload, userId) => {
  if (!payload.title) {
    const error = new Error('title is required');
    error.statusCode = 400;
    throw error;
  }

  const note = await createNoteQuery({
    id: crypto.randomUUID(),
    title: payload.title,
    description: payload.description || '',
    content: payload.content || '',
    favorite: payload.favorite || false,
    created_by: userId,
  });

  return {
    message: 'Note created successfully',
    note,
  };
};

const getAllNotes = async (userId) => {
  const notes = await getAllNotesQuery(userId);

  return {
    message: 'Notes fetched successfully',
    notes,
  };
};

const getSingleNote = async (noteId, userId) => {
  const note = await getNoteByIdQuery(noteId, userId);

  if (!note) {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    message: 'Note fetched successfully',
    note,
  };
};

const updateNote = async (noteId, payload, userId) => {
  if (!Object.keys(payload).length) {
    const error = new Error('No fields to update');
    error.statusCode = 400;
    throw error;
  }

  const updated = await updateNoteQuery(noteId, userId, payload);

  if (!updated) {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    message: 'Note updated successfully',
    note: updated,
  };
};

const deleteNote = async (noteId, userId) => {
  const deleted = await deleteNoteQuery(
    noteId,
    userId
  );

  if (!deleted) {
    const error = new Error('Note not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    message: 'Note deleted successfully',
  };
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};