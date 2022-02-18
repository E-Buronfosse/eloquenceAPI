// const apiRouter = require('./routes/routes').router;

const express = require("express");
const dotenv = require("dotenv").config;
const app = express();

dotenv();

const port = process.env.PORT || 3000;
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const { urlencoded } = require("express");
const globales = require("./globales");
const userCtrl = require("./controllers/userCtrl");

app.use(cors());

globales.environmentVariables();

db.initClientDbConnection();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  userCtrl.getAllUsers(req, res);
});

app.get("/users/:id", (req, res) => {
  userCtrl.getById(req, res);
});

app.post("/users/signup", (req, res) => {
  userCtrl.add(req, res);
});

app.put("/users/:id", (req, res) => {
  userCtrl.update(req, res);
});

app.delete("/users/:id", (req, res) => {
  userCtrl.delete(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
