var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploadcache');
  },
  filename: function(req, file, cb) {
    var extname = file.originalname.substring(file.originalname.lastIndexOf('.') + 1, file.originalname.length).toLocaleLowerCase();
    var uploaded_file_name =  'tmp' + Date.now() + '.' + extname;

    cb(null,uploaded_file_name);
  }
});

// Accept only one file.
var upload = multer( {storage: storage} ).single('srcFile');

router.get('/form', function(req, res, next) {
  res.render('section4-upload-form');
});

router.post('/handle', upload, function(req, res, next) {
  var errcode = 0;

  upload(req, res, function(err) {
  
    if (err instanceof multer.MulterError) {
      // multer error
      console.log(err);

      errcode = -1;
    } else if (err) {
      // unknown error
      console.log(err);

      errcode = -2;
    } else {
      // everything goes fine.
      errcode = 0;
    }
  });
  
  res.render('section4-upload-result', { errcode: errcode, uploadedfile: req.file });
});

// redirect to the real uploaded file's path. 
router.get('/cache/:filename', function(req, res, next) {
  res.redirect('/uploadcache/' + req.params.filename);
});

module.exports = router;