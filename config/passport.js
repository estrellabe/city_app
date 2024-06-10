var GoogleStrategy = require('passport-google-oauth20').Strategy;
var passport = require('passport');
var User = require('../models/Usuario');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
async function(token, tokenSecret, profile, done) {
  try {
    let usuario = await User.findOne({ googleId: profile.id });
    if (!usuario) {
      usuario = new User({
        googleId: profile.id,
        nombre: profile.displayName,
        email: profile.emails[0].value
      });
      await usuario.save();
    }
    return done(null, usuario);
  } catch (error) {
    return done(error, null);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
