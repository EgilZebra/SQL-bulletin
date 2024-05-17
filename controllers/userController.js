
const { createNewUser, checkUserName } = require('../services/userServices')

// Create a new user 
const userSignup = async ( req, res ) => {

    const Signup = {
        username: req.body.username,
        password: req.body.password,
    }
 
    try {
        if (!Signup.username) {
            res.status(400).send("You must write an username!");
            return;
        } else if (!Signup.password) {
        res.status(400).send("You must add a password!");
        return;
        } else if (checkUserName(Signup.username) = false) {
            res.status(406).send("Username taken, try again!");
            return;
        } else {
            const success = await createNewUser(Signup)
            if (success) {
                res.status(200).send('User created and logged in!');
                return;
            }
        }

    } catch (error) {
        res.status(500).send('Cannot create user, sorry!');
    }
}

// Login as a registered user
const userLogin = async ( req, res ) => {

    const Login = {
        username: req.body.username,
        password: req.body.password
    }
    
    try {
        if ( await checkPassword(Login) ) {
            res.status(200).send('Login successful!');
            console.log('Login successful!');
        } else {
            res.status(400).send('Login failed!')
        }
    } catch (error) {
        res.status(500).send('Server Error!');
    }
}

module.exports = {
    userSignup,
    userLogin
}