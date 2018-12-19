import { select, put, takeEvery } from 'redux-saga/effects';
import { STORAGE_LOAD, STORAGE_SAVE } from './actions';
import { storageLoad, storageSave } from './watchers';

export default function* storageSaga() {
  yield takeEvery(STORAGE_LOAD, storageLoad);
  yield takeEvery(STORAGE_SAVE, storageSave);
}