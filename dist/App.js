"use strict";
var express = require('express');
// Creates and configures an ExpressJS web server.
var App = (function () {
    // Create the express instance and run configuration methods
    function App(port) {
        this.express = express();
        this.setRoutes();
        this.startServer(port);
    }
    // Assign routes to functions
    App.prototype.setRoutes = function () {
        this.express.get("/", this.renderHelloWorld);
    };
    // Set a port and start the server
    App.prototype.startServer = function (port) {
        this.express.listen(port, function () {
            console.log("Listening on port " + port);
        });
    };
    App.prototype.renderHelloWorld = function (req, res) {
        res.send("Hello there world!");
    };
    return App;
}());
exports.App = App;
