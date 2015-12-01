var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('../auth/local.js');
var User = require('../models/user.js');


router.post('/register', function(req, res) {
    User.register(new User({
        username : req.body.username,
        email : req.body.email
    }), req.body.password, function(err, user) {
        if (err) {
            res.status(500).send({'error whilst registering user!' : err});
        } else {
            passport.authenticate('local')(req, res, function() {
                res.status(200).json({status : 'Much success!! user now registered'})
            });
        }
    });
});


router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
        if (error) {
            return res.json({error : error});
        }
        if (!user) {
            return res.json({error : info});
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.json({err : 'NO USER FOR YOU'});
            }
            res.json({status : 'Much Success!! user now logged in'});
        });
    }) (req, res, next);
});


router.get('/logout', function(req, res, next) {
    req.logout();
    res.json('Much success!! you have logged out');
});

module.exports = router;

