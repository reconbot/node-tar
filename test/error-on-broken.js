var fs = require('fs')
var path = require('path')
var zlib = require('zlib')

var tap = require('tap')

var tar = require('../tar.js')

var file = path.join(__dirname, 'cb-never-called-1.0.1.tgz')
var target = path.join(__dirname, 'tmp/extract-test')

tap.test('preclean', function (t) {
  require('rimraf').sync(__dirname + '/tmp/extract-test')
  t.pass('cleaned!')
  t.end()
})

tap.test('extract test', function (t) {
  var extract = tar.Extract(target)
  var inp = fs.createReadStream(file)
  var unzip = zlib.createGunzip()

  inp.pipe(unzip).pipe(extract)

  // on node 6 the error isn't propagated to tar
  unzip.on('error', function (er) {
    t.ok((/unexpected (eof|end of file)/).test(er.message), 'zlib noticed the error')
    t.end()
  })

  extract.on('error', function (er) {
    t.ok((/unexpected (eof|end of file)/).test(er.message), 'tar noticed the error')
    t.end()
  })

  extract.on('end', function () {
    t.fail('shouldn\'t reach this point due to errors')
    t.end()
  })
})
