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

        var bradley = new User ({
            username : 'Bradley',
            email : 'myemail@email.com',
            password : 'Bradley',
            adminOf : [],
            memberOf : [],
            postsMade : [],
            siteAdmin : true
        });

        bradley.saveQ()
        .then(function(result) {

            var designProject = new Project ({
                admin : result._id,
                members : [],
                title : 'Design Project',
                description : 'A project about design',
                posts : [],
                category : 'Design',
                uploads : []
            });

            designProject.saveQ()
            .then(function(result) {

                var id = designProject.admin;
                var update = {$push : {adminOf : designProject}};
                var options = {new : true, upsert : true};

                User.findByIdAndUpdateQ(id, update, options)
                .then(function(result) {

                    var testUser1 = new User ({
                        username : 'testUser1',
                        email : 'testUser1@email.com',
                        password : 'testUser1',
                        adminOf : [],
                        memberOf : [],
                        postsMade : [],
                        siteAdmin : false
                    });

                    testUser1.saveQ()
                    .then(function(result) {

                        var engineeringProject = new Project ({
                            admin : result._id,
                            members : [],
                            title : 'Engineering Project',
                            description : 'A project about engineering',
                            posts : [],
                            category : 'Engineering',
                            uploads : []
                        });

                        engineeringProject.saveQ()
                        .then(function(result) {

                            var id = engineeringProject.admin;
                            var update = {$push : {adminOf : engineeringProject}};
                            var options = {new : true, upsert : true};

                            User.findByIdAndUpdateQ(id, update, options)
                            .then(function(result) {

                                var testUser2 = new User ({
                                    username : 'testUser2',
                                    email : 'testUser2@email.com',
                                    password : 'testUser2',
                                    adminOf : [],
                                    memberOf : [],
                                    postsMade : [],
                                    siteAdmin : false
                                });

                                testUser2.saveQ()
                                .then(function(result) {

                                    var randomProject = new Project ({
                                        admin : result._id,
                                        members : [],
                                        title : 'Random Project',
                                        description : 'A random Project',
                                        posts : [],
                                        category : 'Random',
                                        uploads : []
                                    });

                                    randomProject.saveQ()
                                    .then(function(result) {

                                        var id = randomProject.admin;
                                        var update = {$push : {adminOf : randomProject}};
                                        var options = {new : true, upsert : true};

                                        User.findByIdAndUpdateQ(id, update, options)
                                        .then(function(result) {
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
                                                       var newPost = new Post ({
                                                        content : 'Test Post for Design Project'
                                                    });
                                                    chai.request(server)
                                                    .put('/api/project/addpost/' + designProjectID)
                                                    .send({post : newPost, user : bradleyID})
                                                    .end(function(err, res) {
                                                        done();
                                                    });
                                                });
                                            });
                                        })
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    afterEach(function(done) {
        testHelpers.dropAll();
        done();
    })


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

    it('should get SINGLE project unpopulated', function(done) {
        chai.request(server)
        .get('/api/projectonly/' + designProjectID)
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
            res.body.admin.should.be.a('string');
            res.body.admin.should.equal(bradleyID);
            res.body.title.should.equal('Design Project');
            done();
        })
    })

    it('should add SINGLE project', function(done) {
        var newProject = new Project ({
            admin : bradleyID,
            title : 'Test Project',
            description : 'Testing Test Project',
            category : 'Test Stuff'
        });
        chai.request(server)
        .post('/api/projects')
        .send(newProject)
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
            res.body.admin.should.be.a('string');
            res.body.title.should.equal('Test Project');
            res.body.description.should.equal('Testing Test Project');
            done();
        })

    });

    it('should edit SINGLE project if project admin', function(done) {
        chai.request(server)
        .put('/api/project/' + designProjectID)
        .send({user : bradleyID, edit : {title : 'Edited Project'}})
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
            res.body.title.should.equal('Edited Project');
            done();
        })
    });

    it('non project admin cannot edit project', function(done) {
        chai.request(server)
        .put('/api/project/' + designProjectID)
        .send({user : testUser1ID, edit : {title : 'Edited Project'}})
        .end(function(err, res) {
            res.should.have.status(403);
            res.should.be.json;
            res.body.should.have.property('error');
            res.body.error.should.equal('You are not authorized!!');
            done();
        })
    })

    //could these be tested in edit project?
    it('should add SINGLE member to project', function(done) {
        chai.request(server)
        .put('/api/project/addmember/' + designProjectID)
        .send({id : testUser1ID})
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
            res.body.title.should.equal('Design Project');
            res.body.members.length.should.equal(1);
            done();
        })
    });

    it('should add SINGLE post to Project, and add that project to user', function(done) {
        var newPost = new Post ({
            content : 'Post On Design Project'
        });
        chai.request(server)
        .put('/api/project/addpost/' + designProjectID)
        .send({post : newPost, user : bradleyID})
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('content');
            res.body.should.have.property('madeBy');
            res.body.should.have.property('dateCreated');
            res.body.should.have.property('onProject');
            res.body.should.have.property('upVotes');
            res.body.upVotes.should.equal(0);
            res.body.madeBy.should.equal(bradleyID);
            res.body.onProject.should.equal(designProjectID);
            done();
        });
    });

    xit('should add SINGLE upload to project', function() {

    });

});
