var express = require('express');
var router = express.Router();
var passport = require('passport');
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
                res.status(200).json({status : 'Much success!! user now registered', userID : user._id, username : user.username})
            });
        }
    });
});


router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(500).json({err : err});
        }
        if (!user) {
            return res.status(401).json({err : info});
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({err : 'NO USER FOR YOU'});
            }
            res.status(200).json({status : 'Much Success!! user now logged in', userId : user._id, user : user.username});
        });
    })(req, res, next);
});


router.get('/logout', function(req, res) {
    console.log(req.body);
    req.logout();
    res.status(200).json({status : 'Bye!'});
})


router.get('/logout', function(req, res, next) {
    req.logout();
    res.json('Much success!! you have logged out');
});

module.exports = router;

