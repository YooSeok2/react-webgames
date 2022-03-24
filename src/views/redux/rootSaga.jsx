import {takeLatest, put, delay} from 'redux-saga/effects';
import {INCRESED} from './Redux';

function* incrementVal () {
    yield delay(1000);
    yield put({type: INCRESED});
}

function* delayIncrement () {
    yield takeLatest('DELAY_INCREMENT', incrementVal);
}

export default function* rootSaga () {
    yield delayIncrement()
}