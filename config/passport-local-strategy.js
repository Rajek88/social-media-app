const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');


//authentication using passport
passport.use(new LocalStrategy({
        usernameField : 'email',
    },
    function(email, password, done){
        //find a user and establish identity
        User.findOne({email : email}, function(err,user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log('Invalid user name / password');
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

//serialize user function to decide which key is to be used to set in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});
//de-serialize user function to estaablish identity

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error finding user --> passport');
            return done(err);
        }
        // else{
        //     return done(null, user);
        // }
        return done(null, user);
    });
});


//check if user is authenticated

passport.checkAuthentication = function(req, res, next){
    //if user is authenticated then pass on request to next function which is my controller's action
    if(req.isAuthenticated()){
        return next();
    }

    //else redirect to signin page
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains data about user from cookie
        //we are collecting locals for views
        res.locals.user = req.user;
    }

    return next();
}


module.exports = passport;

