var test = require('tape')
  , raf = require('./index.js')

test('continues to emit events', function(t) {
  var canvas = typeof document === "undefined" ? {} : document.createElement('canvas')
    , ee = raf(canvas)
    , times = 0

  t.plan(10)

  canvas.width = canvas.height = 100

  ee
    .on('data', function(dt) {
      t.ok(dt >= 0, "time has passed")
      if(++times == 10) {
        ee.pause()
        t.end() 
      }
    })
})

test('default tick function gets data', function(t) {
  var canvas = typeof document === "undefined" ? {} : document.createElement('canvas')
    , ee = raf(canvas, function tick(dt) {
      t.ok(dt >= 0, 'got data')
      ee.pause()
      t.end()
    })
})

test('pause/resume', function(t) {
  t.plan(7)
  var canvas = typeof document === 'undefined' ? {} : document.createElement('canvas')
    , times = 0
    , ee = raf(canvas, function tick(dt) {
      times++
      t.ok(dt >= 0, 'time has passed')
      if(times == 5) {
        ee.pause()
        setTimeout(function() {
          ee.resume()
        }, 100)
      }
      if(times == 6) {
        t.ok(dt >= 100, 'stream resumed after pause')
        ee.pause()
        t.end()
      }
    })
})

