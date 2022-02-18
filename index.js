const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
var bodyParser = require("body-parser");
const { urlencoded } = require("express");
require("./globales");
const userCtrl = require("./controllers/userCtrl");
const cookieParser = require("cookie-parser");

app.use(cors({
  credentials: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users/signin", (req, res) => {
  console.log(req);
  res.send(req.cookies);
});

app.post("/users/signup", (req, res) => {
  userCtrl.signup(req, res);
});

app.post("/users/signin", (req, res) => {
  userCtrl.signin(req, res)
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

