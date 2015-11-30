var mongoose = require('mongoose');
var Project = require('./project.js');
var Post = require('./post.js');
var Schema = mongoose.Schema;

var User = new Schema ({
    userName : {
        type     : String,
        required : true,
        index    : {unique : true}
    },
    email : {
        type     : String,
        required : true,
        index    : {unique : true}
    },
    adminOf      : [{ type : Schema.Types.ObjectId, ref : 'projects'}],
    memberOf     : [{ type : Schema.Types.ObjectId, ref : 'projects'}],
    postsMade : [{ type : Schema.Types.ObjectId, ref : 'posts'}],
    siteAdmin    : {
        type     : Boolean,
        required : true,
        default  : false
    }
});

module.exports = mongoose.model('users', User);
