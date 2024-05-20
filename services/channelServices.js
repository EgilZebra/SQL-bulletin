const sqlite = require("sqlite3").verbose();



const { error } = require("console");
const path = require("path");

const dbPath = path.join(__dirname, "..", "database", "database.db");
console.log(dbPath)

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});



/* ********************************************************************** */

const insertChannel = ( channel_Name, channel_Owner) => {;
    
    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO Channel ( channel_Name, channel_Owner) VALUES ( ?, ?)',
            [ channel_Name, channel_Owner],
            function (error) {
                if (error) {
                    console.error(`Failed to add new channel: ${error.message}`);
                    reject(error);
                } else {

                    resolve({ channel_ID: this.lastID || channel_ID });
                }
            }
        );
    });
};





/* ********************************************************************** */



const findChannelName = (channelName) => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM Channel WHERE channel_Name = ?`,
            [channelName],
            (error, Channel) => {
                if (error) {
                    reject(error);
                    console.error(error);
                } else {
                    resolve(Channel);
                }
            }
        );
    });
};




const findChannelALL = () => {
    return new Promise((resolve, reject) => {
        db.all(
            `SELECT * FROM Channel`,[],
            (error, Channel) => {
                if (error) {
                    reject(error);
                    console.error(error);
                } else {
                    resolve(Channel);
                }
            }
        );
    });
};


/* ********************************************************************** */


const deleteChannel = (channel_ID) => {
    return new Promise((resolve, reject) => {
        db.run(`SELECT * FROM Channel Where channel_ID = ?`, [channel_ID], (error) => {
            if (error) {
                reject(error);
                console.log(error);
            } else {
                resolve();
            } 
        })
    })
}


/* ********************************************************************** */


// const updateChannel = ( channel_ID, channel_Name, channel_Owner ) => {
//     // const { channel_ID, channel_Name, channel_Owner } = Channel;

//     return new Promise((resolve, reject) => {
//         db.run('UPDATE Channel SET channel_Name = ? WHERE channel_ID = ? AND channel_Owner = ?', 
//             [channel_Name, channel_ID, channel_Owner], (error) => {
//                 if (error) {
//                     reject(error);
//                     console.log(error);
//                 } else {
//                     db.get('SELECT * FROM Channel WHERE channel_ID = ?, [channel_ID]', (error, updatedChannel) => {
//                         if (error) {
//                             reject(error);
//                         } else {
//                             resolve(updatedChannel);
//                         }
//                     });
//                 }
//             });
//     });
// };

/* can use db.get or db.all but only if find channel all */
/* ********************************************************************** */
const subToChannel = (user_ID, channel_ID) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Subscription WHERE ( user_ID = ? ) AND ( channel_ID = ? )`, [ user_ID, channel_ID], ( error, row ) => {
            if (error) {
                reject(error)
            } else {
                if ( row === undefined ) {
                    db.run(`INSERT INTO Subscription (user_ID, channel_ID) VALUES (?, ?)`, [user_ID, channel_ID], (error) => {
                        if (error) {
                            console.log('Error: could not subscribe to Channel, try again');
                            reject(new Error('Error: could not subscribe to Channel, try again'));
                        } else {
                            resolve(true);
                        }
                    });
                } else {
                    resolve(false)
                }
            }
        })
        
    });
};


const GetChannelbyID = ( channel_ID) => {
    return new Promise ((resolve, reject) => {
        db.get(`SELECT * FROM Channel WHERE channel_ID = ?`, [channel_ID],
            (error,channel) => {
                if (error) { console.log('coudnt fint channel ID');
                    reject(error);
                } else {
                    resolve (channel);
                }
            }
        )
    })
} 



const unsubToChannel = (user_ID, channel_ID) => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM Subscription WHERE user_ID = ? AND channel_ID = ?`,
            [user_ID, channel_ID],
            (error) => {
                if (error) {
                    console.log('Could not Unsubscribe!');
                    reject(error);
                } else {
                    resolve();
                }
            }
        );
    });
};

/* ********************************************************************** */



module.exports = { insertChannel, findChannelName, findChannelALL, deleteChannel,  subToChannel, GetChannelbyID, unsubToChannel};