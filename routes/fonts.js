var express = require('express');

var router = express.Router();

/* GET fonts index page. */
router.get('/:fontname', function(req, res, next) {
  var fontjson = require(`../public/fonts/${req.params.fontname}.json`);

  res.render('fonts', { 
    title: `${req.app.locals.title} FONT - ${req.params.fontname.toUpperCase()}`,
    fontname: req.params.fontname,
    fontjson: fontjson
  });
});

module.exports = router;
