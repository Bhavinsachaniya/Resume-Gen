const express = require('express');
const Router = express.Router();
const signup = require('../Controllers/Signup.controller');
const Login = require('../Controllers/Login.controller');
const logout = require('../Controllers/logout.controller');

Router.post('/signup', signup);
Router.post('/login',Login);

module.exports = Router;