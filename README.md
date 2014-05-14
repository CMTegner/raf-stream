# raf-stream

[![browser support](http://ci.testling.com/CMTegner/raf-stream.png)](http://ci.testling.com/CMTegner/raf-stream)
[![Build Status](https://travis-ci.org/CMTegner/raf-stream.svg)](https://travis-ci.org/CMTegner/raf-stream)

requestAnimationFrame event emitter for browserify.

```javascript
var raf = require('raf')
  , canvas = document.getElementById('opengl')

raf(canvas)
  .on('data', function(dt) {
    console.log('difference in time is '+dt+'ms')
  })
```

# API

```js
var raf = require('raf-stream')
```

## var ee = raf([optional element], [optional tick function])

Returns an event emitter that immediately starts emitting 'data'
events representing animation frames for a given element (or for the entire
window, if no element is passed).

If you pass a function as the first or second argument it will get called on every tick. this is a convenience method for
the example above that binds to the `data` event, e.g. `raf().on('data', tickFunction)` is the same as `raf(tickFunction)`
or `raf(el, tickFunction)`.

## ee.pause() / ee.resume()

Pauses or resumes the events coming out of `ee`.

The `dt` on the next event after a resume will represent the difference between
the last rendered frame and the newest frame.

# license

MIT

