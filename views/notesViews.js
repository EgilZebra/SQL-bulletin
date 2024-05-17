const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "models", "database.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

//get view of all notes in a channel
module.exports.getChannelNotes = (channelId) => {
    return new Promise((resolve, reject) => {
        db.run(`
        CREATE OR REPLACE VIEW channelNotes
        AS SELECT Channel.channel_ID AS channel,
        Note.note_ID, Note.user_ID
        FROM Channel
        JOIN Note ON Channel.channel_ID = Note.channel_ID
        WHERE Channel.channel_ID = ?
        `, [channelId], (error, row) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(row) ; //viewen
            }
        });
    });
}

//view of all notes by a user
module.exports.getUserNotes = (userId) => {
    return new Promise((resolve, reject) => {
        db.run(`
        CREATE OR REPLACE VIEW userMessages
        AS SELECT User.user_ID AS user,
        Note.note_ID, Note.channel_ID
        FROM User
        JOIN Note ON User.user_ID = Note.user_ID
        WHERE User.user_ID = ?
        `, [userId], (error, row) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(row); //viewen
            }
        });
    });
}