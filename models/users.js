const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userschema = new mongoose.Schema({
    avatar : {
        type : String,
    },
    email:{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true,
    },
    name :{
        type : String,
        required : true,
    }
} ,{
    timestamps : true,
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,'..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

//static

userschema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
userschema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userschema);

module.exports = User;