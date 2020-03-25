const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const passport = require('passport');

const logger = require('morgan');
const cookieParser = require('cookie-parser');

const config = require('./config/key');

app.use(logger('dev'));
app.use(cors());

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(express.json());
app.use(cookieParser());

// Database
const mongoose = require('mongoose');

const connectMongo = () => {
    mongoose
        .connect(config.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .then(() => console.log('Database Connected!!'))
        .catch(err => {
            connectMongo();
            console.log(err);
        });
};

connectMongo();

// Initialize passport Middleware
app.use(passport.initialize());
require('./middlewares/jwt.middleware')(passport);

// Routes
// app.get('/', (req, res) => {
//     console.log("Hello")
//     res.cookie('token', "1234567890");
//     console.log("H1llo2")

//     // console.log(req.cookies)
// });

const authenticate = require('./middlewares/authenticate.middleware');

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/user', authenticate, require('./routes/user.route'));

//use this to show the image you have in node js server to client (react js)
app.use('/uploads', express.static('uploads'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    // index.html for all page routes
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, '../client', 'build', 'index.html')
        );
    });
    // Do not send stack trace of error message when in production
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.send('Error occurred while handling the request.');
    });
} else {
    // Log stack trace of error message while in development
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        // console.log(err);
        res.send(err.message);
    });
}

module.exports = app;
