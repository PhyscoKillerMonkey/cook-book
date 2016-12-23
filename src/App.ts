import * as express from 'express';

// Creates and configures an ExpressJS web server.
export class App {

  public express: express.Application;

  // Create the express instance and run configuration methods
  constructor(port: number|string|boolean) {
    this.express = express();
    this.setRoutes();
    this.startServer(port);
  }

  // Assign routes to functions
  private setRoutes() {
    this.express.get("/", this.renderHelloWorld);
  }

  // Set a port and start the server
  private startServer(port: number|string|boolean) {
    this.express.listen(port, function() {
      console.log("Listening on port " + port);
    });
  }

  private renderHelloWorld(req: express.Request, res: express.Response) {
    res.send("Hello World!");
  }
}