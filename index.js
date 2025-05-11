const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./src/Utils/db');
const authRoute = require('./src/Routes/Auth.Routes');
const resumeFormRoute = require('./src/Routes/resumeForm.Routes');
const isAuthenticated = require('./src/Middleware/isauthenticated.middleware');
const sessionSend = require('./src/Routes/Session.Routes');

const app = express();
const cors = require('cors');
/* app.use(cors({
  origin: '*', // ⚠️ Use specific origin in production
}));
 */
app.use(express.json());
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));                     //* Specify the views folder
app.use('/css', express.static(path.join(__dirname, 'css')));        //* Serve 'css' folder
app.use(express.static('public'));                                   //* use the public folder to access the file like css js

//* Connect Mongodb
connectDB();

app.use(session({
    secret: '123456789',                                            //* Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/resumedb'
    })                                                               //* Store sessions in MongoDB
}));


//* Authentication Route
app.use('/api/Auth', authRoute);


//* resumeform Route
app.use('/api/resumeform', resumeFormRoute);


//* sessions send 
app.use('/api',isAuthenticated, sessionSend);


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req,res) => {
    res.render('Auth', {showSignup: false});
})
app.get('/signup',(req,res) => {
       res.render('Auth', {showSignup: true});
})
app.get('/auth', (req,res) => {
    res.render('Auth', {showSignup: true});
})

app.get('/about',isAuthenticated,(req,res) => {
    res.render('about');
});

app.get('/home', isAuthenticated,(req, res) => {

    res.render('home', { session: req.session });
});

app.get('/template',isAuthenticated, (req,res) => {
    res.render('template');
})

app.get('/logout', (req, res) => {

    //* Redirect to login page after logging out
    req.session.destroy(() => {
        res.redirect('/auth');
    });
});

app.get('/resumeupdate', isAuthenticated, (req,res) => {
    //* Check if the user is logged in
    if (req.session.user) {
        // You can now use the templateNumber to render specific templates or perform any logic
        res.render('resumeformshow');
    } else {
        res.render('Auth', { showSignup: false });
    }
})

app.get('/resumeform',isAuthenticated, (req, res) => {
    const { templateNumber } = req.params;

    //* Check if the user is logged in
    if (req.session.user) {
        // You can now use the templateNumber to render specific templates or perform any logic
        res.render('resumeform');
    } else {
        res.render('Auth', { showSignup: false });
    }
});



app.listen(3000, () => {
    console.log("Server is up and running on port 3000");
});