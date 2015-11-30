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

describe('Projects API', function() {

    //get all projects route is already being tested in dbseed spec file

    it('should get ALL projects', function() {

    });

    it('should get SINGLE project', function() {

    });

    it('should add SINGLE project', function() {

    });

    it('should edit SINGLE project', function() {

    });

    it('should delete SINGLE project', function() {

    });


    //could these be tested in edit project?
    it('should add SINGLE member to project', function() {

    });

    it('should add SINGLE comment to project', function() {

    });

    it('should add SINGLE upload to project', function() {

    });

});
