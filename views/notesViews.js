const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "models", "database.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

//get view of all notes in a channel
module.exports.getChannelNotes = (channelId, callback) => {
    db.run(`
    CREATE OR REPLACE VIEW channelNotes
    AS SELECT Channel.channel_ID AS channel,
    Note.note_ID, Note.user_ID
    FROM Channel
    JOIN Note ON Channel.channel_ID = Note.channel_ID
    WHERE Channel.channel_ID = ?
    `, [channelId], (error) => {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            callback(null);
        }
    });
}

//view of all notes by a user
module.exports.getUserNotes = (userId, callback) => {
    db.run(`
    CREATE OR REPLACE VIEW userMessages
    AS SELECT users.id AS user,
    notes.title, notes.content, notes.channel
    FROM users
    JOIN notes ON users.id = notes.user
    WHERE users.id = ?
    `, [username], (error) => {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            callback(null);
        }
    });
}