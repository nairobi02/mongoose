const { MongoClient } = require("mongodb");
let dbConnection;
const connectToDB = (cb) => {
  MongoClient.connect("env")
    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
};
const getDB = () => dbConnection;
module.exports = { connectToDB, getDB };
