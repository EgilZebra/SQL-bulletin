const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "models", "channels.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

db.run(`
    CREATE VIEW IF NOT EXISTS
    subscribed_channels
    AS SELECT
    user.username, user.
    `, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Channels view created")
    }
})




//SELECT channel FROM channels
//INSERT channel INTO channels