const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
var bodyParser = require('body-parser');
const { urlencoded } = require('express');
require('./toolBox/auth');
require('./globales');
const userCtrl = require('./controllers/userCtrl');
const auth = require('./toolBox/auth');

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
