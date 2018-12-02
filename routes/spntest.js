var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/:tag/:method', function(req, res, next) {
  var spnfile = './public/bufferdata/spn-' + req.params.tag + '.txt';
  console.log(req.params.method + ' ' + spnfile);

  // res.send('you are calling POST "' + req.params.tag + '" using method "' + req.params.method + '".');
  if(req.params.method === 'write') {
    const w_stream = fs.createWriteStream(spnfile);
    if (w_stream.write(req.body.textA) === false) {
      console.log('Stream writing false....')
    }
    else {
      w_stream.end();
      res.send('ok');
    }
  }
});

router.get('/:tag/:method', function(req, res, next) {
  var spnfile = './public/bufferdata/spn-' + req.params.tag + '.txt';
  console.log(req.params.method + ' ' + spnfile);

  // res.send('you are calling GET "' + req.params.tag + '" using method "' + req.params.method + '".');
  // read txt file and send response.
  if(req.params.method === 'read') {
    const r_stream = fs.createReadStream(spnfile);
    r_stream.on('data', function(chunk) {
      console.log('接收到 [' + chunk.length + '] 个字节的数据');
      res.send(chunk);
    })
    r_stream.on('error', function(err) {
      console.log(err);
    })
  }
});

module.exports = router;