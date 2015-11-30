process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../../src/server/models/user.js');
var Post = require('../../src/server/models/post.js');
var Project = require('../../src/server/models/project.js');
var testHelpers = require('./test-helpers.js');

var should = chai.should();
chai.use(chaiHttp);



// *** add in requirements for mongoose and schemas *** //

var should = chai.should();


describe('posts API', function() {

    it('should get ALL posts for single project', function(done) {

    });

    it('should get ALL posts for single user', function(done) {

    });

    it('should add SINGLE post to project', function(done) {

    });

    it('should delete SINGLE post to project, project admin only', function(done) {

    });

    it('should prevent non admin from removing post', function(done) {

    });

    it('should allow user to edit their own post', function(done)
    {

    });

    it('should prevent user from editing other users posts', function(done) {

    });

    it('should allow user to upvote other users posts, but only once', function(done) {

    });

    it('should prevent non-logged in user from upvoting post', function(done) {

    });
});

