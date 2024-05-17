const express = require('express');
const route = express.Router();
const { getNote, postNote, deleteNote, changeNote } = require('../controllers/notesController');

route.get( '/', getNote);
route.post( '/', postNote);
route.delete( '/', deleteNote);
route.put( '/', changeNote);