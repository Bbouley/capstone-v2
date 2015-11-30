var mongoose = require('mongoose');
var Project = require('./project.js');
var Post = require('./post.js');

var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var SALT_WORK_FACTOR;


var User = new Schema ({
    username : {
        type     : String,
        required : true,
        index    : {unique : true}
    },
    email : {
        type     : String,
        required : true,
        index    : {unique : true}
    },
    password : String,
    adminOf      : [{ type : Schema.Types.ObjectId, ref : 'projects'}],
    memberOf     : [{ type : Schema.Types.ObjectId, ref : 'projects'}],
    postsMade : [{ type : Schema.Types.ObjectId, ref : 'posts'}],
    siteAdmin    : {
        type     : Boolean,
        required : true,
        default  : false
    }
});

User.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', User);
