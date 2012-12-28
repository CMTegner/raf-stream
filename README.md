# raf

reqeustAnimationFrame polyfill for browserify.

```javascript
var raf = require('raf')
  , canvas = document.getElementById('opengl')

raf(canvas)
  .on('data', function(dt) {
    console.log('difference in time is '+dt+'ms')
  })


```

# API

## raf(element) -> event emitter

returns a event emitter that immediately starts emitting 'data'
events representing animation frames for a given element.

## ee.pause() / ee.resume()

pauses or resumes the events coming out of `ee`.

the `dt` on the next event after a resume will represent the difference between
the last rendered frame and the newest frame.

# license

MIT