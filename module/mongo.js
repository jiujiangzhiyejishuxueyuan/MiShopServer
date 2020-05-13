const mongo = {
    find(collection, option) {
        return new Promise((resolve, reject) => {
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            const whereStr = option[0] || {}
            const filterStr = option[1] || {}
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
                if (err) throw err;
                var dbo = db.db("MiShop");
                dbo.collection(collection).find(whereStr).project(filterStr).toArray((err, result) => {
                    if (err) reject(err)
                    db.close()
                    resolve(result)
                })
            })
        })
    },
    updateOne(collection, option) {
        return new Promise((resolve, reject) => {
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
                if (err) throw err;
                var dbo = db.db("MiShop");
                dbo.collection(collection).updateOne(option[0],option[1],(err, result) => {
                    if (err) reject(err)
                    db.close()
                    resolve(result)
                })
            })
        })
    },
    updateMany(collection, option) {
        return new Promise((resolve, reject) => {
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
                if (err) throw err;
                var dbo = db.db("MiShop");
                dbo.collection(collection).updateMany(option[0],option[1],(err, result) => {
                    if (err) reject(err)
                    db.close()
                    resolve(result)
                })
            })
        })
    },
    insertMany(collection, arr) {
        return new Promise((resolve, reject) => {
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
                if (err) throw err;
                var dbo = db.db("MiShop");
                dbo.collection(collection).insertMany(arr, function (err, res) {
                    if (err) reject(err);
                    db.close();
                    resolve(res.insertedId)
                });
            });
        })
    },
    insertOne(collection, obj) {
        return new Promise((resolve, reject) => {
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
                if (err) throw err;
                var dbo = db.db("MiShop");
                dbo.collection(collection).insertOne(obj, function (err, res) {
                    if (err) reject(err);
                    db.close();
                    resolve(res.insertedId)
                });
            });
        })
    },
    deleteOne(collection, obj) {
        return new Promise((resolve, reject) => {
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
                if (err) throw err;
                var dbo = db.db("MiShop");
                dbo.collection(collection).deleteOne(obj, function (err, res) {
                    if (err) reject(err);
                    db.close();
                    resolve(res)
                });
            });
        })
    },
    deleteMany(collection, obj) {
        return new Promise((resolve, reject) => {
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb://localhost:27017/";
            MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
                if (err) throw err;
                var dbo = db.db("MiShop");
                dbo.collection(collection).deleteMany(obj, function (err, res) {
                    if (err) reject(err);
                    db.close();
                    resolve(res)
                });
            });
        })
    },
}
module.exports = mongo
