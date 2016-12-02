import SagaForker from './SagaForker';

export default ({actionTypes, actionCreators, initState = {}}) => {
    const {handle, handleOnce, forkWatchers} = SagaForker();

    function reducer(state = initState, action) {
        switch (action.type) {
            case actionTypes.UPDATE_STATE:
                return {...state, ...action.payload.state};
                break;
            default:
                return state;
        }
    }

    function updateState(newState) {
        return actionCreators.updateState({
            state: {
                ...newState
            }
        });
    }

    return {
        handle,
        handleOnce,
        saga: forkWatchers,
        reducer,
        updateState
    };
};
