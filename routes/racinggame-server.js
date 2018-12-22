var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('racinggame', { title: 'Racing Gambling Game' });
});

module.exports = router;