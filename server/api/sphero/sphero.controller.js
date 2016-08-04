/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/sphero              ->  index
 */

'use strict';

import SpheroSocket from '../../SpheroSocket/SpheroSocket';

// Gets a list of Spheros
export function index(req, res) {
	let socket = new SpheroSocket();
	res.json({
		connected: socket.spheroConnected
	});
}
