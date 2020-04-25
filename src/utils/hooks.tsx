import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';

import store, { persistor } from '@/store';
import Modal from '@/components/Modal';
import { useSelector } from 'react-redux';

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => {
        savedCallback.current();
      }, delay);

      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useAsyncEffect(cb: (flag: { cancelled: boolean }) => Promise<any>, deps: any[] = []) {
  useEffect(() => {
    const flag = { cancelled: false };

    cb(flag);

    return () => {
      flag.cancelled = true;
    };
  }, deps);
}

export function usePersistAlert(key: keyof ReduxState, check: (state: any) => boolean, ok: (state: any) => void) {
  useEffect(() => {
    const state = store.getState();

    const persisted = state[key];
    const persistedAt = state._persistedAt;

    const isFresh = (time: number) => {
      return Date.now() - time <= 8 * 3600 * 1000;
    };

    if ((persistedAt[key as string] === undefined || isFresh(persistedAt[key as string])) && check(persisted)) {
      Modal.alert('提示', '有未完成单据，是否前往', [
        {
          text: '取消'
        },
        {
          text: '确定',
          onPress: () => {
            ok(persisted);
          }
        }
      ]);
    }
  }, []);
}

export function usePersistPause(key: keyof ReduxState, setState: (state: any) => void) {
  const persisted = useSelector<ReduxState>(state => state[key]);

  useEffect(() => {
    persistor.pause();

    return () => {
      setState(persisted);

      persistor.persist();
    };
  }, []);
}

export function useBackHandler(callback?: () => any) {
  const flag = useRef(false);

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (callback) {
        callback();
      }

      return flag.current;
    });

    return () => {
      listener.remove();
    };
  }, []);

  return flag;
}

export function useCancel() {
  const ref = useRef<null | ((err?: Error) => void)>(null);

  const createError = (msg?: string) => {
    const err = new Error(msg);

    Object.assign(err, {
      __cancel__: true
    });

    return err;
  };

  const wait = function <T>(promise: Promise<T>) {
    return Promise.race([
      promise,
      new Promise((res, rej) => {
        ref.current = rej;
      })
    ]) as Promise<T>;
  };

  const isCancel = (err: Error) => {
    if (err.hasOwnProperty('__cancel__')) {
      return true;
    } else {
      return false;
    }
  };

  const cancel = (msg?: string) => {
    if (ref.current) {
      ref.current(createError(msg));
    }
  };

  useEffect(() => {
    return cancel;
  }, []);

  return {
    cancel,
    isCancel,
    wait
  };
}
