const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/social_media_development");

const db = mongoose.connection;

db.on('error' , console.error.bind(console , "Error while connecting to database"));

db.once('open' , function(){
    console.log("Server connected to :: MongoDb ");
})

module.exports = db;