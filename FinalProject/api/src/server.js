const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

const routes = require("./routes/routes");
app.set("base", "/api");
app.use("/", routes);

// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
