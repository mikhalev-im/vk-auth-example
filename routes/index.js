var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VK authentication example app' });
});

router.get('/profile', function(req, res, next) {
  res.render('index', {title: 'VK Profile page'});
});

router.get('/vkontakte/login',
  passport.authenticate('vkontakte'),
  function(req, res, next) {
    // this will not be called
  });

router.get('/vkontakte/callback',
  passport.authenticate('vkontakte', {failureRedirect: '/'}),
  function(req, res) {
    // successfull auth
    res.redirect('/profile');
  });

module.exports = router;
