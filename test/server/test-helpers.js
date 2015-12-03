process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../../src/server/models/user.js');
var Post = require('../../src/server/models/post.js');
var Project = require('../../src/server/models/project.js');
var q =
chai.use(chaiHttp);

function dropAll() {
    User.collection.drop();
    Post.collection.drop();
    Project.collection.drop();
}

function seedDB() {

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
            admin : result,
            members : [],
            title : 'Design Project',
            description : 'A project about design',
            posts : [],
            category : 'Design',
            uploads : []
        });

        designProject.saveQ()
        .then(function(result) {

            var id = bradley._id;
            var update = {$push : {adminOf : designProject}};
            var options = {new : true, upsert : true};

            User.findByIdAndUpdateQ(id, update, options)
            .then(function(result) {

            });
        });
    });

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
        // console.log(result);
        var engineeringProject = new Project ({
            admin : result,
            members : [],
            title : 'Engineering Project',
            description : 'A project about engineering',
            posts : [],
            category : 'Engineering',
            uploads : []
        });

        engineeringProject.saveQ()
        .then(function(result) {

            var id = testUser1._id;
            var update = {$push : {adminOf : engineeringProject}};
            var options = {new : true, upsert : true};

            User.findByIdAndUpdateQ(id, update, options)
            .then(function(result) {

            });
        });
    });


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
            admin : result,
            members : [],
            title : 'Random Project',
            description : 'A random Project',
            posts : [],
            category : 'Random',
            uploads : []
        });

        randomProject.saveQ()
        .then(function(result) {

            var id = testUser2._id;
            var update = {$push : {adminOf : randomProject}};
            var options = {new : true, upsert : true};

            User.findByIdAndUpdateQ(id, update, options)
            .then(function(result) {

            })
        })
    });
}

//how to get around async issues and use this in other tests
function getUserID(cb) {
    chai.request(server)
    .get('/api/users')
    .end(function(err, res) {
        return ({
            bradleyID : res.body[0]._id,
            testUser1ID : res.body[1]._id,
            testUser2ID : res.body[2]._id
        });
    });
}


module.exports = {
    seedDB : seedDB,
    dropAll : dropAll,
    getUserID : getUserID
};
