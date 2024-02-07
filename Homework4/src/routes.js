const express = require("express");
const routes = express.Router();

const frontendRouter = require("./frontend/FrontendRoutes");
const apiRouter = require("./api/ApiRoutes");

routes.use(frontendRouter);
routes.use("/api", apiRouter);

module.exports = routes;
