module.exports = {
    db: function() { 
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/eloquence";
        
        MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        console.log("Database created!");
        return db;
        }
    )}
}