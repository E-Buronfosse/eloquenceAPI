// const apiRouter = require('./routes/routes').router;

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
var bodyParser = require("body-parser");
const { urlencoded } = require("express");
require("./globales");
const userCtrl = require("./controllers/userCtrl");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users/signup", (req, res) => {
  userCtrl.signup(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

