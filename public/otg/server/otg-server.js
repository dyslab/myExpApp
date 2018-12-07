var express = require('express');
var router = express.Router();
var htmlparser = require('htmlparser2');
var domutils = require('domutils');
var fs = require('fs');
const fetch = require('node-fetch');
// var encoding = require('encoding');  // According to the manual helper of node-fetch, we need to install this package for encode the chinese text.

// Get HTML code from 'link' by node-fetch
function GetHtmlCode(link, cb, errcb) {
  fetch(link)
    .then(fetch_res =>  fetch_res.textConverted())
    .then(body => {
      if (typeof cb === 'function') {
        cb(body);
      }  
    }).catch(err => { 
        errcb(err);
    });
}

// Get Children from node object by tagname.
function getChildObjectByTag(obj, tagname) {
  for (var i=0; i<obj.length; i++)
    if (obj[i].type === 'tag' && obj[i].name === tagname) {
      return obj[i].children;
    }
}

// Get Children from node object by id.
function getChildObjectByID(obj, tagname, idname) {
  for (var i=0; i<obj.length; i++)
    if (obj[i].type === 'tag' && obj[i].name === tagname)
      if (domutils.getAttributeValue(obj[i],'id') === idname)
        return obj[i].children;
}

// Get Children from node object by class.
function getChildObjectByClass(obj, tagname, idname) {
  for (var i=0; i<obj.length; i++) 
    if (obj[i].type === 'tag' && obj[i].name === tagname) 
      if (domutils.getAttributeValue(obj[i],'class') === idname) 
        return obj[i].children;
}

// Get text string from node object. 
function getContentText(obj) {
  var retText = '';
  for (var i=0; i<obj.length; i++) {
    if (obj[i].type === 'tag' && obj[i].name === 'br') 
      retText = retText + '\r\n';
    if (obj[i].type === 'text') 
      retText = retText + obj[i].data.replace(/&nbsp;/g,' ');
  }

  return retText;
}

// Get Digital filename from 'link' 
function getD(link) {
  var tmpLinkArr = link.split(/\//);
  if (tmpLinkArr.length>0) {
    var tmpF = tmpLinkArr[tmpLinkArr.length-1].split(/\./);
    if(tmpF.length === 2) {
      return parseInt(tmpF[0]);
    }
  } 
  return 0;
}

// Get attribute 'a:href' from node object. 
function getNextByTagA(link, obj) {
  var nNext, retLink;
  var nThis = getD(link);
  
  for (var i=0; i<obj.length; i++) {
    if (obj[i].type === 'tag' && obj[i].name === 'a') {
      retLink = domutils.getAttributeValue(obj[i],'href');
      nNext = getD(retLink);
      if (nNext>nThis) {
        // console.log('Next Chapters Link Return Value ================>>>>>' + retLink);
        return retLink;
      }
    }
  }
}

// Get filename from the string 'link'.
function getTXTFilename(link) {
  return getD(link) + '.txt';
}

// Save to the txt file.
function saveTXTfile(filename, chunk) {
  var retFlag = false;
  const w_stream = fs.createWriteStream(filename);
  if (w_stream.write(chunk) !== false) retFlag = true;
  w_stream.end();

  if(retFlag) return filename;
}

// Use htmlparser2 to parse HTML code of "htmlcode" which get from website ID:240.
function parseHtml_240(link, htmlcode) {
  // errcode = -2 means some error happened on this processing.
  var resObj = { errcode : -2 };
  var domHandler = new htmlparser.DomHandler( function(err, dom) {
    if (!err) {
      //  Next chapters link's css path (refer to the same link): 
      //    html > body > div#wrapper > div.content_read > div.box_con > div.bookname > div.bottem1 > a
      //      or
      //    html > body > div#wrapper > div.content_read > div.box_con > div.bottem2 > a
      //  Title's css path: 
      //    html > body > div#wrapper > div.content_read > div.box_con > div.bookname > h1
      //  Content's css path: 
      //    html > body > div#wrapper > div.content_read > div.box_con > div#content
      //  Check them out via Firefox Browser.
      var tmpChild = getChildObjectByTag(dom, 'html');
      tmpChild = getChildObjectByTag(tmpChild, 'body');
      tmpChild = getChildObjectByID(tmpChild, 'div', 'wrapper');
      tmpChild = getChildObjectByClass(tmpChild, 'div', 'content_read');
      var box_con = getChildObjectByClass(tmpChild, 'div', 'box_con');
      // get Title according to the title's css/path.
      tmpChild = getChildObjectByClass(box_con, 'div', 'bookname');
      tmpChild = getChildObjectByTag(tmpChild, 'h1');
      var txtContent = getContentText(tmpChild);
      // get Content according to the content's css/path.
      tmpChild = getChildObjectByID(box_con, 'div', 'content');
      txtContent += '\r\n\r\n' + getContentText(tmpChild);
      // save to TXT file.
      var strFilename = saveTXTfile('./public/otg/txt/' + getTXTFilename(link), txtContent);

      // Get Next chapters link
      tmpChild = getChildObjectByClass(box_con, 'div', 'bottem2');
      var strNextLink = getNextByTagA(link, tmpChild);

      // Return txt filename, next link, errcode = 0 means successful processing.
      // console.log('parseHtml_240() Return Value: ' + strFilename + ',' + strNextLink);
      resObj = { filename: strFilename, nextlink: strNextLink, errcode: 0 };
    }
  });
  var parser = new htmlparser.Parser(domHandler, {decodeEntites : true});
  parser.parseComplete(htmlcode);
  return resObj;
}

/* GET for website ID "240" */
router.get('/240', function(req, res, next) {
  GetHtmlCode(req.query.link, function(body) {
    // Return txt filename, next link and errcode.
    res.json(JSON.stringify(parseHtml_240(req.query.link, body)));
  }, function(err) {
    console.log(err.StatusText);
    // Return errcode = -1 means failed processing.
    res.json(JSON.stringify({ errcode : -1 }));
  });
});

module.exports = router;