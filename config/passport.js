// passport-jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = require('../models/User');
const keys = require('../config/keys');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
}

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User
            .findById(jwt_payload.id)
            .then(user => done(null, !!user && user))
            .catch(err => console.log(err))
    }))
}

