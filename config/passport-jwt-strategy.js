const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/users');

let opts = {
    jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'franKLY@E104$$Bill!0N',
}