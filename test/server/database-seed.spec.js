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

var should = chai.should();

xdescribe('Test Helper functions', function() {

    beforeEach(function(done) {
        testHelpers.dropAll();
        testHelpers.seedDB();
        done();
    });

    afterEach(function(done) {
        testHelpers.dropAll();
        done();
    });

    it('should seed users collection', function(done) {
        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.equal(3);
            res.body[0].should.have.property('userName');
            res.body[0].should.have.property('email');
            res.body[0].should.have.property('adminOf');
            res.body[0].should.have.property('memberOf');
            res.body[0].should.have.property('postsMade');
            res.body[0].should.have.property('siteAdmin');
            res.body[0].userName.should.equal('Bradley');
            res.body[1].userName.should.equal('testUser1');
            res.body[2].userName.should.equal('testUser2');
            done();
        });
    });

    it('should seed projects collection', function(done) {
        chai.request(server)
        .get('/api/projects')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.equal(3);
            res.body[0].should.have.property('admin');
            res.body[0].should.have.property('members');
            res.body[0].should.have.property('title');
            res.body[0].should.have.property('description');
            res.body[0].should.have.property('posts');
            res.body[0].should.have.property('category');
            res.body[0].should.have.property('uploads');
            res.body[0].title.should.equal('Design Project');
            res.body[1].title.should.equal('Engineering Project');
            res.body[2].title.should.equal('Random Project');
            done();
        });
    });

});
