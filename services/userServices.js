const sqlite = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "..", "database", "database.db");

const db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error);
    }
});

const createNewUser = async ( username, password ) => {
    // const { username, password } = Signup;
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO User ( user_Name, user_Password ) VALUES ( ?, ? )', [ username, password ], function(error) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('User added!');
                resolve(true)
            }
        })     
    })
}

const checkUserName = async ( username ) => {
    return new Promise(( resolve, reject ) => {
        db.get(`SELECT * FROM User WHERE user_Name = ( ? )`, [ username ], function( error, row ) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                if ( row === undefined ) {
                    resolve(false)
                } else {
                    resolve(true)
                }    
            }
        })
    }) 
}

const checkPassword = async ( username, password ) => {
    return new Promise(( resolve, reject ) => {
        db.get(`SELECT * FROM User WHERE user_Name = ( ? )`, [ username ], function( error, row ) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                if ( row === undefined ) {
                    resolve(false)
                    console.log('no user by that name')
                } else {
                    db.get('SELECT * FROM User WHERE user_Name = ? AND  user_Password = ?', [ username, password ], function( error, row ) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        } else {
                            if ( row === undefined ) {
                                resolve(false);
                                console.log('wrong password')
                            } else {
                                resolve(true)
                            }  
                        }
                    })
                }    
            }
        })
    })
}

module.exports = {
    checkPassword,
    checkUserName,
    createNewUser
}