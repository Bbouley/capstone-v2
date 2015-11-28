var mongoose = require('mongoose');
var Project = require('./project.js');
var Comment = require('./comment.js');
var Schema = mongoose.Schema;

var User = new Schema ({
    userName : {
        type     : String,
        required : true,
        index    : {unique : true}
    }
    email : {
        type     : String,
        required : true,
        index    : {unique : true}
    }
    adminOf      : [{ type : Schema.Types.ObjectId, ref : 'projects'}],
    memberOf     : [{ type : Schema.Types.ObjectId, ref : 'projects'}],
    commentsMade : [{ type : Schema.Types.ObjectId, ref : 'comments'}]
    siteAdmin    : {
        type     : Boolean,
        required : true,
        default  : false
    }
});

module.exports = mongoose.model('users', User);
