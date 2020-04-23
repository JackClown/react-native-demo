import { put, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { pullAll } from 'lodash';

import * as actions from '../actions/login';
import AnalyticsUtil from '@/utils/AnalyticsUtil';

const USER_ID = 'USER_ID';

function* login(action: { type: string; payload: { user: User; cb: (err?: Error) => void } }) {
  const {
    payload: { user, cb }
  } = action;

  const userID = yield AsyncStorage.getItem(USER_ID);

  try {
    if (user.id !== userID) {
      yield clear('token', USER_ID);

      AnalyticsUtil.profileSignOff();
    }

    yield put(actions.login(user));

    yield AsyncStorage.setItem(USER_ID, user.id);

    AnalyticsUtil.profileSignInWithPUID(user.id);

    cb();
  } catch (err) {
    cb(err);
  }
}

/**
 * 清空本地数据
 * @param withoutKeys 不需要清除的key
 */
async function clear(...withoutKeys: string[]) {
  try {
    const keys = await AsyncStorage.getAllKeys();

    if (withoutKeys.length > 0) {
      pullAll(keys, withoutKeys);
    }

    await AsyncStorage.multiRemove(keys);
  } catch (err) {
    console.log(err);
  }
}

function* logout() {
  AnalyticsUtil.profileSignOff();

  yield clear();
  yield put(actions.logout());
}

export default function* loginFlow() {
  yield takeEvery(actions.LOGIN_REQUEST, login);
  yield takeEvery(actions.LOGOUT_REQUEST, logout);
}
