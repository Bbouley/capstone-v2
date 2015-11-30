process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../../src/server/models/user.js');
var Post = require('../../src/server/models/post.js');
var Project = require('../../src/server/models/project.js');
var testHelpers = require('./test-helpers.js');

// *** add in requirements for mongoose and schemas *** //

var should = chai.should();
chai.use(chaiHttp);

describe('Users API', function() {

    var bradleyID,
        testUser1ID,
        testUser2ID;

    beforeEach(function(done) {
        testHelpers.dropAll();
        testHelpers.seedDB();

        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            bradleyID = res.body[0]._id;
            testUser1ID = res.body[1]._id;
            testUser2ID = res.body[2]._id;
            done();
        })

    })

    //get all users is being tested in database-seed already

    it('should get SINGLE user', function(done) {
        chai.request(server)
        .get('/api/user/' + bradleyID)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('userName');
            res.body.should.have.property('email');
            res.body.should.have.property('adminOf');
            res.body.should.have.property('memberOf');
            res.body.should.have.property('postsMade');
            res.body.should.have.property('siteAdmin');
            res.body.userName.should.equal('Bradley');
            res.body.siteAdmin.should.equal(true);
            done();
        })
    });

    it('should add SINGLE user', function(done) {
        var newUser = ({
            userName : 'PostingUser',
            email : 'PostUser@email.com',
        });
        chai.request(server)
        .post('/api/users')
        .send(newUser)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('userName');
            res.body.should.have.property('email');
            res.body.should.have.property('adminOf');
            res.body.should.have.property('memberOf');
            res.body.should.have.property('postsMade');
            res.body.should.have.property('siteAdmin');
            res.body.userName.should.equal('PostingUser');
            res.body.email.should.equal('PostUser@email.com');
            done();
        })
    });

    it('should edit SINGLE user', function(done) {
        var edit = {
            userName : 'Not Bradley'
        };
        chai.request(server)
        .put('/api/user/' + bradleyID)
        .send(edit)
        .end(function(err, res) {
            console.log(res.body);
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('userName');
            res.body.should.have.property('email');
            res.body.should.have.property('adminOf');
            res.body.should.have.property('memberOf');
            res.body.should.have.property('postsMade');
            res.body.should.have.property('siteAdmin');
            res.body.userName.should.equal('Not Bradley');
            res.body.email.should.equal('myemail@email.com');
            done();
        })
    });

    //when a project is created, needs to have adminOf defined, possibly test in projects section?

    it('site admin can delete SINGLE user', function(done) {
        //this has to be done when user auth is set up
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

