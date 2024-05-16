const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "models", "database.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

//get view of all notes in a channel
//callback(null) should select all from the created view and send it in the res
module.exports.getChannelNotes = (db, channelName, callback) => {
    db.run(`
    CREATE VIEW IF NOT EXISTS channelNotes
    AS SELECT channels.name AS channel,
    notes.title, notes.content, notes.user
    FROM channels
    JOIN notes ON channels.name = notes.channel
    WHERE channels.name = ?
    `, [channelName], (error) => {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            callback(null)
        }
    });
}

//view of all notes by a user
module.exports.getUserNotes = (db, username, callback) => {
    db.run(`
    CREATE VIEW IF NOT EXISTS userMessages
    AS SELECT users.username AS user,
    notes.title, notes.content, notes.channel
    FROM users
    JOIN notes ON users.username = notes.user
    WHERE users.username = ?
    `, [username], (error) => {
        if (error) {
            console.log(error);
            callback(error);
        } else {
            callback(null);
        }
    });
}


/* db.serialize(() => {

    //view of all notes in a channel
    db.run(`
    CREATE VIEW IF NOT EXISTS channelNotes
    AS SELECT channels.name AS channel,
    notes.title, notes.content, notes.user
    FROM channels
    JOIN notes ON channels.name = notes.channel
    WHERE channels.name = ?
    `, [channelName], (error) => {
        if (error) {
            console.log(error);
        }
    });

    //view of all notes by a user
    db.run(`
    CREATE VIEW IF NOT EXISTS userMessages
    AS SELECT users.username AS user,
    notes.title, notes.content, notes.channel
    FROM users
    JOIN notes ON users.username = notes.user
    WHERE users.username = ?
    `, [username], (error) => {
        if (error) {
            console.log(error)
        }
    })

    console.log("Note views created")
}); */




//SELECT note FROM notes
//INSERT note INTO notes