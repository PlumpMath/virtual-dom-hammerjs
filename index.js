'use strict';

var Hammer = require('hammerjs')


var handlerToEvent = {
    action: 'tap press',
    onTap: 'tap',
    onDoubleTap: 'doubletap',
    onPanStart: 'panstart',
    onPan: 'pan',
    onPanEnd: 'panend',
    onSwipe: 'swipe',
    onPress: 'press',
    onPressUp: 'pressup',
    onPinch: 'pinch',
    onPinchIn: 'pinchin',
    onPinchOut: 'pinchout',
    onRotate: 'rotate'
}


function HammerWidget(options) {
    this.options = options
}


HammerWidget.prototype.hook = function (node) {
    this.hammer = new Hammer(node)
    if (this.options.vertical) {
        this.hammer.get('pan').set({direction: Hammer.DIRECTION_ALL})
        this.hammer.get('swipe').set({direction: Hammer.DIRECTION_ALL})
    } else {
        this.hammer.get('pan').set({direction: Hammer.DIRECTION_HORIZONTAL})
        this.hammer.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL})
    }

    if (this.options.options) {
        Object.keys(this.options.options).forEach(function (option) {
            if (option === 'recognizers') {
                Object.keys(this.options.options.recognizers).forEach(function (gesture) {
                    var recognizer = this.hammer.get(gesture)
                    recognizer.set(this.options.options.recognizers[gesture])
                }, this)
            } else {
                var key = option
                var optionObj = {}
                optionObj[key] = this.options.options[option]
                this.hammer.set(optionObj)
            }
        }, this)
    }

    Object.keys(this.options).forEach(function (p) {
        var e = handlerToEvent[p]
        if (e) {
            this.hammer.off(e)
            this.hammer.on(e, this.options[p])
        }
    }, this)
}


HammerWidget.prototype.unhook = function (node) {
    this.hammer.stop()
    this.hammer.destroy()
}


module.exports = HammerWidget
