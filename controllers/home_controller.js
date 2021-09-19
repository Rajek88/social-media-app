const Post = require('../models/posts');

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

    Post.find({}).populate('user').exec(function(err, allPosts){
            if(err){
            console.log('Error fetching posts');
            return;
        }

        return res.render('home', {
            title : 'home',
            posts : allPosts,
        });
    })
}