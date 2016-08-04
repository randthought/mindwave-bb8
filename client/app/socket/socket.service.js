'use strict';
(function() {

	class socketService {
		ws = null

		constructor ($rootScope) {
			this.$rootScope = $rootScope;
			this.connect();
		}

		connect () {
			this.ws = new WebSocket('ws://localhost:9001');
			this.ws.onmessage = this.message.bind(this);
		}

		message (event) {
			console.info("Message from user", event.data);
			this.$rootScope.$broadcast(event.data);
		}

		send (message) {
			console.log("socket", message)
			this.ws.send(message);
		}
	}

	angular.module('euroPython16App')
	  .service('socket', socketService);

})();
