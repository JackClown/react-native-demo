import { combineReducers } from 'redux';
import { persistReducer, PAUSE, PERSIST } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import { LOGOUT } from '../actions/login';
import user from './user';

const reducers = combineReducers({
  user,
  _persistedAt: (state: { [key: string]: number } = {}) => state
});

const keys: string[] = [];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['_persistedAt', ...keys],
  stateReconciler: autoMergeLevel2
};

let prevState: any = undefined;
let paused: boolean = false;

const rootReducer = (...args: ArgsType<typeof reducers>) => {
  let [state, action] = args;

  if (action.type === LOGOUT) {
    state = undefined;
  } else if (action.type === PAUSE) {
    paused = true;
  } else if (action.type === PERSIST) {
    paused = false;
  }

  const nextState = reducers(state, action);

  if (prevState !== nextState) {
    if (!paused && state !== undefined && prevState !== undefined && state.user.id) {
      let staled = false;
      let persistedAt = { ...nextState._persistedAt };

      keys.forEach(key => {
        if (prevState[key] !== (nextState as any)[key]) {
          persistedAt[key] = Date.now();
          staled = true;
        }
      });

      if (staled) {
        nextState._persistedAt = persistedAt;
      }
    }

    prevState = nextState;
  }

  return nextState;
};

export default persistReducer(persistConfig, rootReducer);
