const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "database", "database.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

//get view of all users subscribed to a channel
module.exports.getChannelUsers = (channelID) => {
    return new Promise((resolve, reject) => {
        db.run(`DROP VIEW IF EXISTS channelUsers`, [], (error) => {
            if (error) {
                console.log(error);
                reject(error)
            } else {
                db.run(`
                CREATE VIEW channelUsers
                AS SELECT Subscription.channel_ID AS channel,
                Subscription.user_ID AS user
                FROM Subscription
                `, [], (error) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        db.all(`SELECT * FROM channelUsers WHERE channel = ?`, [channelID], (error, rows) => {
                            if (error) {
                                console.log(error);
                                reject(error);
                            } else {
                                resolve(rows);
                            }
                        });
                    }
                });
            }
        });        
    });
}