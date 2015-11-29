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
        res.send(err)
    })
    .done();
})

//get SINGLE user


//add SINGLE user


//edit SINGLE user


//delete SINGLE user (has to be site admin to do this)


//add user onto project(check this isnt being done twice in project routes)


//make user member of a project (same as above)


module.exports = router;
