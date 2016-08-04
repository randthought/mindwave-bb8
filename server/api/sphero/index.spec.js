'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var spheroCtrlStub = {
  index: 'spheroCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var spheroIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sphero.controller': spheroCtrlStub
});

describe('Sphero API Router:', function() {

  it('should return an express router instance', function() {
    spheroIndex.should.equal(routerStub);
  });

  describe('GET /api/sphero', function() {

    it('should route to sphero.controller.index', function() {
      routerStub.get
        .withArgs('/', 'spheroCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
