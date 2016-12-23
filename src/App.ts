import * as express from "express";
import * as path from "path";

// Creates and configures an ExpressJS web server.
export class App {

  public ex: express.Application;

  // Create the express instance and run configuration methods
  constructor(port: number|string|boolean) {
    this.ex = express();
    console.log(path.join(__dirname, "..", "public"));
    console.log("Hello");
    this.ex.use(express.static(path.join(__dirname, "..", "public")));
    this.setRoutes();
    this.startServer(port);
  }

  // Assign routes
  private setRoutes() {
  }

  // Set a port and start the server
  private startServer(port: number|string|boolean) {
    this.ex.listen(port, function() {
      console.log("Listening on port " + port);
    });
  }
}