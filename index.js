const express = require("express");
const path = require("path");
require("dotenv").config();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const db = require("./config/db/index");
const route = require("./resource/routes/index.route");

//Connection DB
db.connect();

// Static files
app.use("/", express.static(path.join(__dirname, "public")));

// Template engine
app.set("views", "./resource/views");
app.set("view engine", "pug");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Override method
app.use(methodOverride("_method"));

// Route app
route(app);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
