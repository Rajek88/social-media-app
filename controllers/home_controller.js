const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = async function(req, res){

    //populate the user of each post

    //for error handling use try catch
    try {
        //await 1
        let allPosts = await Post.find({})
        .populate('user')
        //populate the coomments on each posts
        .populate({
            path : 'comments',
            populate : {
                path : 'user',
            },
        });

        //await 2
        let users = await User.find({});

        //finally return this
        return res.render('home', {
            title : 'Home',
            posts : allPosts,
            all_users : users,
        });
    } catch (error) {
        console.log('Error while populating Home : ', error);
        return;
    }
}

// module.exports.home = function(req, res){


//     // Post.find({}, function(err, allPosts){
//     //     if(err){
//     //         console.log('Error fetching posts');
//     //         return;
//     //     }

//     //     return res.render('home', {
//     //         title : 'home',
//     //         posts : allPosts,
//     //     })
//     // });

//     //populate the user of each post

//     Post.find({})
//     .populate('user')
//     //populate the coomments on each posts
//     .populate({
//         path : 'comments',
//         populate : {
//             path : 'user',
//         }
//     })
//     .exec(function(err, allPosts){

//         User.find({}, function(err, users){
//             if(err){
//                 console.log('Error fetching posts');
//                 return;
//             }
    
//             return res.render('home', {
//                 title : 'home',
//                 posts : allPosts,
//                 all_users : users,
//             });
//         });
//     })
// }