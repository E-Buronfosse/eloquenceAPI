const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 8;

module.exports = {
    signup: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (email == '' || password == '' || confirmPassword == '') {
            return res.status(400).json({ error: 'Missingparameters' });
        }

        MongoClient.connect(uriDatabase, function (err, db) {
            let dbo = db.db('eloquence');
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPass = bcrypt.hashSync(req.body.password, salt);
            let myobj = { email: req.body.email, password: hashedPass };
            dbo.collection('users').insertOne(myobj, function (err, resInsert) {
                if (err) throw err;
                console.log('1 document inserted');
                db.close();
                return res.status(200);
            });
        });
    },
    signin: async function (req, res) {
        const email = req.body.email;
        const password = req.body.password;

        if (email == '' || password == '') {
            return res.status(400).json({ error: 'Missingparameters' });
        }

        MongoClient.connect(uriDatabase, async function (err, db) {
            let dbo = db.db('eloquence');
            let myobj = { email: req.body.email };
            let user = await dbo.collection('users').findOne(myobj);
            if (user == null) {
                return res.status(401).json({ error: 'User incorrect' });
            }
            const compare = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!compare) {
                return res.status(401).json({ error: 'Password incorrect' });
            }
            let token = jwt.sign({ userId: user._id }, privateKey, {
                expiresIn: '24h',
            });
            console.log(token);
            res.json({ auth: 'ok', token: token });
            res.send();
        });
    },
    // parseAuthorization : function(authorization){
    //     return(authorization != null) ? authorization.replace('Bearer ', '') : null;
    // },
    // getUserId : function(authorization){
    //     //console.log(authorization)
    //     var userId = -1;
    //     var token = module.exports.parseAuthorization(authorization);
    //      if(token != null){

    //          try {
    //              var jwtToken =jwt.verify(token, JWT_SIGN_SECRET);

    //              if(jwtToken != null)
    //              userId = jwtToken.userId;
    //          }catch (err) {
    //              console.log(err)
    //          }

    //      }

    //      return userId;
    // }
};
