var express = require('express');
var router = express.Router();

/* GET for website ID "240" */
router.get('/240', function(req, res, next) {
  console.log(req.query.link);
  res.send('respond from otg-server.');
});

module.exports = router;