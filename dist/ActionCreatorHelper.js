'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createActions = exports.createTypes = undefined;

var _reduxActions = require('redux-actions');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Expect a string in the form of 'ONE_TWO_THREE' and return 'oneTwoThree'
var camelize = function camelize(str) {
    return str.toLowerCase().replace(/_\w/g, function (cap) {
        return cap[1].toUpperCase();
    });
};

// Expect an array of strings and return { ONE : 'ONE', TWO : 'TWO', THREE : 'THREE' }
var createTypes = exports.createTypes = function createTypes(strings, prefix) {
    return strings.reduce(function (rc, str) {
        var actionStr = null;
        prefix = prefix || '';

        if (typeof str === 'string') {
            actionStr = str;
        } else {
            actionStr = str.type;
        }

        rc[actionStr] = prefix + actionStr;
        return rc;
    }, { 'UPDATE_STATE': (prefix || '') + 'UPDATE_STATE' });
};

// Expect an array of strings and return { oneTwoThree : <action>, fourFiveSix : <action> }
var createActions = exports.createActions = function createActions(strings, prefix) {
    return strings.reduce(function (rc, str) {
        var actionStr = null;
        var actionPropTypes = null;
        prefix = prefix || '';

        if (typeof str === 'string') {
            actionStr = str;
            actionPropTypes = null;
        } else {
            actionStr = str.type;
            actionPropTypes = str.propTypes;
        }

        var action = (0, _reduxActions.createAction)(prefix + actionStr);

        rc[camelize(actionStr)] = function (payload) {
            if (actionPropTypes) {

                _lodash2.default.each(payload, function (value, key) {
                    if (!actionPropTypes[key]) {
                        var result = 'Passed parameter ' + key + ' in ' + (prefix + actionStr) + ' is not defined in PropTypes!';

                        if (typeof window !== 'undefined' && window.spiceProduction) {
                            console.warn(result);
                        } else {
                            throw new Error(result);
                        }
                    }
                });
            }
            return action(payload);
        };
        return rc;
    }, { 'updateState': (0, _reduxActions.createAction)((prefix || '') + 'UPDATE_STATE') });
};