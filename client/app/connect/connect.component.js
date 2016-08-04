'use strict';
(function() {
	const STATUS_ERROR = 'error';
	const STATUS_DISCONNECTED = 'disconnected'
	const STATUS_CONNECTED = 'connected';
	const STATUS_CONNECTING = 'connecting';

	class ConnectController {
		address = '';
		status = ''; // '' || 'connecting' || 'connected' || 'error'

		constructor ($scope, $http, $timeout, socket) {
			this.$scope = $scope;
			this.$http = $http;
			this.$timeout = $timeout;
			this.socket = socket;
		}

		$onInit () {
			this.$scope.$on('sphero.error', function() {
				this.apply(()=> this.status = STATUS_ERROR)
			}.bind(this));

			this.$scope.$on('sphero.disconnected', function() {
				this.apply(()=> this.status = STATUS_DISCONNECTED)
			}.bind(this));
			
			this.$scope.$on('sphero.connected', function() {
				this.apply(()=> this.status = STATUS_CONNECTED)
			}.bind(this));

			this.$http.get('api/sphero').then( (result) => {
				if (result.data.connected === true) {
					this.apply(()=> this.status = STATUS_CONNECTED)
				}
			} );
		}

		apply (cb) { return this.$timeout(cb, 0) }

		connect () {
			if (this.address.trim().length <= 0) return;
			this.status = STATUS_CONNECTING;
			this.socket.send(`sphero.connect:${this.address}`);
		};

		isFormDisabled () {
			return (
				this.status === 'connected' || this.status === 'connecting'
			);
		}
	}

	angular.module('euroPython16App.connect', [])
	  .component('connect', {
	    templateUrl: 'app/connect/connect.html',
	    controller: ConnectController
	});
})();
