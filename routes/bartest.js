var express = require('express');
var router = express.Router();
var JsBarcode = require('jsbarcode');

var { createCanvas } = require('canvas');
var can = createCanvas(400, 200, []);

router.post('/', function(req, res, next) {
  var sqc = req.body.strBarcode;

  console.log(sqc);

  try {
    JsBarcode(can, sqc);
  
    const buf = can.toBuffer();

    res.type('application/x-png');
    res.attachment(sqc+".png");
    res.send(buf);
  }
  catch (e) {
    // render the error page
    console.log('error happened.')
    res.render('myexperr',{ errortips: 'Barcode生成：输入字符串不符合要求 或 过程调用失败！'});
  }
});

module.exports = router;