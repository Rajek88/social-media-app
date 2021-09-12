const User = require('../models/users');

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(err){
                console.log('can not find cookie');
            }
            if(user){
                return res.render('user_profile', {
                    title : 'User Profile',
                    user : user,
                });
            }
            else{
                return res.redirect('/users/signin');
            }
        })
    }
    else{
        return res.redirect('/users/signin');
    }
}

module.exports.timeline = function(req, res){
    res.end('<h1>User / Timeline</h1>')
}

module.exports.signin = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(err){
                console.log('can not find cookie');
            }
            if(user){
                return res.redirect('/users/profile');
            }
        });
    }
    else{
        return res.render('user_signin', {
            title:"Rajendra | Sign In", 
        });
    }
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
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(err){
                console.log('can not find cookie');
            }
            if(user){
                return res.redirect('/users/profile');
            }
        });
    }
    else{
        return res.render('user_signup', {
            title:"Rajendra | Sign Up", 
        });
    }
}

module.exports.createSession = function(req, res){
    //find the user
    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log('Error in signing user');
        }
        //handle the user found
        if(user){
            //handle password mismatch
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        }
            //handle the user not found
        else{
            return res.redirect('back');
        }
    });


}