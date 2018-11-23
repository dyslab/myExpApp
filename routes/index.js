var express = require('express');
var router = express.Router();
const apptitle = 'myExpApp';

var trackingLink = '';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: apptitle + ' Index/Router page' });
});

/* GET Section2 page. */
router.get('/section2', function(req, res, next) {
  res.render('section2', { title: apptitle + ' Section 2', applesnum: 10 });
});

/* POST Section2 page. */
router.post('/section2', function(req, res, next) {
  // log the POST data : comnName and trackingNo
  console.log(req.body.comName);
  console.log(req.body.trackingNo);

  trackingLink = 'http://www.kuaidi100.com/query?type=' + req.body.comName + '&postid=' +  req.body.trackingNo;
  console.log(trackingLink);

  var fetch = require("node-fetch");
  fetch(trackingLink)
    .then(res => res.json())
    .then(json => res.render('section2-1',json));
});

/* GET Section3 page. */
router.get('/section3', function(req, res, next) {
  res.render('section3', { title: apptitle + ' Section 3' });
});

module.exports = router;