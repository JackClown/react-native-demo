import React, { ReactNode, Component } from 'react';
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  ViewStyle
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

interface Props extends TextInputProps {
  icon?: string;
  label: string | ReactNode;
  inputStyle?: ViewStyle;
  containerStyle?: ViewStyle;
}

interface State {
  color: any;
  layout: any;
}

export default class Input extends Component<Props, State> {
  state: State = {
    color: new Animated.Value(0),
    layout: new Animated.Value(0)
  };

  handleFocus = () => {
    if (!this.props.value) {
      Animated.timing(this.state.layout, {
        toValue: 100,
        duration: 200,
        useNativeDriver: false
      }).start();
    }

    Animated.timing(this.state.color, {
      toValue: 100,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  handleBlur = () => {
    if (!this.props.value) {
      Animated.timing(this.state.layout, {
        toValue: 0,
        duration: 200,

        useNativeDriver: false
      }).start();
    }

    Animated.timing(this.state.color, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  };

  render() {
    const { icon, label, containerStyle, inputStyle, ...rest } = this.props;
    const { layout, color } = this.state;

    const focusColor = color.interpolate({
      inputRange: [0, 100],
      outputRange: ['#ddd', '#666']
    });

    const top = layout.interpolate({
      inputRange: [0, 100],
      outputRange: [25, 0]
    });

    const left = layout.interpolate({
      inputRange: [0, 100],
      outputRange: [34, 0]
    });

    const fontSize = layout.interpolate({
      inputRange: [0, 100],
      outputRange: [14, 12]
    });

    const labelColor = layout.interpolate({
      inputRange: [0, 100],
      outputRange: ['#666', '#bbb']
    });

    return (
      <Animated.View
        style={[
          containerStyle,
          style.container,
          { borderBottomColor: focusColor }
        ]}>
        {icon && (
          <AnimatedIcon
            style={[style.icon, { color: focusColor }]}
            name={icon}
            size={24}
          />
        )}
        <Animated.View style={[style.label, { top, left }]}>
          <Animated.Text style={{ fontSize, color: labelColor }}>
            {label}
          </Animated.Text>
        </Animated.View>
        <TextInput
          {...rest}
          style={[inputStyle, style.input]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </Animated.View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    height: 32,
    paddingTop: 0,
    paddingBottom: 0
  },
  icon: {
    marginRight: 10
  },
  label: {
    position: 'absolute',
    justifyContent: 'center',
    left: 40,
    width: 60,
    height: 14
  }
});
