// *** main dependencies *** //
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../../_config.js');


// *** routes *** //
var routes = require('./routes/index.js');
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


// *** main routes *** //
app.use('/', routes);
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
    res.status(err.status || 500);
    res.send('error', {
        message : err.message,
        error   : {}
    });
});


module.exports = app;
