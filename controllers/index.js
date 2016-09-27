module.exports = function(req, res) {
  if (req.user) {
    return res.redirect('/profile');
  }

  res.render('index', { title: 'Node.js VK authentication example' });
}