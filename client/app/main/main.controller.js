'use strict';

(function() {

  class MainController {
    state = 'connect'

    constructor($http, $scope) {
      this.$http = $http;
      this.$scope = $scope;
    }

    $onInit() {
      this.$scope.$on('sphero.connected', function() {
        this.state = 'calibrate'
      }.bind(this));
      
      this.$scope.$on('sphero.disconnected', function() {
        this.state = 'connect'
      }.bind(this));
    }
  }

  angular.module('euroPython16App')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
