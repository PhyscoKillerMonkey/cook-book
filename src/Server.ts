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

const recipesURL = path.join(__dirname, "recipes.json");

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
    this.app.get("/r", this.recipePage);
    this.app.get("/add", this.addPage);
    this.app.post("/add", upload.single("image"), this.addPost);
    this.app.get("/test", this.testPage);
    this.app.post("/test", upload.single("image"), this.testPost);
  }

  private homePage(req: express.Request, res: express.Response) {
    res.render("homepage", {"recipes": require(recipesURL)});
  }

  private recipePage(req: express.Request, res: express.Response) {
    res.render("recipe", {"recipe": require(recipesURL)[0]});
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
      output["ingredients"].push({ "ingredient": b.ingredient, "amount": b.amount });
    } else {
      for (let i in b.ingredient) {
        output["ingredients"].push({ "ingredient": b.ingredient[i], "amount": b.amount[i] });
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
    function(err: NodeJS.ErrnoException) {
      console.log("Error", err);
    });

    // Redirect to the same page for now (should be homepage)
    res.redirect("./add");
  }

  private testPage(req: express.Request, res: express.Response) {
    res.render("test");
  }

  private testPost(req: express.Request, res: express.Response) {
    console.log(req.body);
    console.log(req.file);
    res.redirect("./test");
  }
}

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