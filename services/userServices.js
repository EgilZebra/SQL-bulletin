// import db!

export const createNewUser = async (Signup) => {
    const { username, password } = Signup;
    return new Promise((resovle, reject) => {
        db.run('INSERT INTO User ( user_Name, user_Password ) VALUES ( ?, ? )', [ username, password ], function(error) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('User added!');
                resovle(true)
            }
        })     
    })
}

export const checkUserName = async ( username ) => {
    return new Promise(( resolve, reject ) => {
        db.get(`SELECT * FROM User WHERE user_Name = ( ? )`, [ username ], function( error, row ) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                if ( row = undefined ) {
                    resolve(false)
                } else {
                    resolve(true)
                }    
            }
        })
    }) 
}

export const checkPassword = async ( Login ) => {
    const { username, password } = Login;
    return new Promise(( resolve, reject ) => {
        db.get(`SELECT * FROM User WHERE user_Name = ( ? )`, [ username ], function( error, row ) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                if ( row = undefined ) {
                    resolve(false)
                    console.log('no user by that name')
                } else {
                    db.get('SELECT * FROM User WHERE (user_Name, user_Password) VALUES ( ?, ? )', [ username, password ], function( error, row ) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        } else {
                            if ( row = undefined ) {
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
