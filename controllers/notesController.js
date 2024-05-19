const {
    insertNote,
    findNote,
    deleteANote
} = require("../services/notesServices")


const getNote = async ( req, res ) => {
    const id = req.params.noteId;
    const note = await findNote(id);
    try {
        if (note) {
            res.status(200).json(note)
        } else {
            res.status(404).send("Note not found")
        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch note", error: error})
    }
}

const getNotes = async (req, res) => {
    let notes;
    let target
    if ( req.body.userID ) {
        notes = await getUserNotes( req.body.userId );
        target = "User"
    } else if ( req.body.channelID ) {
        notes = await getChannelNotes( req.body.channelId );
        target = "Channel"
    }
    try {
        if ( notes ) {
            res.status(200).json({notes: notes});
            return;
        } else {
            res.status(404).send(`${target} not found!`);
        }
    } catch (error) {
        res.status(500).json({message: "Failed to fetch notes", error: error});
    }
}

const postNote = async ( req, res ) => {
    const note = {
        text: req.body.note,
        userID: req.body.userID,
        channelID: req.body.channelID
    };
    try {
        if ( note ) {
            await insertNote(note);
            res.status(200).json({message: "Note added"});
        }
    } catch (error) {
        res.status(500).json({message: "Failed to add note", error: error})
    }
};

const deleteNote = async (req, res) => {
    const id = req.body.noteId;
    try {
        await deleteANote(id);
        res.status(200).send("Note deleted")
    } catch (error) {
        res.status(500).json({message: "Failed to delete note", error: error})
    }
}

// const changeNote = ( req, res ) => {
//     try {
//         res.status(200).send('')
//     } catch (error) {
//         res.status(500).send('')
//     }
// };

module.exports = {
    getNote,
    getNotes,
    postNote,
    deleteNote,
    // changeNote
}