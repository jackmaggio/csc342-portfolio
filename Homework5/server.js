const express = require("express");

const app = express();
const PORT = 80;

// Designate the public folder as serving static resources
app.use(express.static("static"));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
const routes = require("./src/routes");
app.use(routes);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
