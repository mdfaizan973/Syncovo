const express = require('express');

const router = express.Router();

const notesController = require('./notes.controller');
const authMiddleware = require('../../middleware/auth.middleware');


router.post('/', authMiddleware, notesController.createNote);
router.get('/', authMiddleware, notesController.getAllNotes);
router.get('/:id', authMiddleware, notesController.getSingleNote);
router.put('/:id', authMiddleware, notesController.updateNote);
router.delete('/:id', authMiddleware, notesController.deleteNote);

module.exports = router;