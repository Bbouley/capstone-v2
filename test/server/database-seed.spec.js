process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../../src/server/models/user.js');
var Post = require('../../src/server/models/post.js');
var Project = require('../../src/server/models/project.js');
var helper = require('./test-helpers.js');

var should = chai.should();
chai.use(chaiHttp);

var should = chai.should();

describe('Test Helper functions', function() {

    beforeEach(function(done) {
        helper.dropAll();
        helper.seedDB();
        done();
    });

    afterEach(function(done) {
        helper.dropAll();
        done();
    });

    it('should seed users collection', function(done) {
        chai.request(server)
        .get('/api/users')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.equal(3);
            done();
        });
    });

    it('should seed projects collection', function(done) {
        chai.request(server)
        .get('/api/projects')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.equal(2);
            done();
        });
    });

});
