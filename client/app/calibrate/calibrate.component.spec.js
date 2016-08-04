'use strict';

describe('Component: calibrate', function () {

  // load the component's module
  beforeEach(module('euroPython16App.calibrate'));

  var calibrateComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    calibrateComponent = $componentController('calibrate', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
