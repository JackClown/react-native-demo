import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TextInput, Image } from 'react-native';

import { Text, Button, Form } from '@/components';
import { scaleFont, scaleSize } from '@/utils/scale';
import { bottom_border_color, font_size_h1 } from '@/config/theme';
import { LoginParam } from '@/services/login';

interface Props {
  onSubmit: (form: LoginParam) => void;
}

export default function Login(props: Props) {
  const { onSubmit } = props;

  const [form, setForm] = useState<LoginParam>({
    bookCode: '',
    userCode: '',
    userPsw: ''
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  const { bookCode, userCode, userPsw } = form;

  return (
    <Form style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
        <View style={styles.welcome}>
          <Text size={scaleFont(60)} color="dark">
            欢迎来到乐檬零售
          </Text>
        </View>
        <View style={styles.inputWrapper}>
          <Image style={styles.avatar} source={require('@/assets/img/book-code.png')} />
          <TextInput
            style={styles.input}
            placeholder="输入帐套号"
            value={bookCode}
            onChangeText={value => handleChange('bookCode', value)}
            selectTextOnFocus
            returnKeyType="done"
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Image style={styles.avatar} source={require('@/assets/img/user.png')} />
          <TextInput
            style={styles.input}
            placeholder="输入用户名"
            value={userCode}
            onChangeText={value => handleChange('userCode', value)}
            selectTextOnFocus
            returnKeyType="done"
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.inputWrapper}>
          <Image style={styles.avatar} source={require('@/assets/img/pwd.png')} />
          <TextInput
            style={styles.input}
            placeholder="输入密码"
            value={userPsw}
            secureTextEntry
            onChangeText={value => handleChange('userPsw', value)}
            selectTextOnFocus
            returnKeyType="done"
            clearButtonMode="while-editing"
          />
        </View>
        <View style={styles.btn}>
          <Button
            onPress={handleSubmit}
            type="primary"
            size="lg"
            shadow
            disabled={bookCode === '' || userCode === '' || userPsw === ''}>
            登录
          </Button>
        </View>
      </ScrollView>
    </Form>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  content: {
    paddingHorizontal: scaleSize(40),
    minHeight: '100%'
  },
  welcome: {
    marginTop: scaleSize(200),
    marginBottom: scaleSize(100)
  },
  btn: {
    marginTop: scaleSize(80)
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scaleSize(110),
    borderBottomColor: bottom_border_color,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  input: {
    flex: 1,
    height: '100%',
    padding: 0,
    fontSize: font_size_h1
  },
  avatar: {
    width: scaleSize(44),
    height: scaleSize(44),
    marginRight: scaleSize(30)
  },
  close: {
    position: 'absolute',
    top: 44,
    right: 0,
    paddingHorizontal: scaleSize(40)
  }
});
