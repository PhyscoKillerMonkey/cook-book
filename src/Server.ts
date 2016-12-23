import * as express from "express";
import * as path from "path";

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
  }

  private homePage(req: express.Request, res: express.Response) {
   res.render("recipe", { title: "Homepage", message: "Hello world!" });
  }
}