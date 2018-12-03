import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer, rootSaga } from './';

export default function () {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    {},
    applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
