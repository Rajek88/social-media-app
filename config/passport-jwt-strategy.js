const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');

let opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'franKLY@E104$$Bill!0N',
}

passport.use( new JWTStrategy(opts,function(jwtPayload, done){

    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log('JWT : Error in finding User :: ', err);
            return;
        }
        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    })
}));


module.exports = passport;