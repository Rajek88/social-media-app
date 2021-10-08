const Post = require('../../../models/posts');
const Comment = require('../../../models/comments');

module.exports.index = async function(req, res){

    let allPosts = await Post.find({})
        .populate('user')
        //populate the coomments on each posts
        .populate({
            path : 'comments',
            populate : {
                path : 'user',
            }
    })

    return res.json(200, {
        message : 'List of posts',
        posts : allPosts,
    });
}

module.exports.destroy = async function(req, res){

    try{
        console.log('req.params.id : ', req.params.id)
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({ post : req.params.id });
            return res.status(200).json({
                message : 'post and associated comments deleted successfully by api',
            }); 
        }
        else{
            return res.status(401).json({
                message : 'Unauthorized request !',
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message : 'Internal server error :: post and associated comments delete failed by api',
        });
    }
}