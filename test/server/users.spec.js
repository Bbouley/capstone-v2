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

xdescribe('Users API', function() {

    var bradleyID,
        testUser1ID,
        testUser2ID,
        designProjectID,
        engineeringProjectID,
        randomProjectID;

    beforeEach(function(done) {

        testHelpers.dropAll();
        testHelpers.seedDB();

        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            bradleyID = res.body[0]._id;
            testUser1ID = res.body[1]._id;
            testUser2ID = res.body[2]._id;
            chai.request(server)
            .get('/api/projects')
            .end(function(err, res) {
                designProjectID = res.body[0]._id;
                engineeringProjectID = res.body[1]._id;
                randomProjectID = res.body[2]._id;
                done();
            })
        });

    });

    afterEach(function(done) {
        testHelpers.dropAll();
        done();
    })

    //get all users is being tested in database-seed already

    it('should get SINGLE user', function(done) {
        chai.request(server)
        .get('/api/user/' + bradleyID)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.should.have.property('email');
            res.body.should.have.property('password');
            res.body.should.have.property('adminOf');
            res.body.should.have.property('memberOf');
            res.body.should.have.property('postsMade');
            res.body.should.have.property('siteAdmin');
            res.body.username.should.equal('Bradley');
            res.body.siteAdmin.should.equal(true);
            done();
        });
    });

    it('should edit SINGLE user', function(done) {
        var edit = {
            username : 'Not Bradley'
        };
        chai.request(server)
        .put('/api/user/' + bradleyID)
        .send(edit)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.should.have.property('email');
            res.body.should.have.property('password');
            res.body.should.have.property('adminOf');
            res.body.should.have.property('memberOf');
            res.body.should.have.property('postsMade');
            res.body.should.have.property('siteAdmin');
            res.body.username.should.equal('Not Bradley');
            res.body.email.should.equal('myemail@email.com');
            done();
        });
    });

    //when a project is created, needs to have adminOf defined, possibly test in projects section?

    it('site admin can delete SINGLE user', function(done) {
        chai.request(server)
        .get('/api/user/' + bradleyID)
        .end(function(error, response) {
            chai.request(server)
            .delete('/api/user/' + testUser2ID)
            .send(response.body)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('username');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('adminOf');
                res.body.should.have.property('memberOf');
                res.body.should.have.property('postsMade');
                res.body.should.have.property('siteAdmin');
                res.body.username.should.equal('testUser2');
                res.body.email.should.equal('testUser2@email.com');
                done();
            })
        });
    });

    it('non site admin cannot delete user', function(done) {
        chai.request(server)
        .get('/api/user/' + testUser1ID)
        .end(function(error, response) {
            chai.request(server)
            .delete('/api/user/' + testUser2ID)
            .send(response.body)
            .end(function(err, res) {
                res.should.have.status(403);
                res.should.be.json;
                res.body.should.have.property('error');
                res.body.error.should.equal('You Are Not Authorized!!');
                done();
            })
        })
    });

    it('user can add themselves to project', function(done) {
            var userid = testUser1ID;
            var edit = designProjectID;

            chai.request(server)
            .put('/api/user/addproject/' + userid)
            .send({edit : edit})
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('username');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('adminOf');
                res.body.should.have.property('memberOf');
                res.body.should.have.property('postsMade');
                res.body.should.have.property('siteAdmin');
                res.body.username.should.equal('testUser1');
                res.body.email.should.equal('testUser1@email.com');
                res.body.memberOf.length.should.equal(1);
                done();
            })
        });


});

