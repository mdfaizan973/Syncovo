const notesService = require('./notes.service');

const createNote = async (req, res, next) => {
  try {
    const result = await notesService.createNote(
      req.body,
      req.user.id
    );

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.note,
    });
  } catch (error) {
    next(error);
  }
};

const getAllNotes = async (req, res, next) => {
  try {
    const result = await notesService.getAllNotes(
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.notes,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleNote = async (req, res, next) => {
  try {
    const result = await notesService.getSingleNote(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.note,
    });
  } catch (error) {
    next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const result = await notesService.updateNote(
      req.params.id,
      req.body,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.note,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const result = await notesService.deleteNote(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};