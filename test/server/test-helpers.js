process.env.NODE_ENV = 'test';

var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../../src/server/models/user.js');
var Post = require('../../src/server/models/post.js');
var Project = require('../../src/server/models/project.js')

function dropAll() {
    User.collection.drop();
    Post.collection.drop();
    Project.collection.drop();
}

function seedDB() {

    var bradley = new User ({
        userName : 'Bradley',
        email : 'myemail@email.com',
        adminOf : [],
        memberOf : [],
        commentsMade : [],
        siteAdmin : true
    });

    bradley.save();

    var testUser1 = new User ({
        userName : 'testUser1',
        email : 'testUser1@email.com',
        adminOf : [],
        memberOf : [],
        commentsMade : [],
        siteAdmin : false
    });

    testUser1.save();

    var testUser2 = new User ({
        userName : 'testUser2',
        email : 'testUser2@email.com',
        adminOf : [],
        memberOf : [],
        commentsMade : [],
        siteAdmin : false
    })

    testUser2.save();


}

module.exports = {
    seedDB : seedDB,
    dropAll : dropAll
};
