const Like = require('../models/likes');
const Comment = require('../models/comments');
const Post = require('../models/posts');


module.exports.toggleLike = async function(req, res){
    console.log('Likes request :: ',req);

    //likes/toogle/?id=hvhvh&type=Post
    try {
        let liked = false;
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else if(req.query.type == 'Comment'){
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exists
        //mongoose findOne by default pluralizes the keys, i.e. if you have user in model, then you should put users in find one
        let existingLike = await Like.findOne({
            users : req.user.id,
            likeables : req.query.id,
            onModels : req.query.type,
        });

        console.log('Existing like :: ', existingLike);

        //if like already exists delete it 
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
            liked = false;
            console.log('Liked Existing like :: ', liked);

        }else{
            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.user.id,
                onModel : req.query.type,
            });
            likeable.likes.push(newLike._id);
            likeable.save();
            liked = true;
            console.log('Liked New like :: ', liked);
        }


        return res.status(200).json({
            message : 'Request successfull',
            liked : liked,
        });
        
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