const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");

const createServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(routes);

  return app;
};

module.exports = createServer;
