var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/user.js');
var Project = require('../models/project.js');
var Post = require('../models/post.js');


//get ALL comments for single project, populate fields


//get ALL comments for single user


//post new comment to poject


//delete comment from project (has to be admin to do this)


//edit comment (has to be user who posted comment)


//add upvote to comment (user has to be on project team to do this)


module.exports = router;


