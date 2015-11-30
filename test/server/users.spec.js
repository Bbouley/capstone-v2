process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../../src/server/models/user.js');
var Post = require('../../src/server/models/post.js');
var Project = require('../../src/server/models/project.js');

// *** add in requirements for mongoose and schemas *** //

var should = chai.should();

describe('Users API', function() {

    it('should get ALL users', function(done) {

    });

    it('should get SINGLE user', function(done) {

    });

    it('should add SINGLE user', function(done) {

    });

    it('should edit SINGLE user', function(done) {

    });

    it('site admin can delete SINGLE user', function(done) {

    });

    it('non site admin cannot delete user', function(done) {

    });

    it('project admin can add SINGLE user to project members', function(done) {

    });

    it('non project admin cannot add user to project', function(done) {

    });

    it('project admin can remove SINGLE user from project members', function(done) {

    });

    it('non project admin cannot remove SINGLE user from project members', function(done) {

    });

});
