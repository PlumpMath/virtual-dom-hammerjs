# virtual-dom-hammerjs

A simple [virtual-dom widget](https://github.com/Matt-Esch/virtual-dom/blob/master/docs/widget.md)
that wraps [Hammer.js](http://hammerjs.github.io/) events to the virtual-dom.
The general idea comes from [react-hammerjs](https://github.com/JedWatson/react-hammerjs),
but this implementation supports all events and the complete
[Hammer.js](http://hammerjs.github.io/) feature set with a declarative api.

## Usage

The `manager` property may be used to configure the Hammer manager. These
properties will be merged with the default ones.

In addition, the actual `Hammer.js` object is exposed as `Hammer.OPTS`, from
which one may access constants.

```javascript
var Hammer = require('virtual-dom-hammerjs')
var h = require('virtual-dom/h')


function render(count)  {
    return h('div', {
        hammer: new Hammer({
            events: {
                tripletap: handleEvent,

                pan: handleEvent,
                panstart: handleEvent,
                panmove: handleEvent,
                panend: handleEvent,
                pancancel: handleEvent,
                panleft: handleEvent,
                panright: handleEvent,
                panup: handleEvent,
                pandown: handleEvent,
                pinch: handleEvent,
                pinchstart: handleEvent,
                pinchmove: handleEvent,
                pinchend: handleEvent,
                pinchcancel: handleEvent,
                pinchin: handleEvent,
                pinchout: handleEvent,
                press: handleEvent,
                pressup: handleEvent,
                rotate: handleEvent,
                rotatestart: handleEvent,
                rotatemove: handleEvent,
                rotateend: handleEvent,
                rotatecancel: handleEvent,
                swipe: handleEvent,
                swipeleft: handleEvent,
                swiperight: handleEvent,
                swipeup: handleEvent,
                swipedown: handleEvent,
                tap: handleEvent
            },
            manager: {
                touchAction: 'compute',
                recognizers: {
                    // Custom recognizers:
                    tripletap: {
                        type: 'Tap',
                        options: {
                            taps: 3
                        },
                        recognizeWith: ['tap']
                    },
                    panh: {
                        type: 'Pan',
                        options: {
                            direction: Hammer.DIRECTION_HORIZONTAL
                        }
                    },
                    panv: {
                        type: 'Pan',
                        options: {
                            direction: Hammer.DIRECTION_VERTICAL
                        },
                        requireFailure: ['panh']
                    },

                    // The following recognizers update the default ones:
                    pan: {
                        options: {
                            enable: true
                        }
                    },
                    pinch: {
                        options: {
                            enable: true
                        },
                        recognizeWith: ['rotate']
                    },
                    rotate: {
                        options: {
                            enable: true
                        }
                    },
                    swipe: {
                        options: {
                            enable: true,
                            pointers: 1,
                            threshold: 10,
                            direction: Hammer.OPTS.DIRECTION_ALL,
                            velocity: 0.65
                        },
                        recognizeWith: ['pan']
                    },
                    tap: {
                        options: {
                            enable: false,
                            time: 600,
                            threshold: 100
                        }
                    }
                }
            }
        })
    }, 'Touch Me')
}
```
