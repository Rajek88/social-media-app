const User = require('../models/users');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log('Error fetching users : ', err);
            return;
        }
        return res.render('user_profile', {
            title : "User | profile",
            profile_user : user,
        });
    } );
}

module.exports.updateProfile = function(req, res){
    if(req.user.id == req.params.id ){
        User.findByIdAndUpdate(req.params.id, 
            { 
                name : req.body.name, 
                email : req.body.email,
            },
            function(err, user){
                if(err){
                    console.log('Error updating user details : ', err);
                    return;
                }
                console.log('Successfully updated user details : ', user);
                return res.redirect('back');
            })
    }else{
        return res.status();
    }
}

module.exports.timeline = function(req, res){
    res.end('<h1>User / Timeline</h1>')
}

module.exports.signin = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
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
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signup', {
        title:"Rajendra | Sign Up", 
    });
}


module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.signout = function(req, res){
    req.logout();
    req.flash('success', 'Logged out successfully');
    return res.redirect('/');

}