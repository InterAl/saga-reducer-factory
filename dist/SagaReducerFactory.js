'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _SagaForker2 = require('./SagaForker');

var _SagaForker3 = _interopRequireDefault(_SagaForker2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var actionTypes = _ref.actionTypes,
        actionCreators = _ref.actionCreators,
        _ref$initState = _ref.initState,
        initState = _ref$initState === undefined ? {} : _ref$initState;

    var _SagaForker = (0, _SagaForker3.default)(),
        handle = _SagaForker.handle,
        handleOnce = _SagaForker.handleOnce,
        forkWatchers = _SagaForker.forkWatchers;

    function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
        var action = arguments[1];

        switch (action.type) {
            case actionTypes.UPDATE_STATE:
                return (0, _extends3.default)({}, state, action.payload.state);
                break;
            default:
                return state;
        }
    }

    function updateState(newState) {
        return actionCreators.updateState({
            state: (0, _extends3.default)({}, newState)
        });
    }

    return {
        handle: handle,
        handleOnce: handleOnce,
        saga: forkWatchers,
        reducer: reducer,
        updateState: updateState
    };
};