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
        res.status(200).json(data);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});

//get SINGLE user wih populate
router.get('/user/:id', function(req, res, next) {
    User.findById(req.params.id)
    .populate('adminOf')
    .populate('memberOf')
    .populate('postsMade')
    .exec(function(err, user) {
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(user);
        }
    });
});

//get SINGLE user without populate
router.get('/useronly/:id', function(req, res, next) {
    User.findByIdQ(req.params.id)
    .then(function(result) {
        res.status(200).json(result);
    })
    .catch(function(err) {
        res.status(500).send(err);
    })
})

//edit SINGLE user
router.put('/user/:id', function(req, res, next) {
    var id = req.params.id;
    var options = {new : true, upsert : true};
    var payload = (req.body);
    User.findByIdAndUpdateQ(id, payload, options)
    .then(function(result) {
        res.status(200).json(result);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});

//add project to adminOf user section (this should happen straight away when user creates project)


//add project to memberOf user section
router.put('/user/addproject/:userid', function(req, res, next) {
    var id = req.params.userid;
    var update = {$push : {memberOf : req.body.edit}};
    var options = {new : true, upsert : true};

    User.findByIdAndUpdateQ(id, update, options)
    .then(function(user) {
        res.status(200).json(user);
    })
    .catch(function(err) {
        res.status(500).send(err);
    })
    .done();
})

//add post to postsMade user section



//delete SINGLE user (has to be site admin to do this)
router.delete('/user/:id', function(req, res, next) {
    if (req.body.siteAdmin === true) {
        User.findByIdAndRemoveQ(req.params.id)
        .then(function(result) {
            res.status(200).json(result);
        })
        .catch(function(err) {
            res.status(500).send(err);
        })
    } else {
        res.status(403).json({error : 'You Are Not Authorized!!'})
    }
})

//delete post from user and post collection, and remove objectID
router.put('/user/:userid/post/:postid', function(req, res, next) {

    var postId = req.params.postid;
    var userId = req.params.userid;
    var

    User.findByIdQ(userId)
    .then(function(result) {

        var remove = {$pull : {'postsMade' : postId}};
        var options = {new :true, upsert : true};

        User.findByIdAndUpdateQ(userId, remove, options)
        .then(function(user) {
            res.status(200).json(user);
        })
        .catch(function(err) {
            res.status(500).send(err);
        })
        .done();
    })
    .catch(function(err) {
        res.status(500).json(err);
   });
});

//add user onto project(check this isnt being done twice in project routes)



module.exports = router;
