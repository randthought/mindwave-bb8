'use strict';

(function() {
	const STATUS_CONNECTING = 'connecting'
	const STATUS_CALIBRATING = 'calibrating';

	class CalibrateController {
		status = ''

		constructor ($scope, $timeout, socket) {
			this.$scope = $scope;
			this.$timeout = $timeout;
			this.socket = socket;
		}

		$onInit () {
			this.$scope.$on('calibrate.started', function() {
				this.apply(()=> this.status = STATUS_CALIBRATING)
			}.bind(this));

			this.$scope.$on('calibrate.finished', function() {
				this.apply(()=> this.status = '')
			}.bind(this));
		}

		apply (cb) { return this.$timeout(cb, 0) }

		calibrate () {
			this.status = STATUS_CONNECTING;
			this.socket.send('calibrate.start');
		}

		finish () {
			this.socket.send('calibrate.finish');
		}

	}

	angular.module('euroPython16App.calibrate', [])
	  .component('calibrate', {
	    templateUrl: 'app/calibrate/calibrate.html',
	    controller: CalibrateController
	});
})();
