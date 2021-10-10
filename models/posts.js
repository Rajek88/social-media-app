const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const POST_PHOTO_PATH = path.join('/uploads/posts/post_photos');

const postSchema = new mongoose.Schema({
    postPhoto :{
        type : String,
        required : false,
    },
    content : {
        type : String,
        required : false,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    // include the array of ids of comments in post schema itself
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment',
        }
    ],
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Like'
        }
    ]
},{
    timestamps : true,
});


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname,'..', POST_PHOTO_PATH));
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// });

//static

// postSchema.statics.uploadedPostPhoto = multer({ storage: storage }).single('postPhoto');
// postSchema.statics.postPhotoPath = POST_PHOTO_PATH; 


const Post = mongoose.model('Post', postSchema);
module.exports = Post;