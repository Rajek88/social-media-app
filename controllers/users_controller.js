const User = require('../models/users');

module.exports.profile = function(req, res){
    res.end('<h1>User / Profile</h1>')
}

module.exports.timeline = function(req, res){
    res.end('<h1>User / Timeline</h1>')
}

module.exports.signin = function(req, res){
    return res.render('user_signin', {
        title:"Rajendra | Sign In", 
    });
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log('Error fetching user details : ', err);
        }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error Creating User account : ', err);
                    return;
                }

                return res.redirect('/users/signin');

            });
        }
        else{
            return res.redirect('back');
        }
    });
}

module.exports.signup = function(req, res){
    return res.render('user_signup', {
        title:"Rajendra | Sign Up", 
    });
}