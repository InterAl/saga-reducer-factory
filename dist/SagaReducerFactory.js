'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _SagaForker2 = require('./SagaForker');

var _SagaForker3 = _interopRequireDefault(_SagaForker2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$actionTypes = _ref.actionTypes,
        actionTypes = _ref$actionTypes === undefined ? {} : _ref$actionTypes,
        _ref$actionCreators = _ref.actionCreators,
        actionCreators = _ref$actionCreators === undefined ? {} : _ref$actionCreators,
        _ref$initState = _ref.initState,
        initState = _ref$initState === undefined ? {} : _ref$initState;

    var _SagaForker = (0, _SagaForker3.default)(),
        handle = _SagaForker.handle,
        handleOnce = _SagaForker.handleOnce,
        handleAll = _SagaForker.handleAll,
        forkWatchers = _SagaForker.forkWatchers;

    var updateStateActionType = actionTypes.UPDATE_STATE;
    var updateStateAction = actionCreators.updateState;

    if (actionCreators.updateState && actionCreators.updateState().type === 'UPDATE_STATE' || actionTypes.UPDATE_STATE === 'UPDATE_STATE') {
        updateStateActionType = autoPrefix() + '_UPDATE_STATE';
        updateStateAction = function updateStateAction() {
            return (0, _extends3.default)({}, actionCreators.updateState.apply(actionCreators, arguments), {
                type: updateStateActionType
            });
        };
    }

    function autoPrefix() {
        return Math.random().toString();
    }

    function reducer() {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
        var action = arguments[1];

        switch (action.type) {
            case updateStateActionType:
                return (0, _extends3.default)({}, state, action.payload.state);
                break;
            default:
                return state;
        }
    }

    function updateState(newState) {
        return updateStateAction({
            state: (0, _extends3.default)({}, newState)
        });
    }

    return {
        handle: handle,
        handleOnce: handleOnce,
        handleAll: handleAll,
        saga: forkWatchers,
        reducer: reducer,
        updateState: updateState
    };
};