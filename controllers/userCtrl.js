const { MongoClient } = require("mongodb");
const DB = require('../db');
let database;

// (async function() {
// 	await DB.setUp(uriDatabase).then((db)=>{
//         database = db;
//     })
// })();



module.exports = {
    signup: function(req, res) {
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        // if (email == "" || password == "" || confirmPassword == "") {
        //     return res.status(400).json({ 'error': 'Missingparameters'});
        // }

        // if (password != confirmPassword) {
        //     return res.status(400).json({ 'error': 'Non identical passwords'});
        // }
        
        MongoClient.connect(uriDatabase, function(err, db) {
            var dbo = db.db("eloquence");
            const myobj = { email: email, password: password }
            dbo.collection("users").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        })
    }
}