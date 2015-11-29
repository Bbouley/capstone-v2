var mongoose = require('mongoose');
var User = require('./user.js');
var Post = require('./post.js');
var Schema = mongoose.Schema;

var Project = new Schema ({
    admin   : [{ type : Schema.Types.ObjectId, ref : 'users' }],
    members : [{ type : Schema.Types.ObjectId, ref : 'users' }],
    title : {
        type     : String,
        required : true,
        index    : { unique : true }
    },
    description : String,
    comments    : [{ type : Schema.Types.ObjectId, ref : 'post' }],
    category    : String,
    uploads     : [Schema.Types.Mixed]
});

module.exports = mongoose.model('projects', Project);
