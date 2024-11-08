const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');

// Set destination path and file name regulation for multer.
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/uploadcache');
  },
  filename: function(req, file, cb) {
    const fn = /(.+)\.(\w+)/g.exec(file.originalname);
    const uploaded_file_name = `${fn[1]}-${crypto.randomUUID()}.${fn[2]}`;
    cb(null,uploaded_file_name);
  }
});

// Accept only one file.
var upload = multer( {storage: storage} ).single('file')

// GET to the upload form page.
router.get('/form', function(req, res, next) {
  res.render('section4-upload-form');
});

// POST to the upload process
router.post('/handler', function(req, res, next) {
  upload(req, res, function(err) {
    let response_code = 200;
    if (err instanceof multer.MulterError) {
      // multer error
      console.log(err);
      response_code = 502;
    } else if (err) {
      // unknown error
      console.log(err);
      response_code = 500;
    } 
    res.status(response_code).send({
      code: response_code,
      message: err? err.message: "File upload success!",
      uploaded_file_path: `/upload/cache/${req.file.filename}`,
      // uploaded_file_info: req.file
    });
  });
});

// GET redirect to the real uploaded file's directory 
router.get('/cache/:filename', function(req, res, next) {
  res.redirect('/uploadcache/' + req.params.filename);
});

module.exports = router;