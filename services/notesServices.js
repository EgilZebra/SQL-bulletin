const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "database", "database.db");
console.log(dbPath)

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

module.exports.insertNote = ( note ) => {
    const { userID, channelID, text } = note;
    return new Promise(( resolve, reject ) => {
        db.run(`INSERT INTO Note (note, user_ID, channel_ID) VALUES (?, ?, ?)`, [text, userID, channelID], (error) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports.findNote = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Note WHERE note_ID = ?`, [id], (error, row) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(row);
            }
        });
    });
}

module.exports.deleteANote = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM Note WHERE note_ID = ?`, [id], (error) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports.changeANote = (noteId, text) => {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE Note SET note = ? WHERE note_ID = ?`, [text, noteId], (error) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve();
            }
        });
    });
}