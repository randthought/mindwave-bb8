'use strict';

var app = require('../..');
import request from 'supertest';

describe('Sphero API:', function() {

  describe('GET /api/sphero', function() {
    var spheros;

    beforeEach(function(done) {
      request(app)
        .get('/api/sphero')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          spheros = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      spheros.should.be.instanceOf(Array);
    });

  });

});
