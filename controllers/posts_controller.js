const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.createPost = async function(req, res){
    // console.log(req.body);
    try {
        req.flash('success', 'Whoo ! Post Created');
        let newPost = await Post.create({
            content : req.body.content,
            user : req.user._id,
        });

        if(req.xhr){
            return res.status(200).json({
                data : {
                    post : newPost,
                },
                message : 'Post created !',
            });
        }

        console.log("Post created successfully : ", newPost);
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