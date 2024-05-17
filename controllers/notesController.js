
const getNote = async ( req, res ) => {
    let notes;
    if ( req.body.userID ) {
        notes = await getUserNotes( req.body.userId )
    } else if ( req.body.channelID ) {
        notes = await getChannelNotes( req.body.channelId )
    }
    try {
        if ( notes ) {
            let note
            res.status(200).json(note);
            return;
        } else {
            res.status(404).send('note not found!');
        }
    } catch (error) {
        res.status(500).send('');
    }
};

const postNote = ( req, res ) => {
    const note = {
        note: req.body.note,
        user_ID: req.body.userID,
        channel_ID: req.body.channelID
    };
    try {
        if ( note ) {
            insertNote(note);
            res.status(200).send('')
            return
        }
    } catch (error) {
        res.status(500).send('')
    }
};
// const deleteNote = ( req, res ) => {
//     const noteID = req.body.noteID;
//     try {
//         res.status(200).send('')
//     } catch (error) {
//         res.status(500).send('')
//     }
// };
// const changeNote = ( req, res ) => {
//     try {
//         res.status(200).send('')
//     } catch (error) {
//         res.status(500).send('')
//     }
// };

module.exports = {
    getNote,
    postNote
    // deleteNote,
    // changeNote
}