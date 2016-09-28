const request = require('request');

module.exports.getFriends = function(userId, cb) {

  const requestOptions = {
    url: 'https://api.vk.com/method/friends.get?user_id=' + userId + '&v=5.52&count=5&fields=nickname&lang=ru',
    method: 'GET'
  }

  request(requestOptions, function(err, response, body) {
    if (err) {
      return cb(err);
    }

    body = JSON.parse(body);
    friendsList = body['response']['items'];

    cb(null, friendsList);

  });
}