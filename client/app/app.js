'use strict';

angular.module('euroPython16App', ['euroPython16App.constants', 'ngCookies', 'ngResource',
    'ngSanitize', 'ngRoute', 'ui.bootstrap', 'euroPython16App.connect', 'euroPython16App.calibrate'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  });
