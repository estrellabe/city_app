/* Backend */
var express = require('express');
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
    const user = {id: profile.id, name: profile.displayName, email: profile.emails[0].value, photo: profile.photos[0].value};
    return cb(null, profile);
}
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        // Autenticación con éxito, redireccionar a la página de inicio
        const token = jwt.sign(req.user, process.env.TOKEN_SECRETO, {expiresIn: 60 * 60 * 24});
        res.redirect('/dashboard?token=${token}');
    });

module.exports = router;
