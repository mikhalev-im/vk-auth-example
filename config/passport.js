const passport = require('passport');

module.exports = function(env) {

  var VKontakteStrategy = require('passport-vkontakte').Strategy;
  var User = require('../models/user');

  // passport config
  passport.use(new VKontakteStrategy(
    {
      clientID:     process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
      callbackURL:  env === 'development' 
        ? "http://node-vk-auth-example.herokuapp.com:3000/vkontakte/callback"
        : "https://node-vk-auth-example.herokuapp.com/vkontakte/callback"
    },
    function(accessToken, refreshToken, profile, done) {

      User.findOrCreate(profile, function(err, user) {
        done(null, profile);
      })

    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


}