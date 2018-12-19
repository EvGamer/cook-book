import { put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { STORAGE_KEY } from '../../../const';
import { storageLoadSuccess, storageLoadFailure } from '../actions';

export default function* storageLoad() {
  try {
    const jsonData = yield call([AsyncStorage, 'getItem'], STORAGE_KEY);
    if (jsonData) {
      const data = yield call([JSON, 'parse'], jsonData);
      yield put(storageLoadSuccess(data));
    } else {
      yield put(storageLoadFailure({ message: 'No data' }));
    }
  } catch (error) {
    yield put(storageLoadFailure(error));
  }
}