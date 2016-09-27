const express = require('express');
const router = express.Router();
const passport = require('passport');

const ctrlIndex = require('../controllers/index');
const ctrlProfile = require('../controllers/profile');

router.get('/', ctrlIndex);

router.get('/profile', ctrlProfile);

router.get('/vkontakte/login',
  passport.authenticate('vkontakte'),
  function(req, res, next) {
    // this will not be called
  });

router.get('/vkontakte/callback',
  passport.authenticate('vkontakte', {failureRedirect: '/'}),
  function(req, res) {
    // success
    res.redirect('/profile');
  });

router.get('/vkontakte/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
