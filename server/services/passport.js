const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');

// setup Jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, function (data, done) {
    User.findById(data.sub, function (err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// local auth strategy
const localLogin = new LocalStrategy({ usernameField: 'email' }, function (email, password, done) {
    User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
            return done(null, false)
        }
        // compare password
        user.comparePassword(password, function (err, isMatch) {
            if (err) { return done(err) }
            if (!isMatch) {
                return done(null, false)
            }
            return done(null, user)
        })
    })
})

passport.use(jwtLogin);
passport.use(localLogin);