var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var passport = require('passport');
var User = require('../models/user.js');

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../client', 'index.html'));
});

module.exports = router;
