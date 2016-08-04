'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor($location) {
    this.$location = $location;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

angular.module('euroPython16App')
  .controller('NavbarController', NavbarController);
