import { call, takeEvery } from 'redux-saga/effects';

function* log(action) {
  yield call([console, 'log'], action);
}

export default function* () {
  yield takeEvery('*', log);
}