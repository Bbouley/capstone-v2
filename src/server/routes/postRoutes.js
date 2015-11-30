var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/user.js');
var Project = require('../models/project.js');
var Post = require('../models/post.js');


//get ALL posts for single project, populate fields


//get ALL posts for single user


//post new post to poject


//delete post from project (has to be admin to do this)


//edit post (has to be user who posted post)


//add upvote to post (user has to be on project team to do this)


module.exports = router;


