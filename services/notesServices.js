const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "database", "database.db");
console.log(dbPath)

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

module.exports.insertNote = ( userID, text ) => {
    // const { userID, channelID, text } = note;
    console.log(userID, text)
    return new Promise(( resolve, reject ) => {
        db.run(`INSERT INTO Note (note, user_ID) VALUES (?, ?)`,
        [text, userID],
        function (error) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(this.lastID);
            }
        });
    });
}

module.exports.placeNote = (id, channels) => {
    return new Promise((resolve, reject) => {
        channels.forEach(channel => {
            db.run(`
            INSERT INTO NotesInChannel (
                note_ID,
                channel_ID
            ) VALUES (?, ?);
            `, [id, channel], (error) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve();
                }
            });
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

module.exports.removeNoteFromChannels = (id) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM NotesInChannel WHERE note_ID = ?`, [id], (error) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve();
            }
        })
    })
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

module.exports.isSubscribed = (user, channel) => {
    return new Promise(  (resolve, reject) => {
        let result = [];
        let promises = [];

        for ( let i=0 ; i < channel.length ; i++ ) {
            promises.push(new Promise((resolve, reject) => {
                db.get(`SELECT * FROM Subscription WHERE user_ID = ? AND channel_ID = ?`,
                [user, channel[i]],
                (error, row) => {
                    if (error) {
                        reject(error);
                    } else {
                        if (row) {
                            result.push(channel[i]);
                        } 
                        resolve(result);
                    }
                }
            );
            }))
            
        }
        Promise.all(promises)
        .then(() => resolve(result))
        .catch(error => reject(error));
    });
}