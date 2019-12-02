var express = require('express');
var fs = require("fs");


var router = express.Router();

// Get emoji codes json object from text file
function getEmojiCodesJson(fn) {
  var cJson = [];

  console.log(process.cwd());
  var emojiData = fs.readFileSync(fn, {flag: 'r', encoding: 'utf8'});
  var codeset = emojiData.match(/^[0-9|A-F]+.*;/gm);
  for (var id in codeset) {
    cJson.push(codeset[id].substring(0,codeset[id].length-1).trim());
  }
  // console.log(cJson);

  return cJson;
}

/* GET emoji html page. */
router.get('/', function(req, res, next) {
  // Get emoji Unicode from emoji-data.txt (Unicode Version)
  var codesjson = getEmojiCodesJson('./public/emoji/emoji-test.txt');

  res.render('emoji', { 
    title: `${req.app.locals.title} Emoji Cheat Sheet`,
    name: 'Unicode® Emoji',
    link: 'https://unicode.org/Public/emoji/12.1/emoji-test.txt',
    codesjson: codesjson,
    downloadflag: false
  });
});

/* Download emoji html page. */
router.get('/download', function(req, res, next) {
  // Get emoji Unicode from emoji-data.txt (Unicode Version)
  var codesjson = getEmojiCodesJson('./public/emoji/emoji-test.txt');

  res.render('emoji', { 
    title: `${req.app.locals.title} Emoji Cheat Sheet`,
    name: 'Unicode® Emoji',
    link: 'https://unicode.org/Public/emoji/12.1/emoji-test.txt',
    codesjson: codesjson,
    downloadflag: true
  }, function(err, html) {
    res.setHeader('Content-Disposition', 'attachment; filename="emoji-index.html"');
    res.send(html);
  }); 
});

module.exports = router;
