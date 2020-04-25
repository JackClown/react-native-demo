import React, { PureComponent, ReactText } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  LayoutChangeEvent,
  Animated,
  ViewStyle,
  StyleProp
} from 'react-native';
import { throttle } from 'lodash';

import { scaleSize } from '@/utils/scale';
import Text from './Text';

interface Props<T extends ReactText> {
  defaultIndex: number;
  tabs: LabeledValue<T>[];
  onPress?: (actoin: LabeledValue<T>) => void;
  onPressIn?: (nextIndex: number) => boolean;
  styles?: {
    container?: StyleProp<ViewStyle>;
    tab?: StyleProp<ViewStyle>;
    indicator?: StyleProp<ViewStyle>;
    color?: string;
    activeColor?: string;
  };
}

interface State {
  x: Animated.Value;
  width: Animated.Value;
  active: number;
}

export default class Segment<T extends ReactText> extends PureComponent<Props<T>, State> {
  static defaultProps = {
    defaultIndex: 0
  };

  public state: State = {
    x: new Animated.Value(0),
    width: new Animated.Value(0),
    active: -1
  };

  private animation?: Animated.CompositeAnimation;

  private layouts: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
  }> = [];

  private handleLayout = (index: number, e: LayoutChangeEvent) => {
    this.layouts[index] = e.nativeEvent.layout;

    if (index === this.props.defaultIndex && this.state.active === -1) {
      this.handlePress(index, 0);
    }
  };

  private handlePress = (index: number, duration: number = 200) => {
    const { onPress, tabs, onPressIn } = this.props;

    if (this.state.active !== index) {
      if (onPressIn !== undefined) {
        const result = onPressIn(index);

        if (!result) {
          return;
        }
      }

      this.setState({ active: index });
      this.moveTo(index, duration);
    } else {
      if (onPress) {
        onPress(tabs[index]);
      }
    }
  };

  public moveTo = throttle(
    (index: number, duration: number) => {
      const layout = this.layouts[index];
      const { x, width } = this.state;

      if (this.animation) {
        this.animation.stop();
      }

      this.animation = Animated.parallel([
        Animated.timing(x, {
          toValue: layout.x,
          duration,
          useNativeDriver: false
        }),
        Animated.timing(width, {
          toValue: layout.width,
          duration,
          useNativeDriver: false
        })
      ]);

      this.animation.start(() => {
        if (duration) {
          const { onPress, tabs } = this.props;

          if (onPress) {
            onPress(tabs[index]);
          }
        }
      });
    },
    300,
    {
      trailing: false
    }
  );

  public render() {
    const { tabs, styles: stylesProp } = this.props;
    const { x, active, width } = this.state;

    let container: StyleProp<ViewStyle> = styles.container;
    let indicator: StyleProp<ViewStyle> = styles.indicator;
    let tab: StyleProp<ViewStyle> = styles.tab;
    let activeColor = '#333';
    let color = '#fff';

    if (stylesProp) {
      if (stylesProp.container) {
        container = [container, stylesProp.container];
      }

      if (stylesProp.tab) {
        tab = [tab, stylesProp.tab];
      }

      if (stylesProp.indicator) {
        indicator = [indicator, stylesProp.indicator];
      }

      if (stylesProp.activeColor) {
        activeColor = stylesProp.activeColor;
      }

      if (stylesProp.color) {
        color = stylesProp.color;
      }
    }

    return (
      <View style={container}>
        <View style={styles.content}>
          <Animated.View style={[indicator, { left: x, width }]} />
          {tabs.map((item, index) => (
            <TouchableWithoutFeedback
              key={item.value}
              onPress={() => this.handlePress(index)}
              onLayout={e => this.handleLayout(index, e)}
            >
              <View style={tab}>
                <Text size='h4' color={active === index ? activeColor : color}>
                  {item.label}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
          <View />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: scaleSize(60),
    padding: scaleSize(5),
    borderRadius: scaleSize(30),
    backgroundColor: 'rgba(255,255,255,0.3)'
  },
  indicator: {
    position: 'absolute',
    left: 0,
    height: scaleSize(50),
    borderRadius: scaleSize(25),
    backgroundColor: '#fff'
  },
  content: {
    flexDirection: 'row'
  },
  tab: {
    justifyContent: 'center',
    height: scaleSize(50),
    paddingHorizontal: scaleSize(25)
  }
});
