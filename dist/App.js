"use strict";
var express = require("express");
var path = require("path");
// Creates and configures an ExpressJS web server.
var App = (function () {
    // Create the express instance and run configuration methods
    function App(port) {
        this.ex = express();
        console.log(path.join(__dirname, "..", "public"));
        console.log("Hello");
        this.ex.use(express.static(path.join(__dirname, "..", "public")));
        this.setRoutes();
        this.startServer(port);
    }
    // Assign routes
    App.prototype.setRoutes = function () {
    };
    // Set a port and start the server
    App.prototype.startServer = function (port) {
        this.ex.listen(port, function () {
            console.log("Listening on port " + port);
        });
    };
    return App;
}());
exports.App = App;
