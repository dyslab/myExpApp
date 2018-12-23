var express = require('express')
var router = express.Router()
var fs = require('fs')

// For Interval function
var trInterval, countInterval

// -----------------------------------------------------------------------------------------------
// Get filename by 'no'
function constructFilename(no) {
  return './public/bufferdata/racing' + no + '.txt'
}

// Interval writing random file with random number
function startIntervalWritingFile() {
  return setInterval(() => {
    let fno = Math.floor(Math.random() * 3 + 1)
    let rc = Math.round(Math.random() * 100)
    fs.writeFile(constructFilename(fno), rc, (err) => {
      if (err) console.log(err)
    })
    countInterval ++;
    // console.log(countInterval + '#' + fno + '$' + rc)
    if (countInterval > 99) {
      clearInterval(trInterval)
    }
  }, 1000)
}

// Read random file
function readRandomFile() {
  let fno = Math.floor(Math.random() * 3 + 1)

  return fno + '#' + fs.readFileSync(constructFilename(fno)) + '$'
}

// Return result
function getResult(result) {
  return '<img src="/images/' + result + '.svg">'
}

// -----------------------------------------------------------------------------------------------
// GET first page
router.get('/', function(req, res, next) {
  res.render('racinggame', { title: 'Racing Gambling Game' });
})

// GET start
router.get('/start', function(req, res, next) {
  // Start interval writing file
  countInterval = 0
  trInterval = startIntervalWritingFile()
  res.send('start')
})

// GET racing
router.get('/racing', function(req, res, next) {
  // Read random file
  res.send(readRandomFile())
})

// GET stop
router.get('/stop', function(req, res, next) {
  // Clear interval 
  clearInterval(trInterval)
  res.send(getResult(req.query.result))
})

module.exports = router
