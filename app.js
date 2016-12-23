"use strict";
// var App_1 = require(__dirname + "/dist/App");

// Dependencies
var server = require("./dist/Server");
var http = require("http");

// Create http server
var port = normalisePort(process.env.PORT || 1337);
var app = server.Server.bootstrap().app;
app.set("port", port);
var httpServer = http.createServer(app);

// Listen on provided ports
console.log("Listening on port " + port);
httpServer.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */
function normalisePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;

  } else if (port >= 0) {
    // port number
    return port;

  } else {
    return false;
  }
}