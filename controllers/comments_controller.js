const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req, res){

    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log('Error in fetching post by id :: ', err);
            return;
        }

        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id,
            }, function(err, comment){
                //handle error
                post.comments.push(comment);
                post.save();
                return res.redirect('/');
            });
        }

    })

}