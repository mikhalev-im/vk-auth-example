const ProfileModel = require('../models/profile');

module.exports = function(req, res) {

  if (!req.user) {
    res.status(401);
    return res.redirect('/');
  }

  ProfileModel.getFriends(req.user.id, function(err, friendsList) {

    if (err) {
      // error handling
      console.log(err);
      res.status(500);
      return res.render('error', { message: 'Something went wrong' });
    }

    res.render('profile', {
      title: 'Ваше имя: ' + req.user.displayName,
      friends: friendsList
    });

  });

}