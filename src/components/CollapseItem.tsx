import React, { Fragment, PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Flex } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { font_size, font_color_grey, whitespace_lg } from '@/config/theme';
import ListItem, { ListItemProps } from './ListItem';

interface Props extends Omit<ListItemProps, 'onPress'> {
  defaultActive?: boolean;
  active?: boolean;
  onPress?: (active: boolean) => void;
}

interface State {
  active: boolean;
}

export default class CollapseItem extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    let active;

    if (props.defaultActive !== undefined) {
      active = props.defaultActive;
    } else if (props.active !== undefined) {
      active = props.active;
    } else {
      active = false;
    }

    this.state = { active };
  }

  handlePress = () => {
    const active = !this.state.active;

    this.setState({ active });

    const { onPress } = this.props;

    if (onPress) {
      onPress(active);
    }
  };

  render() {
    let { children, active, extra, ...rest } = this.props;

    if (active === undefined) {
      active = this.state.active;
    }

    return (
      <Fragment>
        <ListItem
          {...rest}
          extra={
            extra ? (
              <Flex direction='row'>
                {extra}
                <Icon name={active ? 'arrow-up' : 'arrow-down'} size={font_size} color={font_color_grey} />
              </Flex>
            ) : (
              <Icon name={active ? 'arrow-up' : 'arrow-down'} size={font_size} color={font_color_grey} />
            )
          }
          onPress={this.handlePress}
        />
        {this.state.active && <View style={styles.wrapper}>{children}</View>}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: whitespace_lg
  }
});
