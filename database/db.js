const sqlite = require('sqlite3').verbose();
const dbFilePath = './database/database.db';






function initDatabase() {
    const db = new sqlite.Database(dbFilePath, (error) => {
        if (error) return console.log(error);
        console.log("Connected to database");


    });

    const sql_userTable = `
        CREATE TABLE IF NOT EXISTS User (
            user_ID INTEGER PRIMARY KEY, 
            user_Name TEXT,
            user_Password TEXT
        );
    `;

    const sql_channelTable = `
        CREATE TABLE IF NOT EXISTS Channel (
            channel_ID INTEGER PRIMARY KEY,
            channel_Name TEXT NOT NULL,
            channel_Owner INTEGER, 
            FOREIGN KEY (channel_Owner) REFERENCES User(user_ID)
        );
    `;

    const sql_noteTable = `
        CREATE TABLE IF NOT EXISTS Note (
            note_ID INTEGER PRIMARY KEY,
            note TEXT,
            created_at DATETIME,
            user_ID INTEGER, 
            FOREIGN KEY (user_ID) REFERENCES User(user_ID)
        );
    `;

    db.serialize(() => {
        db.run(sql_userTable, userErr => {
            if (userErr) {
                console.error("Error creating user table:", userErr.message);
                return;
            }
            console.log("User table created successfully");

            db.run(sql_channelTable, channelErr => {
                if (channelErr) {
                    console.error("Error creating channel table:", channelErr.message);
                    return;
                }
                console.log("Channel table created successfully");

                db.run(sql_noteTable, noteErr => {
                    if (noteErr) {
                        console.error("Error creating note table:", noteErr.message);
                        return;
                    }
                    console.log("Note table created successfully");

                    console.log("All tables created successfully");
                });
            });
        });
    });

    return db;
}



module.exports = { initDatabase };
