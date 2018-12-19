import { select, put, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { STORAGE_KEY } from '../../../const';
import { storageSaveSuccess, storageSaveFailure } from '../actions';

const getData = state => ({
  recipeList: state.recipes.list,
  itemList: state.items.list,
});

export default function* storageSave() {
  const data = yield select(getData);
  try {
    const jsonData = yield call([JSON, 'stringify'], data);
    yield call([AsyncStorage, 'setItem'], STORAGE_KEY, jsonData);
    yield put(storageSaveSuccess());
  } catch (error) {
    yield put(storageSaveFailure(error));
  }
}