var mongoose = require('mongoose');
var Project = require('./project.js');
var User = require('./user.js');
var Schema = mongoose.Schema;

var Post = new Schema ({
    madeBy    : { type : Schema.Types.ObjectId, ref : 'users' },
    onProject : { type : Schema.Types.ObjectId, ref : 'projects'},
    upVotes   : {type : Number, default : 0},
    content   : String,
    dateCreated : {type : Date, default : Date.now}
});

module.exports = mongoose.model('posts', Post);
