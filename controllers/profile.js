const request = require('request');

module.exports = function(req, res) {

  if (!req.user) {
    res.status(401);
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
      res.status(500);
      return res.render('error', { message: 'Something went wrong' });
    }

    body = JSON.parse(body);
    friendsList = body['response']['items'];

    res.render('profile', {
      title: 'Ваше имя: ' + req.user.displayName,
      friends: friendsList
    });

  });

}