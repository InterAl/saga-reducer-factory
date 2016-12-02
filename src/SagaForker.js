import { fork, take } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';

export default () => {
    let watchers = [];

    function handle(type, handler) {
        watchers.push(function* watcher(sagaParams) {
            yield* takeEvery(type, handler.bind(null, sagaParams));
        });
    }

    function handleOnce(type, handler) {
        watchers.push(function* watcher(sagaParams) {
            let action = yield take();
            yield handler(sagaParams, action);
        });
    }

    function* forkWatchers(sagaParams) {
        yield watchers.map(watcher => fork(watcher.bind(null, sagaParams)));
    }

    return {
        handle,
        handleOnce,
        forkWatchers
    };
};
