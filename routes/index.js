var express = require('express');
var fetch = require("node-fetch");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: `${req.app.locals.title} Index/Sect.1` });
});

/* GET Section2 page. */
router.get('/section2', function(req, res, next) {
  res.render('section2', { title: req.app.locals.title + ' Sect.2', applesnum: 10 });
});

/* GET Section3 page. */
router.get('/section3', function(req, res, next) {
  res.render('section3', { title: req.app.locals.title + ' Sect.3' });
});

/* GET Section4 page. */
router.get('/section4', function(req, res, next) {
  res.render('section4', { title: req.app.locals.title + ' Sect.4' });
});

/* GET Section5 page. */
router.get('/section5', function(req, res, next) {
  res.render('section5', { title: req.app.locals.title + ' Sect.5' });
});

/* POST lottery checking. */
router.post('/lotto/json', function(req, res, next) {
  var jsonLink = `http://f.apiplus.net/${req.body.lottoname}.json`;

  fetch(jsonLink)
    .then(res => res.json())
    .then(json => res.render('lotto_json_result',json));
});

/* GET event emitter test. */
var eventtest = require('./eventtest')
router.get('/eventtest', function(req, res, next) {
  eventtest.exportCombinedFilesByEventEmitter(res, [
    './public/bufferdata/spn-todo.txt',
    './public/bufferdata/spn-inprogress.txt',
    './public/bufferdata/spn-done.txt'
  ], 'event-emitter-output-file.txt')
});

module.exports = router;
