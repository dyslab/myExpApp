var express = require('express');
var router = express.Router();

// GET to the export test page.
router.get('/', function(req, res, next) {
  res.render('section4-export');
});

// POST to export JSON data file.
router.post('/json', function(req, res, next) {
  // The body data was defined in the function "btnExportJSON" of "section4-export.js". 
  console.log(req.body);

  // Send data to client side with JSON format.
  // res.type('application/json');
  res.type('text/plain');
  res.attachment("data.json");
  res.send(req.body.jsondata);
});

module.exports = router;