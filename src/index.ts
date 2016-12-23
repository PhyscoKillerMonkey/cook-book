import * as http from "http";
import * as debug from "debug";

import {App} from "./App";

debug("ts-express:server");

// Get a port from the environment or use default
const port = normalizePort(process.env.PORT || 8080);

// Create the server, passing in the port
const app = new App(port); 

function normalizePort(val: number|string): number|string|boolean {
  let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}