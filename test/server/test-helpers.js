process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../../src/server/models/user.js');
var Post = require('../../src/server/models/post.js');
var Project = require('../../src/server/models/project.js');
chai.use(chaiHttp);

function dropAll() {
    User.collection.drop();
    Post.collection.drop();
    Project.collection.drop();
}

function seedDB() {

    //save users
    var bradley = new User ({
        username : 'Bradley',
        email : 'myemail@email.com',
        password : 'Bradley',
        adminOf : [],
        memberOf : [],
        postsMade : [],
        siteAdmin : true
    });

    bradley.save();

    var testUser1 = new User ({
        username : 'testUser1',
        email : 'testUser1@email.com',
        password : 'testUser1',
        adminOf : [],
        memberOf : [],
        postsMade : [],
        siteAdmin : false
    });

    testUser1.save();

    var testUser2 = new User ({
        username : 'testUser2',
        email : 'testUser2@email.com',
        password : 'testUser2',
        adminOf : [],
        memberOf : [],
        postsMade : [],
        siteAdmin : false
    });

    testUser2.save();

    //save projects
    var designProject = new Project ({
        admin : [],
        members : [],
        title : 'Design Project',
        description : 'A project about design',
        posts : [],
        category : 'Design',
        uploads : []
    });

    designProject.save();

    var engineeringProject = new Project ({
        admin : [],
        members : [],
        title : 'Engineering Project',
        description : 'A project about engineering',
        posts : [],
        category : 'Engineering',
        uploads : []
    });

    engineeringProject.save();

    var randomProject = new Project ({
        admin : [],
        members : [],
        title : 'Random Project',
        description : 'A random Project',
        posts : [],
        category : 'Random',
        uploads : []
    });

    randomProject.save();
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
