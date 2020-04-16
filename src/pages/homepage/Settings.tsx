import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationProp } from '@react-navigation/native';

import { whitespace_lg } from '@/config/theme';
import { ParamList } from '@/config/routes';
import { logoutRequest } from '@/store/actions/login';
import { scaleSize } from '@/utils/scale';
import { Modal, Page, Button, Header } from '@/components';

interface Props {
  navigation: NavigationProp<ParamList>;
  user: User;
  logoutRequest: () => void;
}

function Settings(props: Props) {
  const { logoutRequest } = props;

  const handleLogout = () => {
    Modal.alert('提示', '登出将会清空所有数据', [
      { text: '取消' },
      {
        text: '确定',
        onPress: logoutRequest
      }
    ]);
  };

  return (
    <Page>
      <Header title='设置' />
      <ScrollView>
        <View style={styles.logout}>
          <Button onPress={handleLogout} type='primary' shadow>
            退出登录
          </Button>
        </View>
      </ScrollView>
    </Page>
  );
}

export default connect(
  (state: ReduxState) => ({
    user: state.user
  }),
  { logoutRequest }
)(Settings);

const styles = StyleSheet.create({
  logout: {
    paddingHorizontal: whitespace_lg,
    paddingBottom: whitespace_lg,
    marginTop: scaleSize(80),
    overflow: 'visible'
  }
});
