const dbConfig = require("../../config/database.js");

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const db_mongodb = {};
db_mongodb.mongoose = mongoose;
db_mongodb.url = dbConfig.url;
db_mongodb.log = require("./log.js")(mongoose, mongoosePaginate);

module.exports = db_mongodb;