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

describe('Projects API', function() {

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

    // afterEach(function(done) {
    //     testHelpers.dropAll();
    //     done();
    // })

    //get all projects route is already being tested in dbseed spec file
    it('should get SINGLE project populated', function(done) {
        chai.request(server)
        .get('/api/project/' + designProjectID)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('admin');
            res.body.should.have.property('members');
            res.body.should.have.property('title');
            res.body.should.have.property('description');
            res.body.should.have.property('posts');
            res.body.should.have.property('category');
            res.body.should.have.property('uploads');
            res.body.admin.should.be.a('object');
            res.body.admin.username.should.equal('Bradley');
            res.body.title.should.equal('Design Project');
            done();
        })
    });

    it('should add SINGLE project', function() {

    });

    xit('should edit SINGLE project if projectadmin', function() {

    });

    //could these be tested in edit project?
    xit('should add SINGLE member to project', function() {

    });

    xit('should add SINGLE comment to project', function() {

    });

    xit('should add SINGLE upload to project', function() {

    });

});
