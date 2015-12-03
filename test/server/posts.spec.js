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
describe('posts API', function() {

    var bradleyID,
        testUser1ID,
        testUser2ID,
        designProjectID,
        engineeringProjectID,
        randomProjectID,
        postID;

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
                                                        postID = res.body._id;
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

    // afterEach(function(done) {
    //     testHelpers.dropAll();
    //     done();
    // })

    it('should get ALL posts for single project', function(done) {
        chai.request(server)
        .get('/api/project/' + designProjectID)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.posts[0].should.have.property('content');
            res.body.posts[0].should.have.property('madeBy');
            res.body.posts[0].should.have.property('dateCreated');
            res.body.posts[0].should.have.property('onProject');
            res.body.posts[0].should.have.property('upVotes');
            res.body.posts[0].upVotes.should.equal(0);
            res.body.posts[0].madeBy.should.equal(bradleyID);
            res.body.posts[0].onProject.should.equal(designProjectID);
            res.body.posts[0].content.should.equal('Test Post for Design Project');
            done();
        })
    });

    it('should get ALL posts for single user', function(done) {
        chai.request(server)
        .get('/api/user/' + bradleyID)
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.postsMade[0].should.have.property('content');
            res.body.postsMade[0].should.have.property('madeBy');
            res.body.postsMade[0].should.have.property('dateCreated');
            res.body.postsMade[0].should.have.property('onProject');
            res.body.postsMade[0].should.have.property('upVotes');
            res.body.postsMade[0].upVotes.should.equal(0);
            res.body.postsMade[0].madeBy.should.equal(bradleyID);
            res.body.postsMade[0].onProject.should.equal(designProjectID);
            res.body.postsMade[0].content.should.equal('Test Post for Design Project');
            done();
        })
    });

    it('should delete SINGLE post and then remove objectid', function(done) {
        chai.request(server)
        .put('/api/user/' + bradleyID + '/post/' + postID)
        .end(function(err, res) {
            res.status.should.equal(200);
            res.should.be.json;
            res.body.should.have.property('username');
            res.body.should.have.property('email')
            res.body.should.have.property('password');
            res.body.should.have.property('siteAdmin');
            res.body.should.have.property('postsMade');
            res.body.should.have.property('memberOf');
            res.body.should.have.property('adminOf');
            res.body.postsMade.length.should.equal(0);
            done();
        });
    });

    xit('should delete SINGLE post to project, project admin only', function(done) {

    });

    xit('should prevent non admin from removing post', function(done) {

    });

    xit('should allow user to edit their own post', function(done)
    {

    });

    xit('should prevent user from editing other users posts', function(done) {

    });

    xit('should allow user to upvote other users posts, but only once', function(done) {

    });

    xit('should prevent non-logged in user from upvoting post', function(done) {

    });
});

