const express = require('express');
const router = express.Router();
const passport = require('passport');

const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node.js VK authentication example' });
});

router.get('/profile', function(req, res, next) {
  const requestOptions = {
    url: 'https://api.vk.com/method/friends.get?user_id=4897330&v=5.52&count=5',
    method: 'GET'
  }

  request(requestOptions, function(err, response, body) {
    if (err) {
      // error handling
      console.log(err);
    }

    body = JSON.parse(body);
    // console.log(body.response);
    friendsId = body['response']['items'];

    // friendsId = [];

    res.render('profile', { title: 'Your VK friends:', friends: friendsId });
  });
  
});

router.get('/vkontakte/login',
  passport.authenticate('vkontakte', { session: false }),
  function(req, res, next) {
    // this will not be called
  });

router.get('/vkontakte/callback',
  passport.authenticate('vkontakte', {failureRedirect: '/', session: false}),
  function(req, res) {
    // success
    res.redirect('/profile');
  });

module.exports = router;
