const {
    insertNote,
    findNote,
    deleteANote,
    changeANote,
    isSubscribed,
    removeNoteFromChannels
} = require("../services/notesServices");
const {
    getUserNotes,
    getChannelNotes
} = require('../views/notesViews')


const getNote = async ( req, res ) => {
    const id = req.params.noteId;
    const note = await findNote(id);
    try {
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).send("Note not found");
        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch note", error: error});
    }
}

const getNotes = async (req, res) => {
    let notes;
    let target;

    if ( req.body.userID && !req.body.channelID ) {
        notes = await getUserNotes( req.body.userID );
        target = "User";
    } else if ( req.body.userID && req.body.channelID ) {

        const {userID, channelID} = req.body

        const subscribed = await isSubscribed(userID, channelID);
        if (subscribed) {
            notes = await getChannelNotes( channelID );
            target = "Channel";
        } else {
            res.status(403).send("User is not subscribed to this channel");
            return;
        }

    } else {
        res.status(400).send("UserID and/or channelID missing");
        return;
    }

    try {
        if ( notes ) {
            res.status(200).json({notes: notes});
        } else {
            res.status(404).send(`${target} notes not found!`);
        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch notes", error: error});
    }
}

const postNote = async ( req, res ) => {
    const note = {
        text: req.body.text,
        userID: req.body.userID
    }
    const { userID, channels, text } = req.body; //channels = an array of channelIDs
    console.log(note)
    try {
        if ( note ) {
            const noteID = await insertNote(userID, text); //adds note to note table and returns its id
            await placeNote(noteID, channels); //adds note id to channels in notesInChannel table
            res.status(200).json({message: "Note added"});
        }
    } catch (error) {
        res.status(500).json({message: "Failed to add note", error: error});
    }
}

const deleteNote = async (req, res) => {
    const {noteID, userID} = req.body;
    const note = await findNote(noteID);
    if (note.user_ID == userID) {
        try {
            await deleteANote(noteID);

            await removeNoteFromChannels(noteID);

            res.status(200).send("Note deleted");
        } catch (error) {
            res.status(500).json({message: "Failed to delete note", error: error});
        }
    } else {
        res.status(403).send("Can only delete own notes");
    }


}

const changeNote = async (req, res) => {
    const {noteID, userID, text} = req.body;
    const note = await findNote(noteID);
    if (note.user_ID == userID) {
        try {
            await changeANote(noteID, text);
            res.status(200).send("Note edited");
        } catch (error) {
            res.status(500).json({message: "Failed to edit note", error: error});
        }
    } else {
        res.status(403).send("Can only edit own notes");
    }
}

module.exports = {
    getNote,
    getNotes,
    postNote,
    deleteNote,
    changeNote
}