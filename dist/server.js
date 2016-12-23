"use strict";
var App_1 = require("./App");
// Get a port from the environment or use default
var port = normalizePort(process.env.PORT || 1337);
// Create the server, passing in the port
var app = new App_1.App(port);
function normalizePort(val) {
    var port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
