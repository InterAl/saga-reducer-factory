import { fork, take } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';

export default () => {
    let watchers = [];

    function handle(type, handler) {
        watchers.push(function* watcher(sagaParams) {
            yield* takeEvery(type, function*(action) {
                try {
                    yield handler(sagaParams, action);
                } catch (err) {
                    console.error('unhandled saga exception', err);
                }
            });
        });
    }

    function handleOnce(type, handler) {
        watchers.push(function* watcher(sagaParams) {
            let action = yield take(type);
            yield handler(sagaParams, action);
        });
    }

    function handleAll(types, handler) {
        watchers.push(function* watcher(sagaParams) {
            while (true) {
                const done = {};

                while (Object.keys(done).length < types.length) {
                    const action = yield take(types);
                    done[action.type] = action;
                }

                try {
                    const args = types.map(t => done[t]);
                    yield handler(sagaParams, args);
                } catch (err) {
                    console.error('unhandled saga exception', err);
                }
            }
        });
    }

    function* forkWatchers(sagaParams) {
        yield watchers.map(watcher => fork(watcher.bind(null, sagaParams)));
    }

    return {
        handle,
        handleAll,
        handleOnce,
        forkWatchers
    };
};
