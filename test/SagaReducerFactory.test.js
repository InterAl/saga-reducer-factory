import SagaReducerFactory from '../src/SagaReducerFactory';
import {createTypes, createActions} from '../src/ActionCreatorHelper';
import {assert} from 'chai';

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
    });
});
