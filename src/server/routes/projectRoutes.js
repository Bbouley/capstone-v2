var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/user.js');
var Project = require('../models/project.js');
var Post = require('../models/post.js');


//get ALL projects (add in populate function)
router.get('/projects', function(req, res, next) {
    Project.find()
    .populate('admin')
    .populate('members')
    .populate('posts')
    .execQ()
    .then(function(data) {
        res.json(data);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});


//get SINGLE project (add in populate function)


//add SINGLE project (has to be logged in to do this)


//edit SINGLE project (Has to be project admin to do this)


//delete SINGLE project (has to be project admin to do this, could maybe archive instead of delete it??)


//add members to a project


//add comments to a project


//add uploads to a project (AWS maybe???)


module.exports = router;
