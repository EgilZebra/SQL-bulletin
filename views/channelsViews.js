const sqlite = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "..", "models", "channels.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

//get view of all channels owned by a user
module.exports.getUserChannels = (userId) => {
    return new Promise((resolve, reject) => {
        db.run(`
        CREATE OR REPLACE VIEW userChannels
        AS SELECT User.user_ID AS user,
        Channel.channel_Name
        FROM User
        INNER JOIN Channel ON User.user_ID = Channel.channel_Owner
        WHERE User.user_ID = ?
        `, [userId], (error, row) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(row);
            }
        });
    });
}

//get view of all channels subscribed to by a user
module.exports.getUserSubscriptions = (userId) => {
    return new Promise((resolve, reject) => {
        db.run(`
        CREATE OR REPLACE VIEW userSubscriptions
        AS SELECT Subscription.user_ID AS user,
        Channel.channel_ID AS channel
        FROM Subscription
        INNER JOIN Channel ON Subscription.channel_ID = Channel.channel_ID
        WHERE Subscription.user_ID = ?
        `, [userId], (error, row) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                resolve(row);
            }
        });
    });
}