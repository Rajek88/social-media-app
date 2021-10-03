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


module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log('Error in finding comment : ', err);
            return;
        }


        console.log('Current user Id : ', req.user.id);


        let postIdforOwner = comment.post;
        console.log('Post Id : ',postIdforOwner);
        let postOwner;

        Post.findById(postIdforOwner, function(err, post){
            if(err){
                return;
            }
            postOwner = post.user;
            console.log('Post owner : ',postOwner);
        });

        console.log('Commenter Id : ', comment.user);

        //the comment should be deleted by both the post owner and commenter
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            console.log('Removing the comment by commenter..')
            //$pull is built in function to pull out things from db
            Post.findByIdAndUpdate(postId,{ $pull : {comments : req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }
        else{
            console.log('Failed :: Removing the comment by commenter..')
            return res.redirect('back');
        }
    });
}
module.exports.postownerDestroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log('Error in finding comment : ', err);
            return;
        }


        console.log('Current user Id : ', req.user.id);


        let postIdforOwner = comment.post;
        console.log('Post Id : ',postIdforOwner);

        Post.findById(postIdforOwner, function(err, post){
            if(err){
                return;
            }
            let postOwner = post.user;
            console.log('Post owner : ',postOwner);
            //the comment should be deleted by both the post owner and commenter
            if(postOwner == req.user.id){
                let postId = comment.post;
                comment.remove();
                console.log('Removing the comment by post owner..')
                //$pull is built in function to pull out things from db
                Post.findByIdAndUpdate(postId,{ $pull : {comments : req.params.id}}, function(err, post){
                    return res.redirect('back');
                })
            }
            else{
                console.log('Failed :: Removing the comment by owner..')
                return res.redirect('back');
            }
        });

        console.log('Commenter Id : ', comment.user);
    });
}