const Post = require('../models/posts');

module.exports.createPost = function(req, res){
    Post.create({
        content : req.body.content,
        user : req.user._id,
    }, function(err, newPost){
        if(err){
            console.log('Error creating post : ', err);
            return;
        }

        console.log("Post created successfully : ", newPost);
        // return;
        return res.redirect('back');
    })
}