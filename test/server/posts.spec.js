process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../../src/server/models/user.js');
var Post = require('../../src/server/models/post.js');
var Project = require('../../src/server/models/project.js');
var helper = require('./test-helpers.js');

var should = chai.should();
chai.use(chaiHttp);



// *** add in requirements for mongoose and schemas *** //

var should = chai.should();


describe('example', function() {
    it('should return 1', function() {
        var test = 1;
        test.should.equal(1);
    });
});

