const express = require('express');
const route = express.Router();
const { getNote, getNotes, postNote, deleteNote, changeNote } = require('../controllers/notesController');

route.get( '/:noteId', getNote);
route.get( '/', getNotes);
route.post( '/', postNote);
route.delete( '/', deleteNote);
route.put( '/', changeNote);