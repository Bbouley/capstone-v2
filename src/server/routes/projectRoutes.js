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
        res.status(200).json(data);
    })
    .catch(function(err) {
        res.status(500).send(err);
    })
    .done();
});


//get SINGLE project (add in populate function)
router.get('/project/:id', function(req, res, next) {
    Project.findById(req.params.id)
    .populate('admin')
    .populate('members')
    .populate('posts')
    .exec(function(err, project) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(project);
        }
    });
})

//get SINGLE project (without populate)
router.get('/projectonly/:id', function(req, res, next) {
    Project.findByIdQ(req.params.id)
    .then(function(project) {
        res.status(200).json(project);
    })
    .catch(function(err) {
        res.status(500).send(err);
    })
    .done();
})

//add SINGLE project (has to be logged in to do this)
router.post('/projects', function(req, res, next) {
    var newProject = new Project(req.body);
    newProject.saveQ()
    .then(function(project) {
        res.status(200).json(project);
    })
    .catch(function(err) {
        res.status(500).send(err);
    })
    .done();
})

//edit SINGLE project (Has to be project admin to do this)
router.put('/project/:id', function(req, res, next) {
    var userid = req.body.user;
    var projectid = req.params.id;
    var update = (req.body.edit);
    var options = {new : true, upsert : true};

    Project.findByIdQ(projectid)
    .then(function(result) {
        if (result.admin === userid) {
            Project.findByIdAndUpdateQ(projectid, update, options)
            .then(function(project) {
                res.status(200).json(project);
            })
            .catch(function(err) {
                res.status(200).send(err);
            })
            .done();
        } else {
            res.status(403).json({error : 'You are not authorized!!'});
        }
    });
});


//delete SINGLE project (has to be project admin to do this, could maybe archive instead of delete it??)


//add members to a project


//add comments to a project


//add uploads to a project (AWS maybe???)


module.exports = router;
