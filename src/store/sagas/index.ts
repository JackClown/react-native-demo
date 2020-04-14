import { all } from 'redux-saga/effects';

import loginFlow from './login';

export default function* rootSaga() {
  yield all([loginFlow()]);
}
