import React, { useState } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import { ActivityIndicator, Portal, Toast } from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { loginRequest } from '@/store/actions/login';
import { useAsyncEffect } from '@/utils/hooks';
import { request } from '@/utils/requests';
import { login, LoginParam } from '@/services/login';
import { getCurrentUser } from '@/services/user';
import { sync } from '@/services/update';
import { Page, Modal } from '@/components';
import Login from './Login';
import Navigator from './Navigator';

interface Props {
  user: User;
  setUser: (...args: ArgsType<typeof loginRequest>) => void;
}

function Launch(props: Props) {
  const { user, setUser } = props;

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState('');

  const launch = async (token: string) => {
    request.defaults.headers.common['Authorization'] = token;

    const user = await getCurrentUser();

    const deploymentKey = {
      ios: 'VJBPHmQio11msdBGC2XVPtLWJDVW4ksvOXqog',
      android: 'AEwVZMajazeUPga2JphhqYqnaswk4ksvOXqog'
    };

    const flag = await sync(Platform.select(deploymentKey) as string, 2000, ({ totalBytes, receivedBytes }) => {
      setProgress(((receivedBytes / totalBytes) * 100).toFixed(0) + '%');
    });

    if (flag === 0) {
      await new Promise((res, rej) => {
        setUser({
          user,
          cb: err => {
            if (err) {
              rej(err);
            } else {
              res();
            }
          }
        });
      });
    } else if (flag === 1) {
    }
  };

  const submit = async (data: LoginParam) => {
    const key = Toast.loading('请稍等', 0, undefined, true);

    try {
      const token = await login(data);

      await AsyncStorage.setItem('token', token);

      await launch(token);
    } catch (err) {
      Modal.error('提示', err.message);
    }

    Portal.remove(key);
  };

  useAsyncEffect(async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token !== null) {
        await launch(token);
      }
    } catch (err) {
      Modal.error('提示', err.message);
    }

    setLoading(false);
  }, []);

  return loading ? (
    <Page style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' text={progress ? `更新：${progress}` : undefined} />
    </Page>
  ) : user.id ? (
    <Navigator />
  ) : (
    <Login onSubmit={submit} />
  );
}

export default connect(
  (state: ReduxState) => ({
    user: state.user
  }),
  { setUser: loginRequest }
)(Launch);
