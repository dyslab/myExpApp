var express = require('express');
var router = express.Router();

// GET to the export test page.
router.get('/', function(req, res, next) {
  res.render('section4-export');
});

module.exports = router;