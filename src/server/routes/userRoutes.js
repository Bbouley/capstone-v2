var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/user.js');
var Project = require('../models/project.js');
var Post = require('../models/post.js');


//get ALL users
router.get('/users', function(req, res, next) {
    User.findQ()
    .then(function(data) {
        res.json(data);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});

//get SINGLE user
router.get('/user/:id', function(req, res, next) {
    User.findById(req.params.id)
    .populate('adminOf')
    .populate('memberOf')
    .populate('postsMade')
    .exec(function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

//add SINGLE user and hash password
router.post('/users', function(req, res, next) {
    var newUser = new User(req.body);
    newUser.generateHash(req.body.password, function(err, hash) {
        if (err) {
            console.log(err)
        } else {
            newUser.password = hash;
            newUser.saveQ()
            .then(function(result) {
                res.json(result);
            })
            .catch(function(err) {
                res.send(err);
            });
        }
    });
});

//log SINGLE user in



//edit SINGLE user
router.put('/user/:id', function(req, res, next) {
    var id = req.params.id;
    var options = {new : true, upsert : true};
    var payload = (req.body);
    User.findByIdAndUpdateQ(id, payload, options)
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});

//add project to adminOf user section (this should happen straight away when user creates project)


//add project to memberOf user section


//add post to postsMade user section



//delete SINGLE user (has to be site admin to do this)


//add user onto project(check this isnt being done twice in project routes)


module.exports = router;
