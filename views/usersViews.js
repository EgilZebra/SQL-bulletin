const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "models", "users.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

db.run(``, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("User view created")
    }
})




//SELECT user FROM users
//INSERT user INTO users