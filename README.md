# saga-reducer-factory
##### A utility for minimizing boilerplate in redux + redux-saga
It's important to have the BL layer as cohesive as possible. Therefore, I think it's better to
treat sagas and reducers as a single unit. This module helps us achieve that,
with reduced boilerplate.

# Installation
```shell
$ npm i -S saga-reducer-factory
```

# Usage

### Saga module
```javascript
import SagaReducerFactory from 'saga-reducer-factory';
import { actions, types } from '../actions/loginActions';
import { put } from 'redux-saga/effects';

let {handle, updateState, saga, reducer} = SagaReducerFactory({
    actionTypes: types,
    actionCreators: actions,
    initState: {}
});

handle(types.LOGIN, function*() {
    yield put(updateState({
        loggedIn: true
    }));
});

handle(types.LOGOUT, function*() {
    yield put(updateState({
        loggedIn: false
    }));
});

handle(types.RESUME, function*() {
    yield put(updateState({
        loggedIn: true
    }));
});

export default {saga, reducer};
```

### Actions module
```javascript
import {ActionCreatorHelper} from 'saga-reducer-factory';

const actionsList = [
    'LOGIN',
    'LOGOUT',
    'RESUME'
];

export const types = ActionCreatorHelper.createTypes(actionsList, 'SESSION_');
export const actions = ActionCreatorHelper.createActions(actionsList, 'SESSION_');
```

# Explanation
1. updateState creates an action that updates the reducer.
2. ActionCreatorHelper is a utility for creating actions from plain strings, by
utilizing redux-actions.
