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
      res.send('ok');
    }
    w_stream.end();
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

  //=============================================================================================
  // Below for test
  if(req.params.method === 'test') {
    fooTest(res, spnfile);
  }

  function fooTest(res, tfile) {
    // Step 1: Read original txt file.
    var ret_text = 'Step 1:<br>';
    fs.createReadStream(tfile).on('data', function(chunk1) {
      console.log('Read original content from txt file at first time. Success...');
      ret_text += 'Read original content from txt file at first time. Success...<br>File content: [' + chunk1 + ']<br>';
    }).on('error', function(err) {
      console.log('Read original content from txt file at first time. Fail...');
      ret_text += 'Read original content from txt file at first time. Fail...<br>';
    });

    // Step 2: Set promise timeout to write the txt file.
    new Promise(function(resolve, reject) {
      setTimeout(function() {
        ret_text += 'Step 2:<br>';
        var chunk2 = Math.random().toFixed(10);
        const ws1 = fs.createWriteStream(tfile);
        if (ws1.write(chunk2) === false) {
          console.log('Promise Test: Write txt file with random number. Fail...');
          ret_text += 'Promise Test: Write txt file with random number "' + chunk2 + '". Fail...<br>';
          reject(ret_text);
        } else {
          console.log('Promise Test: Write txt file with random number. Success...');
          ret_text += 'Promise Test: Write txt file with random number "' + chunk2 + '". Success...<br>';
          resolve(ret_text);
        }
        ws1.close();
      }, 1000); // Note: shorter duration will increase the risk of file conflict.
    }).then(function(resolve) {
      // Step 3: If wrote file success, Read the txt file at the second time.
      resolve += 'Step 3:<br>';
      fs.access(tfile, fs.constants.R_OK, function(err) {
        if(err) {
          console.log('Promise Test(then): Txt file is still in a lock mode. Currectly cannot be read...');
          resolve = resolve + 'Promise Test(then): Txt file is still in a lock mode. Currectly cannot be read.<br>';
          res.send(resolve);
        }
        else {
          fs.createReadStream(tfile).on('data', function(chunk3) {
            console.log('Promise Test(then): Read content from txt file at second time. Success...');
            resolve = resolve + 'Promise Test(then): Read content from txt file at second time. Success...<br>File content: [' + chunk3 + ']<br>';
            res.send(resolve);
          }).on('error', function(err) {
            console.log('Promise Test(error): Read content from txt file at first time. Fail...');
            resolve = resolve + 'Promise Test(error): Read content from txt file at first time. Fail...<br>';
            res.send(resolve);
          });
        }
      });
    }, function(reject) {
      res.send(reject);
    }).catch(function(err) {
      console.log(err);
    });
  }
  // Above for test
  //=============================================================================================
});

module.exports = router;