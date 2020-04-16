import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { connect } from 'react-redux';

import { ShadowCard, Header, Page, Text, WhiteSpace } from '@/components';
import { getApps, App } from '@/config/App';
import { ParamList } from '@/config/routes';
import Grid from './components/Grid';
import AppItem from './components/AppItem';
import { whitespace, whitespace_lg } from '@/config/theme';

interface Props {
  user: User;
  navigation: NavigationProp<ParamList>;
}

function Home(props: Props) {
  const { navigation } = props;

  const apps = getApps(props);

  const handlePress = (app: App) => {
    const path = typeof app.path === 'string' ? app.path : app.path(props);

    navigation.navigate(path);
  };

  return (
    <Page>
      <Header title='首页' />
      <ScrollView contentContainerStyle={{ paddingVertical: whitespace, paddingHorizontal: whitespace_lg }}>
        {apps.map(item => (
          <ShadowCard size='lg' key={item.title}>
            <Text size='h1' color='dark'>
              {item.title}
            </Text>
            <WhiteSpace />
            <Grid cols={4}>
              {item.content.map(app => (
                <AppItem key={app.key} name={app.name} icon={app.icon} onPress={() => handlePress(app)} />
              ))}
            </Grid>
          </ShadowCard>
        ))}
      </ScrollView>
    </Page>
  );
}

export default connect((state: ReduxState) => ({ user: state.user }))(Home);
