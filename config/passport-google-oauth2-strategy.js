const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/users');

//tell passport to use a new strategy
passport.use(new googleStrategy({
    clientID : '303267661708-nt75g6pntrnkti2uurfavbf1mpqrgcu9.apps.googleusercontent.com',
    clientSecret : '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',
    callbackURL : 'http://localhost:8000/users/auth/google/callback'
    }, 
    function(accessToken, refreshToken, profile, done){
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('Error in google strategy :: ', err);
                return;
            }
            console.log(profile);

            if(user){
                //if user found log him in
                return done(null, user);
            }
            else{
                //create user if not found
                User.create({
                    name : profile.name.givenName + profile.name.familyName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex'),
                    avatar : profile.photos[0].value,
                    },
                    function(err, user){
                        if(err){
                            console.log('Error in creating user with google strategy :: ', err);
                            return;
                        } 

                        return done(null, user);
                    }
                )
            }
        })

    }
));

module.exports = passport;