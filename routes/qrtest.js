var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');

var { createCanvas } = require('canvas');
var can = createCanvas(200, 200, []);

router.post('/', function(req, res, next) {
  var sqc = req.body.strQRCode;
  var sqs = req.body.bQRSave;

  console.log(sqc + "," + sqs);

  if (sqc==null || sqc=="") {
    res.type('html');
    res.send("不能为空！");
  }
  else {
    QRCode.toCanvas(can, sqc, function (error) {
      if (error) console.error(error)
        console.log(can);
    });
  
    const buf = can.toBuffer();
    if (sqs == "true") {
      res.type('application/x-png');
      res.attachment(sqc+".png");
    }
    else
      res.type('png');

    res.send(buf);
  }
});

module.exports = router;