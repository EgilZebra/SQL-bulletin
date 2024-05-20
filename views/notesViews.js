const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "database", "database.db");

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
        `, [channelId], (error) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                db.all(`SELECT * FROM channelNotes`, [], (error, rows) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve(rows);
                    }
                });
            }
        });
    });
}

//view of all notes by a user
module.exports.getUserNotes = (userId) => {
    return new Promise((resolve, reject) => {
        db.run(`

        CREATE OR REPLACE VIEW userNotes
        AS SELECT User.user_ID AS user,
        Note.note_ID, Note.channel_ID
        FROM User
        JOIN Note ON User.user_ID = Note.user_ID
        WHERE User.user_ID = ?
        `, [userId], (error) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                db.all(`SELECT * FROM userNotes`, [], (error, rows) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve(rows);
                    }
                });
            }
        });
    });
}