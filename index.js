// const apiRouter = require('./routes/routes').router;

// const express = require("express");
// const dotenv = require("dotenv").config;
// const app = express();

// dotenv();

// const port = process.env.PORT || 3000;
// const db = require("./db");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const { urlencoded } = require("express");
// const globales = require("./globales");
// const userCtrl = require("./controllers/userCtrl");

// app.use(cors());

// globales.environmentVariables();

// db.initClientDbConnection();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get("/users", (req, res) => {
//   userCtrl.getAllUsers(req, res);
// });

// app.get("/users/:id", (req, res) => {
//   userCtrl.getById(req, res);
// });

// app.post("/users/signup", (req, res) => {
//   userCtrl.add(req, res);
// });

// app.put("/users/:id", (req, res) => {
//   userCtrl.update(req, res);
// });

// app.delete("/users/:id", (req, res) => {
//   userCtrl.delete(req, res);

const express = require('express');
const dotenv = require('dotenv').config;
dotenv();
const app = express();
const port = process.env.PORT || 3000;
const db = require('./db');
const cors = require('cors');
var bodyParser = require('body-parser');
const { urlencoded } = require('express');
// require('./toolBox/auth');
// require('./globales');
const globales = require('./globales');
globales.environmentVariables();
const userCtrl = require('./controllers/userCtrl');
const auth = require('./toolBox/auth');
db.initClientDbConnection();

app.use(
    cors({
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/checkToken', (req, res) => {
    let hasValidToken = auth.checkToken(req, res);
    console.log('token envoyé : ' + req.get('authorization'));
    if (!hasValidToken) {
        return res.status(401).json({ error: 'token invalide' });
    }
    console.log('token validé');
    return res.status(200).json({ tokenValid: 'ok' });
});

app.post('/users/signup', (req, res) => {
    userCtrl.signup(req, res);
});

app.post('/users/signin', (req, res) => {
    userCtrl.signin(req, res);
});

// app.get("/users", (req, res) => {
//   userCtrl.getAllUsers(req, res);
// });

// app.get("/users/:id", (req, res) => {
//   userCtrl.getById(req, res);
// });

// app.put("/users/:id", (req, res) => {
//   userCtrl.update(req, res);
// });

// app.delete("/users/:id", (req, res) => {
//   userCtrl.delete(req, res);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
