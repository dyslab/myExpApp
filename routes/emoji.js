var express = require('express');
var fs = require("fs");


var router = express.Router();

// Render emoji codes page or output to download based on params
function renderEmojiPage(tag, fn, req, res, download) {
  var cJson = [];

  fs.readFile(fn, {flag: 'r', encoding: 'utf8'}, (err, data) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      let emojiData = data;
      let codeset = emojiData.match(/^[0-9|A-F]+.*;/gm);
      for (var id in codeset) {
        cJson.push(codeset[id].substring(0,codeset[id].length-1).trim());
      }
      if (download) {
        res.render(`emoji-${tag}`, { 
          title: `${req.app.locals.title} Emoji Cheat Sheet`,
          name: 'Unicode® Emoji',
          link: 'https://unicode.org/Public/emoji/12.1/emoji-test.txt',
          codesjson: cJson,
          downloadflag: download
        }, function(err, html) {
          if (err) {
            console.error(err);
            throw err;
          }
          res.setHeader('Content-Disposition', `attachment; filename="emoji-${tag}-index.html"`);
          res.send(html);
        });               
      } else {
        res.render(`emoji-${tag}`, { 
          title: `${req.app.locals.title} Emoji Cheat Sheet`,
          name: 'Unicode® Emoji',
          link: 'https://unicode.org/Public/emoji/12.1/emoji-test.txt',
          codesjson: cJson,
          downloadflag: download
        });
      }
    }
  });
}

/* GET emoji simple style html page. */
router.get('/simple', function(req, res, next) {
  // Get emoji Unicode from emoji-data.txt (Unicode Version)
  renderEmojiPage('simple', './public/emoji/emoji-test.txt', req, res, false);
});

/* Download emoji simple style html page. */
router.get('/simple/download', function(req, res, next) {
  // Get emoji Unicode from emoji-data.txt (Unicode Version)
  renderEmojiPage('simple', './public/emoji/emoji-test.txt', req, res, true);
});

/* GET emoji fixed style html page. */
router.get('/fixed', function(req, res, next) {
  // Get emoji Unicode from emoji-data.txt (Unicode Version)
  renderEmojiPage('fixed', './public/emoji/emoji-test.txt', req, res, false);
});

/* Download emoji fixed style html page. */
router.get('/fixed/download', function(req, res, next) {
  // Get emoji Unicode from emoji-data.txt (Unicode Version)
  renderEmojiPage('fixed', './public/emoji/emoji-test.txt', req, res, true);
});

/* GET emoji popups style html page. */
router.get('/popups', function(req, res, next) {
  // Get emoji Unicode from emoji-data.txt (Unicode Version)
  renderEmojiPage('popups', './public/emoji/emoji-test.txt', req, res, false);
});

/* Download emoji popups style html page. */
router.get('/popups/download', function(req, res, next) {
  // Get emoji Unicode from emoji-data.txt (Unicode Version)
  renderEmojiPage('popups', './public/emoji/emoji-test.txt', req, res, true);
});

module.exports = router;
