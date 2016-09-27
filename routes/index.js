const express = require('express');
const router = express.Router();
const passport = require('passport');

const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user) {
    return res.redirect('/profile');
  }

  res.render('index', { title: 'Node.js VK authentication example' });
});

router.get('/profile', function(req, res, next) {

  if (!req.user) {
    return res.redirect('/');
  }

  const requestOptions = {
    url: 'https://api.vk.com/method/friends.get?user_id=' + req.user.id + '&v=5.52&count=5&fields=nickname&lang=ru',
    method: 'GET'
  }

  request(requestOptions, function(err, response, body) {
    if (err) {
      // error handling
      console.log(err);
    }

    body = JSON.parse(body);
    friendsId = body['response']['items'];

    res.render('profile', { title: 'Your VK friends:', friends: friendsId });
  });
  
});

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
