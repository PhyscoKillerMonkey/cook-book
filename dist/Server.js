"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var recipes = require(path.join(__dirname, "recipes.json"));
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
        // Configure the body-parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    };
    // Assign routes
    Server.prototype.setRoutes = function () {
        this.app.get("/", this.homePage);
        this.app.get("/r", this.recipePage);
        this.app.get("/add", this.addPage);
        this.app.post("/add", this.addPost);
    };
    Server.prototype.homePage = function (req, res) {
        res.render("homepage", { "recipes": recipes });
    };
    Server.prototype.recipePage = function (req, res) {
        res.render("recipe", { "recipe": recipes[0] });
    };
    Server.prototype.addPage = function (req, res) {
        res.render("add");
    };
    Server.prototype.addPost = function (req, res) {
        res.redirect("..");
        console.log(req.body);
    };
    return Server;
}());
exports.Server = Server;
// title: "Millie's Cookies",
//       ingredients: [
//         "125g butter, softened",
//         "100g light brown soft sugar",
//         "125g caster sugar",
//         "1 egg, lightly beaten", 
//         "1 tsp vanilla extract",
//         "225g self-raising flour",
//         "1/2 tsp salt",
//         "200g chocolate chips"
//       ],
//       method: [
//         "Preheat the oven to 180C, gas mark 4.",
//         "Cream butter and sugars, once creamed, combine in the egg and vanilla.",
//         "Sift in the flour and salt, then the chocolate chips.",
//         "Roll into walnut size balls, for a more homemake look, or roll into a long, thick sausage shape and slic to make neater lookig cookies.",
//         "Place on ungreased baking paper. If you want to have the real Millies experience then bake for just 7 minutes, till the cookies are just setting - the cookies will be really doughy and delicous. Otherwise cook for 10 minutes until just golden round the edges.",
//         "Take out of the oven and leave to harden for a minute before transferring to a wire cooling rack. There are great warm, and they also store well, if they don't all get eaten straight away!"
//       ] 
