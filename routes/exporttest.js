var express = require('express');
var router = express.Router();
var XLSX = require('xlsx');
var { createCanvas, loadImage, Image } = require('canvas');

function exportAOA2Sheet(aoa) {
  return XLSX.utils.aoa_to_sheet(aoa);
}

// GET to the export test page.
router.get('/', function(req, res, next) {
  res.render('section4-export');
});

// POST to export JSON file.
router.post('/json', function(req, res, next) {
  // The body data was defined in the click function "btnExportJSON" of "section4-export.js". 
  console.log(req.body);

  // Send data to client side with JSON format.
  // res.type('application/json');
  res.type('text/plain');
  res.attachment("data.json");
  res.send(req.body.jsondata);
});

// POST to export CSV file.
router.post('/csv', function(req, res, next) {
  var ws = exportAOA2Sheet(JSON.parse(req.body.aoadata));
  var oCSV = XLSX.utils.sheet_to_csv(ws);

  // Send data to client side in CSV format.
  res.type('application/octet-stream');
  res.attachment("data.csv");
  res.send(oCSV);
});

// POST to export XLSX file.
router.post('/xlsx', function(req, res, next) {
  var ws = exportAOA2Sheet(JSON.parse(req.body.aoadata));

  // Format to number type, for cells in second column.
  var tmpV, crange = XLSX.utils.decode_range(ws["!ref"]);
  for (var ci=crange.s.c; ci<=crange.e.c; ++ci) {
    for (var ri=crange.s.r; ri<=crange.e.r; ++ri) {
      var celladdress_a1 = XLSX.utils.encode_cell({c:ci,r:ri});
      tmpV = parseFloat(ws[celladdress_a1].v);
      if ((tmpV && tmpV != 'NaN') && (ci>crange.s.c)) {
        // console.log(ws[celladdress_a1].v);
        ws[celladdress_a1].t = 'n';   // Data type => Number
        ws[celladdress_a1].z = '0';   // General Number. Ref. ECMA-376 18.8.30
      } 
    }
  }

  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'data');
  var oXLSX = XLSX.write(wb, {
    type: 'buffer',   // type = buffer, for HttpResponse that export to XLSX file.
    bookType : 'xlsx'
  });

  // Send data to client side in XLSX format.
  res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.attachment("data.xlsx");
  res.send(oXLSX);
});

// POST to export pdf file.
router.post('/pdf', function(req, res, next) {
  // console.log(req.body);
  const PDFcanvas = createCanvas(595, 841, 'pdf');  // 210mm x 297mm, 72dpi, A4 page size. convert to pixel size.
  const CTX = PDFcanvas.getContext('2d');
  
  // Create PDF canvas with POST data.
  var tmpA = JSON.parse(req.body.aoadata);

  // First page.
  for (var i=0; i<tmpA.length; i++) {
    CTX.font = '24px "微软雅黑", Sans';
    // CTX.rotate(0.1);
    CTX.fillText(tmpA[i].join("   "), 40, 60+40*(i+1));
  }
  var img1 = new Image();
  img1.src = req.body.imgdata;
  CTX.drawImage(img1, 40, 400, 460, 200);

  // Second page.
  CTX.addPage();
  CTX.font = '36px "宋体", Sans';
  CTX.fillText('Congrats！PDF File created.', 40, 100);
  CTX.fillText('恭喜！PDF文件已创建。', 40, 150);
  var img2 = new Image();
  img2.onload = () => {
    CTX.drawImage(img2, 40, 300);
    // Send data to client side in PDF format.
    res.type('application/pdf');
    res.attachment("data.pdf");
    res.send(PDFcanvas.toBuffer());
  }
  img2.onerror = err => {
    // Send data to client side in PDF format.
    res.type('application/pdf');
    res.attachment("data-without-icon.pdf");
    res.send(PDFcanvas.toBuffer());
  }
  img2.src = './public/bufferdata/image_sample.png';
});

module.exports = router;