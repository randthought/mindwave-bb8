/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';
import SpheroSocket from './SpheroSocket/SpheroSocket';




// Setup server
var app = express();
var server = http.createServer(app);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

// Start socket
function startSocket() {
	let socket = new SpheroSocket();
		socket.connect(config.socket.port);
}

setImmediate(startServer);
setImmediate(startSocket);

// Expose app
exports = module.exports = app;
