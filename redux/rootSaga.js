import { call, takeEvery, fork } from 'redux-saga/effects';
import { storageSaga } from './storage';

function* log(action) {
  yield call([console, 'log'], action);
}

export default function* () {
  yield takeEvery('*', log);
  yield fork(storageSaga);
}