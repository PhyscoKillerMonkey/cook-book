"use strict";
var express = require("express");
var path = require("path");
// Creates and configures an ExpressJS web server.
var Server = (function () {
    // Create the express instance and run configuration methods
    function Server() {
        this.app = express();
        this.config();
        this.setRoutes();
    }
    Server.bootstrap = function () {
        return new Server();
    };
    // Perform some config
    Server.prototype.config = function () {
        // Add static paths
        this.app.use(express.static(path.join(__dirname, "..", "public")));
        // Configure pug
        this.app.set("views", path.join(__dirname, "..", "views"));
        this.app.set("view engine", "pug");
    };
    // Assign routes
    Server.prototype.setRoutes = function () {
        this.app.get("/", this.homePage);
    };
    Server.prototype.homePage = function (req, res) {
        res.render("recipe", { title: "Homepage", message: "Hello world!" });
    };
    return Server;
}());
exports.Server = Server;
