const mongoose = require('mongoose');

//connect to the db
mongoose.connect('mongodb://localhost/social_media_dev_db');

//access the db
const db = mongoose.connection;

db.on('err', console.error.bind(console, "Error connectting to database"));
db.once('open', function(){
    console.log("Succesfully connected to database :: MongoDB")
});

module.exports = db;