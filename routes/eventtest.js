const fs = require('fs')
const EventEmitter = require('events');

class DoneEmitter extends EventEmitter {}

exports.exportCombinedFilesByEventEmitter = (res, files, outputfile) => {
  const ReadfileEmitter = new DoneEmitter()
  var countno = 0
  var buffer = '';

  for (var i = 0; i < files.length; i++)  {
    // read each file by createReadstream().
    new Promise((resolve, reject) => {
      var rc = '';
      var rs = fs.createReadStream(files[i], { 
        'encoding': 'utf8',
        'autoClose': true
        })
      rs.on('open', (fd) => {
        rc += '\n>>> createReadStream(' + rs.path + '),open事件，fd:' + fd + ',文件数据开始读取......\n'
      })
      rs.on('data', (chunk) => {
        rc += '\n>>> createReadStream(' + rs.path + '),data事件，文件数据正在读取......\n'
        rc += chunk;
      })
      rs.on('end', () => {
        rc += '\n>>> createReadStream(' + rs.path + '),end事件，文件数据读取完毕.\n'
        resolve(rc)
      })
      rs.on('error', (err) => {
        rc += '\n>>> createReadStream(' + rs.path + '),文件数据读取错误，中止读取！\n'
        reject(rc)
      })
    }).then((data) => {
      countno ++
      buffer += data
      ReadfileEmitter.emit('read_ok', countno, buffer)
    }).catch((err) => {
      countno ++
      buffer += err
      ReadfileEmitter.emit('read_fail', countno, buffer)
    })
  }

  ReadfileEmitter.on('read_ok', (no, buf) => {
    if (no === files.length) {
      res.attachment(outputfile)
      res.send(buf)
    }
  })
  ReadfileEmitter.on('read_fail', (no, buf) => {
    if (no === files.length) {
      res.attachment(outputfile)
      res.send(buf)
    }
  })
  ReadfileEmitter.on('error', () => {
    console.log('processing error...')
    res.redirect('/')
  })
}
