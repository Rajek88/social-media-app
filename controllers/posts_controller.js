const { request } = require('express');
const Post = require('../models/posts');
const Comment = require('../models/comments');

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

module.exports.destroy = function(req, res){

    Post.findById(req.params.id, function(err, post){

        // .id means it is converting the _id into string 
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({ post : req.params.id }, function(err){
                if(err){
                    console.log('Error deleting post : ', err );
                    return;
                }
            });
            console.log('Post deleted successfully : ', post);
            return res.redirect('back'); 
        }
        else{
            return res.redirect('back'); 
        }
    })
}