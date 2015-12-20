# virtual-dom-hammerjs

A simple [virtual-dom widget](https://github.com/Matt-Esch/virtual-dom/blob/master/docs/widget.md)
that wraps [hammer.js](http://hammerjs.github.io/) events to the virtual-dom.
The general idea comes from [react-hammerjs](https://github.com/JedWatson/react-hammerjs).

## Usage

The options property may be used to configure the Hammer manager. These
properties will be merged with the default ones.

With `vertical: true`, the pan and swipe events will support vertical gestures.

The action handler behaves like the onTap event handler, but will also be fired
onPress.

```javascript
var Hammer = require('virtual-dom-hammerjs')
var h = require('virtual-dom/h')


function render(count)  {
    return h('div', {
        hammer: new Hammer({
            action: console.log,
            onTap: console.log,
            onDoubleTap: console.log,
            onPanStart: console.log,
            onPan: console.log,
            onPanEnd: console.log,
            onSwipe: console.log,
            onPress: console.log,
            onPressUp: console.log,
            onPinch: console.log,
            onPinchIn: console.log,
            onPinchOut: console.log,
            onRotate: console.log,
            vertical: true,
            options: {
                touchAction: true,
                recognizers: {
                    tap: {
                        time: 600,
                        threshold: 100
                    }
                }
        })
    }, 'Touch Me')
}
```
