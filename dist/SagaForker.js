'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _effects = require('redux-saga/effects');

var _reduxSaga = require('redux-saga');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _marked = [forkWatchers].map(_regenerator2.default.mark);

    var watchers = [];

    function handle(type, handler) {
        watchers.push(_regenerator2.default.mark(function watcher(sagaParams) {
            return _regenerator2.default.wrap(function watcher$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.delegateYield((0, _reduxSaga.takeEvery)(type, handler.bind(null, sagaParams)), 't0', 1);

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, watcher, this);
        }));
    }

    function handleOnce(type, handler) {
        watchers.push(_regenerator2.default.mark(function watcher(sagaParams) {
            var action;
            return _regenerator2.default.wrap(function watcher$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _effects.take)();

                        case 2:
                            action = _context2.sent;
                            _context2.next = 5;
                            return handler(sagaParams, action);

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, watcher, this);
        }));
    }

    function forkWatchers(sagaParams) {
        return _regenerator2.default.wrap(function forkWatchers$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return watchers.map(function (watcher) {
                            return (0, _effects.fork)(watcher.bind(null, sagaParams));
                        });

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _marked[0], this);
    }

    return {
        handle: handle,
        handleOnce: handleOnce,
        forkWatchers: forkWatchers
    };
};