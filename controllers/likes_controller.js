const Like = require('../models/likes');
const Comment = require('../models/comments');
const Post = require('../models/posts');


module.exports.toggleLike = async function(req, res){
    console.log('Likes request :: ',req);

    //likes/toogle/?id=hvhvh&type=Post
    try {
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id);
        }
        else if(req.query.type == 'Comment'){
            likeable = await Comment.findById(req.query.id);
        }

        console.log('Likeables v2 :: ', likeable);

        //check if like already exists
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel : req.query.type,
            user : req.user._id,

        });

        console.log('Existing like :: ', existingLike);

        //if like already exists delete it 
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
            console.log('Liked Existing like ');

        }else{
            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type,
            });

            likeable.likes.push(newLike._id);
            likeable.save();
            console.log('Liked New like ');
        }


        // return res.status(200).json({
        //     message : 'Request successfull',
        //     liked : liked,
        // });
        return res.redirect('/');
        
    } catch (error) {
        console.log('ToggleLike error :: ', error);
        return res.status(500).json({
            message : 'Internal Server Error',
            data : {
                deleted : deleted,
            }
        });
    }
}


