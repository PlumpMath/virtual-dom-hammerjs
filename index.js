'use strict';

var Hammer = typeof window === 'undefined' ? undefined : require('hammerjs')


function HammerHook(options) {
    this.options = options
}


HammerHook.OPTS = Hammer


HammerHook.prototype.hook = function (node, propertyName, previousValue) {
    this.hammer = new Hammer(node)
    this.taps = {}

    if (this.options.manager) {
        Object.keys(this.options.manager).forEach(function (option) {
            if (option === 'recognizers') {
                Object.keys(this.options.manager.recognizers).forEach(function (name) {
                    var gesture = this.options.manager.recognizers[name]

                    // If this is an existing, in-built recognizer, we will
                    // update its properties. If not, we will create a new one.
                    var recognizer = this.hammer.get(name)
                    if (recognizer === null) {
                        gesture.options.event = name
                        recognizer = new Hammer[gesture.type](gesture.options)
                        this.hammer.add(recognizer)
                    }
                    else {
                        // Update recognizer properties.
                        recognizer.set(gesture.options || {});
                    }
                    if (gesture.recognizeWith) {
                        gesture.recognizeWith.forEach(function (recWith) {
                            recognizer.recognizeWith(recWith)
                        })
                    }
                    if (gesture.requireFailure) {
                        gesture.requireFailure.forEach(function (rf) {
                            var recObj = this.hammer.get(rf)
                            recognizer.requireFailure(recObj)
                        }, this)
                    }
                }, this)
            } else {
                var key = option
                var optionObj = {}
                optionObj[key] = this.options.manager[option]
                this.hammer.set(optionObj)
            }
        }, this)
    }

    Object.keys(this.options.events).forEach(function (name) {
        this.hammer.off(name)
        this.hammer.on(name, this.options.events[name])
    }, this)
}


HammerHook.prototype.unhook = function (node) {
    this.hammer.stop()
    this.hammer.destroy()
}


module.exports = HammerHook
