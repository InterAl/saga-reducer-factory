import SagaReducerFactory from '../src/SagaReducerFactory';
import {createTypes, createActions} from '../src/ActionCreatorHelper';
import {assert} from 'chai';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

describe('SagaReducerFactory', () => {
    describe('update state action', () => {
        it('with prefix', () => {
            const actionTypes = createTypes(['foo', 'bar'], 'PREFIX_');
            const actionCreators = createActions(['foo', 'bar'], 'PREFIX_');

            const {updateState} = SagaReducerFactory({
                actionTypes,
                actionCreators
            });

            assert.deepEqual(updateState({one: 'two'}), {
                type: 'PREFIX_UPDATE_STATE',
                payload: {
                    state: {
                        one: 'two'
                    }
                }
            });
        });

        it('without prefix', () => {
            const actionTypes = createTypes(['foo', 'bar']);
            const actionCreators = createActions(['foo', 'bar']);

            const {updateState} = SagaReducerFactory({
                actionTypes,
                actionCreators
            });

            const updateStateAction = updateState({one: 'two'});
            assert.match(updateStateAction.type, /^0\.\d+_UPDATE_STATE/);
            assert.deepEqual(updateStateAction.payload, {
                state: {
                    one: 'two'
                }
            })
        });

        it('no collision between 2 unprefixed reducers', () => {
            //Given
            const actionTypes = createTypes(['foo', 'bar']);
            const actionCreators = createActions(['foo', 'bar']);

            const {updateState: updateState1, reducer: reducer1} = SagaReducerFactory({
                actionTypes,
                actionCreators
            });

            const {updateState: updateState2, reducer: reducer2} = SagaReducerFactory({
                actionTypes,
                actionCreators
            });

            //When
            const reducer1Result1 = reducer1(undefined, updateState1({
                foo: 'bar'
            }));

            const reducer1Result2 = reducer1(reducer1Result1, updateState2({
                foo: 'baz'
            }));

            //Then
            assert.deepEqual(reducer1Result2, {
                foo: 'bar'
            });
        });
    });

    it('can initialize without params - using only the returned saga', () => {
        const {saga} = SagaReducerFactory();
        assert(typeof saga === 'function', 'the returned saga was not a function');
    });

    it('handle action', () => {
        //Given
        const actionTypes = createTypes(['foo']);
        const actionCreators = createActions(['foo']);

        const {handle, saga} = SagaReducerFactory({
            actionTypes,
            actionCreators
        });

        //When
        let called = 0;

        handle('*', function*() {
            called++;
        });

        //Then
        const store = runSaga(saga);

        store.dispatch({
            type: 'foo'
        });

        store.dispatch({
            type: 'foo'
        });

        assert.equal(called, 2);
    });

    //sigh
    it('handle handles unhandled exceptions', () => {
        //Given
        const actionTypes = createTypes(['foo']);
        const actionCreators = createActions(['foo']);

        const {handle, saga} = SagaReducerFactory({
            actionTypes,
            actionCreators
        });

        //When
        let called = 0;

        handle('*', function*() {
            called++;
            throw 'error';
        });

        //Then
        const store = runSaga(saga);

        store.dispatch({
            type: 'foo'
        });

        store.dispatch({
            type: 'foo'
        });

        assert.equal(called, 2);
    });

    it('handleOnce', () => {
        //Given
        const actionTypes = createTypes(['foo']);
        const actionCreators = createActions(['foo']);

        const {handleOnce, saga} = SagaReducerFactory({
            actionTypes,
            actionCreators
        });

        //When
        let called = 0;

        handleOnce('*', function*() {
            called++;
        });

        //Then
        const store = runSaga(saga);

        store.dispatch({
            type: 'foo'
        });

        store.dispatch({
            type: 'foo'
        });

        assert.equal(called, 1);
    });

    function runSaga(saga) {
        const sagaMiddleware = createSagaMiddleware();

        const store = createStore(() => ({}), null,
          applyMiddleware(
              sagaMiddleware
          ));

        sagaMiddleware.run(saga);

        return store;
    }
});
