require('dotenv').load();

// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../../_config.js');
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;

// *** Models/Schemas *** //
var User = require('./models/user.js');


// *** routes *** //
var routes = require('./routes/index.js');
var auth = require('./routes/auth.js')
var userRoutes = require('./routes/userRoutes.js');
var projectRoutes = require('./routes/projectRoutes.js');
var postRoutes = require('./routes/postRoutes.js');


// *** express instance *** //
var app = express();

// *** mongoose *** //
var mongoURI = process.env.MONGOLAB_URI || config.mongoURI[app.settings.env];
mongoose.connect(mongoURI, function(err, res) {
    if (err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
    }
});


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client')));
app.use(session({
  secret: process.env.secretKey,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// *** configure passport *** //
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// *** main routes *** //
app.use('/', routes);
app.use('/auth/', auth)
app.use('/api/', userRoutes);
app.use('/api/', projectRoutes);
app.use('/api/', postRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.status('error').send({
            message : err.message,
            error   : err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send('error', {
        message : err.message,
        error   : {}
    });
});


module.exports = app;
