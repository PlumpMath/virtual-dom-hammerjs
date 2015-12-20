# virtual-dom-hammerjs

A simple [virtual-dom widget](https://github.com/Matt-Esch/virtual-dom/blob/master/docs/widget.md)
that wraps [hammer.js](http://hammerjs.github.io/) events to the virtual-dom.
The general idea comes from [react-hammerjs](https://github.com/JedWatson/react-hammerjs).

## Usage

The `manager` property may be used to configure the Hammer manager. These
properties will be merged with the default ones.

In addition, the actual `Hammer.js` object is exposed as `Hammer.OPTS`, from
which one may access constants.

[`requireFailure`](http://hammerjs.github.io/require-failure/) is not
supported.

```javascript
var Hammer = require('virtual-dom-hammerjs')
var h = require('virtual-dom/h')


function render(count)  {
    return h('div', {
        hammer: new Hammer({
            events: {
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
                    pan: {
                        options: {
                            enable: false
                        },
                        recognizeWith: ['swipe']
                    },
                    pinch: {
                        options: {
                            enable: true
                        },
                        recognizeWith: ['rotate']
                    },
                    press: {},
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
