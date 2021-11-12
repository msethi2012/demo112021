import { fork, all } from 'redux-saga/effects';
import headerSaga from '../views/layout/header/saga'

export default function* rootSaga() {
    yield all([
        fork(headerSaga),
    ]);
}