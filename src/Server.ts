import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as multer from "multer";
import * as fs from "fs";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, "..", "public", "images", "uploads"));
  },
  filename: function(req, file, cb) {
    cb(null, "image-" + Date.now());
  }
})
const upload = multer({ storage: storage });

// Create the recipes DB if it does not exist
const recipesURL = path.join(__dirname, "recipes.json");
try {
  require(recipesURL);
} catch (error) {
  console.log("Cannot find the recipes DB at: ", recipesURL);
  console.log("Creating new file...");
  fs.writeFile(recipesURL, "[]", function(error: NodeJS.ErrnoException) {
    if (error) {
      console.log("Write error: " + error.message);
    } else {
      console.log("Successfully created " + recipesURL);
    }
  });
}

// Creates and configures an ExpressJS web server.
export class Server {

  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  // Create the express instance and run configuration methods
  constructor() {
    this.app = express();
    this.config();
    this.setRoutes();
  }

  // Perform some config
  private config() {
    // Add static paths
    this.app.use(express.static(path.join(__dirname, "..", "public")));

    // Configure pug
    this.app.set("views", path.join(__dirname, "..", "views"));
    this.app.set("view engine", "pug");

    // Configure the body-parser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
  }

  // Assign routes
  private setRoutes() {
    this.app.get("/", this.homePage);
    this.app.get("/recipe/:title", this.recipePage);
    this.app.get("/add", this.addPage);
    this.app.post("/add", upload.single("image"), this.addPost);
  }

  private homePage(req: express.Request, res: express.Response) {
    res.render("homepage", { "recipes": require(recipesURL) });
  }

  private recipePage(req: express.Request, res: express.Response) {
    let result = false;
    for (let r of require(recipesURL)) {
      if (r.title == req.params.title) {
        res.render("recipe", { "recipe": r });
        result = true;
      }
    }
    if (!result) {
      res.sendStatus(404);
    }
  }

  private addPage(req: express.Request, res: express.Response) {
    res.render("add");
  }

  private addPost(req: express.Request, res: express.Response) {
    console.log(req.body);
    console.log(req.file);
    let b = req.body;
    
    let output = {};

    for (let a of ["title", "author", "description"]) {
      output[a] = b[a];
    }
    
    output["time"] = b.hours * 60 + parseInt(b.minutes);
    
    output["ingredients"] = [];
    if (typeof b.ingredient === "string") {
      output["ingredients"].push({ "name": b.ingredient, "amount": b.amount });
    } else {
      for (let i in b.ingredient) {
        output["ingredients"].push({ "name": b.ingredient[i], "amount": b.amount[i] });
      }
    }

    if (typeof b.step === "string") {
      output["method"] = [b.step];
    } else {
      output["method"] = b["step"];
    }

    output["imageURL"] = "images/uploads/" + req.file.filename;
    output["link"] = "recipe/" + encodeURI(b.title);

    console.log(output);

    let recipes = require(recipesURL);
    recipes.push(output);
    console.log(recipes);
    
    // Update the database
    fs.writeFile(recipesURL, JSON.stringify(recipes, null, 2), "utf8", 
    function(error: NodeJS.ErrnoException) {
      if (error) {
        console.log("Write error: " + error.message);
      } else {
        console.log("Successful write to " + recipesURL);
      }
    });

    // Redirect to the homepage
    res.redirect(".");
  }
}