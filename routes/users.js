const express = require('express');
const route = express.Router();
const { userSignup, userLogin } = require('../controllers/userController');

route.post( '/signup', userSignup);
route.post( '/login', userLogin);