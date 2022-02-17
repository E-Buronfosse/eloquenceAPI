// const apiRouter = require('./routes/routes').router;

const express = require("express");
const dotenv = require("dotenv").config;
const app = express();

dotenv();

const port = process.env.PORT || 3000;
const db = require("./db");
const cors = require("cors");
const userCtrl = require("./controllers/userCtrl");
var bodyParser = require("body-parser");
const { urlencoded } = require("express");
const globales = require("./globales");

app.use(cors());

globales.environmentVariables();

db.initClientDbConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/signup", (req, res) => {
  userCtrl.getById(req, res);
});

app.post("/users/signup", (req, res) => {
  userCtrl.add(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
