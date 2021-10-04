const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = function(req, res){


    // Post.find({}, function(err, allPosts){
    //     if(err){
    //         console.log('Error fetching posts');
    //         return;
    //     }

    //     return res.render('home', {
    //         title : 'home',
    //         posts : allPosts,
    //     })
    // });

    //populate the user of each post

    Post.find({})
    .populate('user')
    //populate the coomments on each posts
    .populate({
        path : 'comments',
        populate : {
            path : 'user',
        }
    })
    .exec(function(err, allPosts){

        User.find({}, function(err, users){
            if(err){
                console.log('Error fetching posts');
                return;
            }
    
            return res.render('home', {
                title : 'home',
                posts : allPosts,
                all_users : users,
            });
        });
    })
}