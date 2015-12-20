'use strict';


var hg = require('mercury'),
    document = require('global/document'),
    Hammer = require('../index.js')

//require('touch-emulator')()


var appState = hg.state({
    eventLog: hg.array([])
})


function handleEvent(event) {
    appState.eventLog.push(event.type)
}


hg.app(document.body, appState, function (state) {
    return hg.h('div', [
        hg.h('div', {
            style: {
                'background': 'silver',
                'height': '300px',
                'text-align': 'center',
                'font': '30px/300px Helvetica, Arial, sans-serif'
            },
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
                vertical: true,
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
        }),
        hg.h('ul',
            state.eventLog.reverse().map(function (event) {
                return hg.h('li', event)
            })
        )
    ])
})
