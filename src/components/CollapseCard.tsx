import React, { PureComponent, ReactNode } from 'react';
import { TouchableWithoutFeedback, ViewStyle, StyleProp, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { font_size, font_color_grey, whitespace_lg } from '@/config/theme';
import Card from './Card';
import Text from './Text';

interface Props {
  defaultActive: boolean;
  onChange?: (active: boolean) => void;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface State {
  active: boolean;
}

export default class CollapseCard extends PureComponent<Props, State> {
  static defaultProps = {
    defaultActive: true
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      active: props.defaultActive
    };
  }

  handlePress = () => {
    const active = !this.state.active;

    this.setState({ active });

    if (this.props.onChange) {
      this.props.onChange(active);
    }
  };

  render() {
    const { children, title, size, style } = this.props;
    const { active } = this.state;

    return (
      <Card
        size={size}
        style={style}
        styles={{ header: { paddingVertical: 0 } }}
        header={
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <View style={styles.header}>
              <Text size='h1' color='dark' fontWeight='bold'>
                {title}
              </Text>
              <Icon name={active ? 'arrow-up' : 'arrow-down'} size={font_size} color={font_color_grey} />
            </View>
          </TouchableWithoutFeedback>
        }
      >
        {this.state.active ? children : undefined}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: whitespace_lg,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
