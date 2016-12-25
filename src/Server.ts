import * as express from "express";
import * as path from "path";

const recipes = require(path.join(__dirname, "recipes.json"));

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
  }

  // Assign routes
  private setRoutes() {
    this.app.get("/", this.homePage);
    this.app.get("/r", this.recipePage);
  }

  private homePage(req: express.Request, res: express.Response) {
    res.render("homepage", {"recipes": recipes});
  }

  private recipePage(req: express.Request, res: express.Response) {
    res.render("recipe", {"recipe": recipes[0]});
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