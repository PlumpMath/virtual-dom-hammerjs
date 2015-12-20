'use strict';

var Hammer = typeof window === 'undefined' ? undefined : require('hammerjs')


function HammerWidget(options) {
    this.options = options
}


HammerWidget.OPTS = Hammer


HammerWidget.prototype.hook = function (node) {
    this.hammer = new Hammer(node)

    if (this.options.manager) {
        Object.keys(this.options.manager).forEach(function (option) {
            if (option === 'recognizers') {
                Object.keys(this.options.manager.recognizers).forEach(function (name) {
                    var recognizer = this.hammer.get(name)
                    var gesture = this.options.manager.recognizers[name]
                    recognizer.set(gesture.options || {});
                    if (gesture.recognizeWith) {
                        gesture.recognizeWith.forEach(function (recWith) {
                            recognizer.recognizeWith(recWith)
                        })
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


HammerWidget.prototype.unhook = function (node) {
    this.hammer.stop()
    this.hammer.destroy()
}


module.exports = HammerWidget
