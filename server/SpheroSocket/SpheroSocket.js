 /**
 * Sphero WebSocket communications
 */

'use strict';

import ws from 'ws';
import _ from 'lodash';
import sphero from 'sphero';

let instance = null;

export default class SpheroSocket {
	orb = null
	spheroConnected = false;

	constructor () {
		if (!instance) {
			instance = this;
		}

		return instance;
	}

	connect (port) {
		let wss = new ws.Server({ port: port });
			wss.on('connection', this.connection.bind(this));
	}

	connection (socket) {
		socket.on('message', _.partial(this.message, socket).bind(this));
	}

	validMessage (msg, key) {
		return msg.indexOf(key) === 0;
	}

	message (socket, msg) {
		if ( this.validMessage(msg, 'sphero.connect') ) {
			return this.spheroConnect(socket, msg);
		}
		if ( this.validMessage(msg, 'sphero.disconnect') ) {
			return this.spheroDisconnect(socket);
		}
		if ( this.validMessage(msg, 'calibrate.start') ) {
			return this.calibrateStart(socket);
		}
		if ( this.validMessage(msg, 'calibrate.finish') ) {
			return this.calibrateFinish(socket);
		}
		if ( this.validMessage(msg, 'mindwave') ) {
			return this.mindWave(socket, msg);
		}
	}

	spheroConnect (socket, message) {
		let id = message.split(':')[1];
		this.spheroConnected = false;
		this.orb = sphero(id, {timeout: 15000});

		this.orb.connect(function () {
			this.orb.ping(function (err, data) {
				this.spheroConnected = !!err;
				socket.send('sphero.connected');
			}.bind(this))
		}.bind(this));

		setTimeout(function () {
			if (!this.spheroConnected) {
				socket.send('sphero.error');
			}
		}, 15000)
	}

	spheroDisconnect (socket) {
		this.spheroConnected = false;
		this.orb.disconnect(function () {
			socket.send("sphero.disconnected");
		}.bind(this));
	}

	calibrateStart (socket) {
		this.orb.startCalibration( function (err, data) {
			socket.send("calibrate.started");
		}.bind(this));
	}

	calibrateFinish (socket) {
		this.orb.finishCalibration( function (err, data) {
			socket.send("calibrate.finished");

			this.orb.roll(50, 0)
		}.bind(this));
	}

	mindWave (socket, msg) {
		let speeds = msg.split(':');
		console.log("levels are", speeds[1], speeds[2])
	}
}
