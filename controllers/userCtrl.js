const userModel = require("../models/userModel").userModel;
const bcrypt = require('bcrypt');
const saltRounds = 8;


module.exports = {
    add: async function (req, res, next) {
        const { email, password, confirmPassword } = req.body;
      
        let user = await userModel.findOne({ email: email });
      
        try {
          if (!email || !password) {
            return res.status(400).json("email and password should not be empty");
          }
      
          if (user) {
            return res.status(409).json("user aready exists");
          }
          if (confirmPassword !== password) {
            return res.status(409).json("confirm password is not identical");
          }
      
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPass = bcrypt.hashSync(req.body.password, salt);
      
          await userModel.create({
            email,
            hashedPass
          });
          return res.status(201).json({ email: user.email });
        } catch (error) {
          console.log(error);
          return res.status(501).json(error);
        }
      },
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
}

// exports.getAllUsers = async (req, res, next) => {
//   const user = await userModel.find();
//   console.log("toto");
//   try {
//     if (!user) {
//       return res.status(404).json("users_not_found");
//     }
//     console.log("yooo");
//     return res.status(200).json({ email: user.email });
//   } catch (error) {
//     return res.status(501).json(error);
//   }
// };

// exports.getById = async (req, res, next) => {
//   const { id } = req.params;
//   console.log(id);
//   const user = await userModel.findOne({ id: id });
//   console.log(user);

//   try {
//     if (!user) {
//       return res.status(404).json("user_not_found");
//     }
//     return res.status(200).json({ email: user.email });
//   } catch (error) {
//     return res.status(501).json(error);
//   }
// };

// exports.update = async (req, res, next) => {
//   const { id } = req.params;
//   const { email, password } = req.body;

//   try {
//     const user = await userModel.findOne({ id: id });

//     if (!user) {
//       return res.status(404).json("user not found");
//     }
//     await userModel.updateOne({ email, password });
//     return res.status(200).json({ email: user.email });
//   } catch (error) {
//     console.log("error", error);
//     return res.status(501).json(error);
//   }
// };

// exports.delete = async (req, res, next) => {
//   const { id } = req.params;
//   const user = await userModel.findOne({ id: id });
//   try {
//     if (!user) {
//       return res.status(404).json("user not found");
//     }
//     await userModel.deleteOne(user);
//     return res.status(200).json("user deleted");
//   } catch (error) {
//     res.status(501).json(error);
//   }





// const { MongoClient } = require('mongodb');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const saltRounds = 8;

// module.exports = {
//     signup: function (req, res) {
//         const email = req.body.email;
//         const password = req.body.password;
//         const confirmPassword = req.body.confirmPassword;

//         if (email == '' || password == '' || confirmPassword == '') {
//             return res.status(400).json({ error: 'Missingparameters' });
//         }

//         MongoClient.connect(uriDatabase, function (err, db) {
//             let dbo = db.db('eloquence');
//             const salt = bcrypt.genSaltSync(saltRounds);
//             const hashedPass = bcrypt.hashSync(req.body.password, salt);
//             let myobj = { email: req.body.email, password: hashedPass };
//             dbo.collection('users').insertOne(myobj, function (err, resInsert) {
//                 if (err) throw err;
//                 console.log('1 document inserted');
//                 db.close();
//                 return res.status(200);
//             });
//         });
//     },
//     signin: async function (req, res) {
//         const email = req.body.email;
//         const password = req.body.password;

//         if (email == '' || password == '') {
//             return res.status(400).json({ error: 'Missingparameters' });
//         }

//         MongoClient.connect(uriDatabase, async function (err, db) {
//             let dbo = db.db('eloquence');
//             let myobj = { email: req.body.email };
//             let user = await dbo.collection('users').findOne(myobj);
//             if (user == null) {
//                 return res.status(401).json({ error: 'User incorrect' });
//             }
//             const compare = await bcrypt.compare(
//                 req.body.password,
//                 user.password
//             );
//             if (!compare) {
//                 return res.status(401).json({ error: 'Password incorrect' });
//             }
//             let token = jwt.sign({ userId: user._id }, privateKey, {
//                 expiresIn: '24h',
//             });
//             console.log(token);
//             res.json({ auth: 'ok', token: token });
//             res.send();
//         });
//     },

