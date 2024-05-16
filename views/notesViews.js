const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "models", "notes.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

db.run(`
    CREATE VIEW 
    AS
    
    `, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Notes view created")
    }
});




//SELECT note FROM notes
//INSERT note INTO notes