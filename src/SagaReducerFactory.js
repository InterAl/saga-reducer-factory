import SagaForker from './SagaForker';

export default ({actionTypes = {}, actionCreators = {}, initState = {}} = {}) => {
    const {handle, handleOnce, handleAll, forkWatchers} = SagaForker();

    let updateStateActionType = actionTypes.UPDATE_STATE;
    let updateStateAction = actionCreators.updateState;

    if (actionCreators.updateState &&
        actionCreators.updateState().type === 'UPDATE_STATE' ||
        actionTypes.UPDATE_STATE === 'UPDATE_STATE') {
        updateStateActionType =  `${autoPrefix()}_UPDATE_STATE`;
        updateStateAction = (...args) => ({
            ...actionCreators.updateState(...args),
            type: updateStateActionType
        });
    }

    function autoPrefix() {
        return Math.random().toString();
    }

    function reducer(state = initState, action) {
        switch (action.type) {
            case updateStateActionType:
                return {...state, ...action.payload.state};
                break;
            default:
                return state;
        }
    }

    function updateState(newState) {
        return updateStateAction({
            state: {
                ...newState
            }
        });
    }

    return {
        handle,
        handleOnce,
        handleAll,
        saga: forkWatchers,
        reducer,
        updateState
    };
};
