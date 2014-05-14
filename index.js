var EE = require('events').EventEmitter
  , raf = require('raf')

module.exports = function(el, tick) {
  var last = 0
    , ee = new EE

  if(typeof el === 'function') {
    tick = el
    el = undefined
  }

  ee.pause = function() { ee.paused = true }
  ee.resume = function() {
    if(ee.paused) {
      raf(iter, el)
    }
    ee.paused = false
  }

  raf(iter, el)

  if(tick) {
    ee.on('data', function(dt) {
      tick(dt)
    })
  }

  return ee

  function iter(timestamp) {
    var dt = 0

    if(last > 0) {
      dt = timestamp - last
    }
    last = timestamp

    if(!ee.paused) {
      ee.emit('data', dt)
    }
    // Check paused status again in
    // case `pause()` was invoked by
    // one of the 'data' listeners
    if(!ee.paused) {
      raf(iter, el)
    }
  }
}
