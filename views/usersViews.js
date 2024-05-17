const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "models", "database.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

//get view of all users subscribed to a channel
module.exports.getChannelUsers = (channelID) => {
    return new Promise((resolve, reject) => {
        db.run(`
        CREATE OR REPLACE VIEW channelUsers
        AS SELECT Subscription.channel_ID AS channel,
        Subscription.user_ID AS user
        FROM Subscription
        JOIN Channel ON Subscription.channel_ID = Channel.channel_ID
        WHERE Subscription.channel_ID = ?
        `, [channelID], (error, row) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(row);
            }
        });
    });
}