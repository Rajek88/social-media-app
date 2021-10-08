const Comment = require('../models/comments');
const Post = require('../models/posts');
const commentsMailer = require('../mailers/comments_mailer');

module.exports.create = async function(req, res){

    try {
        let post = await Post.findById(req.body.post);

        if(post){
            let comment = await Comment.create({
                content : req.body.content,
                post : req.body.post,
                user : req.user._id,
            });

            post.comments.push(comment);
            req.flash('success', 'Aha ! You just commented..');
            post.save();
            comment1 = await comment.populate('user', 'name email');
            console.log('This comment is sent to nodemailer :: ', comment1);
            commentsMailer.newComment(comment1, post);
            


            if(req.xhr){
                return res.status(200).json({ 
                    data : {
                        comment : comment,
                    },
                    message : 'Comment created !',
                });
            }

            return res.redirect('back');
        }

    } catch (error) {
        req.flash('error', 'Oops ! Your comment was blown away by wind.');
        console.log('Error in creating comment : ', error);
        return;
    }

}


module.exports.destroy = async function(req, res){
    try {
        let comment = await Comment.findById(req.params.id);

        console.log('Current user Id : ', req.user.id);


        //the comment should be deleted by both the post owner and commenter
        if(comment.user == req.user.id){
            let postId = comment.post;
            req.flash('info', 'Hmmm ! Uncommented');
            comment.remove();
            console.log('Removing the comment by commenter..')
            //$pull is built in function to pull out things from db
            Post.findByIdAndUpdate(postId,{ $pull : {comments : req.params.id}}, function(err, post){
                return res.redirect('back');
            })

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id,
                    },
                    message : 'Comment deleted !',
                });
            }
        }
        else{
            req.flash('error', 'Oops ! Try deleting your comment again.');
            console.log('Failed :: Removing the comment by commenter..')
            return res.redirect('back');
        }
    } catch (error) {
        console.log('Error deleting comment : ', error);
        return;
    }
}
module.exports.postownerDestroy = async function(req, res){
    try {
        let comment = await Comment.findById(req.params.id);
        console.log('Current user Id : ', req.user.id);
        let postIdforOwner = comment.post;
        console.log('Post Id : ',postIdforOwner);

        let post = await Post.findById(postIdforOwner);
        let postOwner = post.user;
        console.log('Post owner : ',postOwner);
        //the comment should be deleted by both the post owner and commenter
        if(postOwner == req.user.id){
            let postId = comment.post;
            comment.remove();
            req.flash('success', 'As the post owner, You deleted that comment !')
            console.log('Removing the comment by post owner..')
            //$pull is built in function to pull out things from db
            Post.findByIdAndUpdate(postId,{ $pull : {comments : req.params.id}}, function(err, post){
                return res.redirect('back');
            });
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment_id : req.params.id,
                    },
                    message : 'Comment deleted !',
                });
            }
        }
        else{
            console.log('Failed :: Removing the comment by owner..')
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', 'Try deleting that comment again.')
        console.log('Error deleting comment by post owner : ', error);
        return;
    }
}