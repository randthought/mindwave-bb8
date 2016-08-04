'use strict';

angular.module('euroPython16App')
  .directive('disconnect', function (socket) {
    return {
      templateUrl: 'app/disconnect/disconnect.html',
      restrict: 'E',
      scope: true,
      link: function (scope, element, attrs) {
      	const STATUS_DISCONNECTING = 'disconnecting'
      	scope.status = '';
      	scope.disconnect = function () {
      		if (scope.status === STATUS_DISCONNECTING) return;
      		scope.status = STATUS_DISCONNECTING;
      		socket.send('sphero.disconnect');
      	};
      }
    };
  });
