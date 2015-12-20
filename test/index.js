'use strict';


var hg = require('mercury'),
    document = require('global/document'),
    Hammer = require('../index.js')

//require('touch-emulator')()


var appState = hg.state({
    currentEvent: hg.value('[]')
})


hg.app(document.body, appState, function (state) {
    return hg.h('div', {
        style: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute'
        },
        hammer: new Hammer({
            onTap: function (e) {console.log(e); appState.currentEvent.set('tap')},
            onDoubleTap: function (e) {console.log(e); appState.currentEvent.set('doubletap')},
            onPanStart: function (e) {console.log(e); appState.currentEvent.set('panstart')},
            onPan: function (e) {console.log(e); appState.currentEvent.set('pan')},
            onPanEnd: function (e) {console.log(e); appState.currentEvent.set('panend')},
            onSwipe: function (e) {console.log(e); appState.currentEvent.set('swipe')},
            onPress: function (e) {console.log(e); appState.currentEvent.set('doubletap')},
            onPressUp: function (e) {console.log(e); appState.currentEvent.set('pressup')},
            onPinch: function (e) {console.log(e); appState.currentEvent.set('pinch')},
            onPinchIn: function (e) {console.log(e); appState.currentEvent.set('pinchin')},
            onPinchOut: function (e) {console.log(e); appState.currentEvent.set('pinchout')},
            onRotate: function (e) {console.log(e); appState.currentEvent.set('rotate')}
        })
    }, [
        hg.h('h1', {
            style: {
                'text-align': 'center',
                'margin-top': 'auto',
                'margin-bottom': 'auto'
            }
        }, state.currentEvent)
    ])
})
