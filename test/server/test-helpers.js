process.env.NODE_ENV = 'test';

var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../../src/server/models/user.js');
var Post = require('../../src/server/models/post.js');
var Project = require('../../src/server/models/project.js');

function dropAll() {
    User.collection.drop();
    Post.collection.drop();
    Project.collection.drop();
}

function seedDB() {

    //save users
    var bradley = new User ({
        userName : 'Bradley',
        email : 'myemail@email.com',
        adminOf : [],
        memberOf : [],
        postsMade : [],
        siteAdmin : true
    });

    bradley.save();

    var testUser1 = new User ({
        userName : 'testUser1',
        email : 'testUser1@email.com',
        adminOf : [],
        memberOf : [],
        postsMade : [],
        siteAdmin : false
    });

    testUser1.save();

    var testUser2 = new User ({
        userName : 'testUser2',
        email : 'testUser2@email.com',
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

module.exports = {
    seedDB : seedDB,
    dropAll : dropAll
};
