const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/likes');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const POST_PHOTO_PATH = path.join('/uploads/posts/post_photos');

module.exports.createPost = async function(req, res){
    
    // console.log('body-content',req.body.content);

    //get body content in postContent, if the file is being uploaded then postContent will be updated in storage
    //else no need to update
    let postContent = req.body.content;
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            //update the postContent
            postContent = req.body.content;
            // console.log('Content :::::::::::::::: ', postContent);

            cb(null, path.join(__dirname,'..', POST_PHOTO_PATH));
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    });



    let uploadedPostPhoto = multer({ storage: storage }).single('postPhoto');
    let postPhotoPath = POST_PHOTO_PATH;

    try {
        //create new post with available data
        //the content can be initially null in case of file upload, so updated the same as required false in model
        req.flash('success', 'Whoo ! Post Created');
        let newPost = await Post.create({
            user : req.user._id,
            content : postContent,
        });

        // console.log('success', postContent);


        // console.log(newPost.id);

        //if we have image uploaded also , update the post with the image also

        uploadedPostPhoto(req, res, function(err){
            if(err){
                console.log('*** Multer Error : ', err);
                return;
            }
            if(req.file){

                if(newPost.postPhoto){
                    try {
                        fs.unlinkSync(path.join(__dirname,'..', newPost.postPhoto));
                    } catch (error) {
                        console.log('Error in unlinksyncing image : ', error);
                    }
                }
                //saving path of uploaded file in avatar field of user database
                newPost.postPhoto = req.file.filename;
                newPost.content = postContent;

            }

            newPost.save();

            // console.log(req.file);
        })



        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : newPost,
                },
                message : 'Post created !',
            });
        }

        console.log("Post created successfully : ",  newPost);
        // return;
        return res.redirect('back');
    } catch (error) {
        console.log('Error creating Post : ', error);
        return;
    }
}



//implementing async await
module.exports.destroy = async function(req, res){

    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){

        //delete the photo when u delete post
        let postPhoto = post.postPhoto;
        console.log('photo path', postPhoto);
        try {
            fs.unlinkSync(path.join(__dirname,'..', POST_PHOTO_PATH + '/' + postPhoto));
            console.log('Photo deleted successfully');
        } catch (error) {
            console.log('Error in unlinksyncing image : ', error);
        }

        //delete a post anf its comment's likes too
        await Like.deleteMany({ likeable : post , onModel : 'Post'});
        await Like.deleteMany({_id : {$in : post.comments}})

        //now delete post and all its associated
        post.remove();
        await Comment.deleteMany({ post : req.params.id });
        req.flash('info', 'Hmmm ! Post Deleted');
        console.log('Post deleted successfully : ', post);
        return res.redirect('back'); 
    }
    else{
        return res.redirect('back'); 
    }
}

// module.exports.destroy = function(req, res){

//     Post.findById(req.params.id, function(err, post){

//         // .id means it is converting the _id into string 
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({ post : req.params.id }, function(err){
//                 if(err){
//                     console.log('Error deleting post : ', err );
//                     return;
//                 }
//             });
//             console.log('Post deleted successfully : ', post);
//             return res.redirect('back'); 
//         }
//         else{
//             return res.redirect('back'); 
//         }
//     })
// }