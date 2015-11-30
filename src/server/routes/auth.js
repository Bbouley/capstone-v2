var express = require('express');
var router = express.Router();

var passportLocal = require('../auth/local.js');

router.post('/login', function(req, res, next) {
    passportLocal.authenticate('local', function() {
        if (err) {
            res.send({'Something went wrong...' : err});
        } else {
            res.json('Much success!! you are logged in')
        }
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.json('Much success!! you have logged out')
})


