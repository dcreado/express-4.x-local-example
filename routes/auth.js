var express = require('express');
var passport = require('passport');

var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/password', function(req, res, next) {
  var redirect_back = req.session.returnTo;

  if(redirect_back == undefined || redirect_back == "" || !(redirect_back.startsWith("/"))) {
    redirect_back = "/";
  }

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect(redirect_back);
    });
  })(req, res, next);
});


router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
