var mongoose = require('mongoose');
var Project = require('./project.js');
var Post = require('./post.js');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var SALT_WORK_FACTOR;

if (process.env.NODE_ENV === 'test') {
    SALT_WORK_FACTOR = 1;
} else {
    SALT_WORK_FACTOR = 10;
}

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

User.methods.generateHash = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            console.log(err);
            return (err);
        }
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                console.log(err);
                return (err);
            } else {
                return callback(err, hash);
            }
        });
    });
};

User.methods.comparePassword = function(password, next) {
    bcrypt.compare(password, this.password, function(err, match) {
        if (err) {
            return next(err);
        } else {
            return next(null, match);
        }
    });
};


module.exports = mongoose.model('users', User);
