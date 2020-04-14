import React, { Component, ReactText, ReactNode } from 'react';
import { View, StyleSheet, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import { Flex } from '@ant-design/react-native';

import Text from './Text';
import Radio, { Button } from './Radio';
import { scaleSize } from '@/utils/scale';
import { bottom_border_color } from '../config/theme';

type Value = ReactText | LabeledValue | LabeledValue[] | undefined;

interface Item {
  key: string;
  label: string;
  group: LabeledValue[] | ((state: State) => Promise<LabeledValue | LabeledValue[]>);
  after?: () => { [key: string]: Value };
  render?: (state: State, onChange: (value: Value) => void) => ReactNode;
}

interface Props {
  data: Item[];
  value: State;
  defaultValue?: State;
  onConfirm: (value: State) => void;
  scrollable?: boolean;
}

interface State {
  [key: string]: Value;
}

function CheckBox(props: {
  value?: LabeledValue[];
  onChange: (value: LabeledValue[]) => void;
  options: LabeledValue[];
}) {
  const { value, onChange, options } = props;

  const handleChange = (index: number, active: number) => {
    let nextValue = [...value];

    if (active >= 0) {
      nextValue.splice(active, 1);
    } else {
      nextValue.push(options[index]);
    }

    onChange(nextValue);
  };

  return (
    <Flex wrap='wrap'>
      {options.map((group, index) => {
        const active = value !== undefined ? value.findIndex(val => val.value === group.value) : -1;

        return (
          <Button key={group.value} active={active >= 0} onPress={() => handleChange(index, active)}>
            {group.label}
          </Button>
        );
      })}
    </Flex>
  );
}

export default class Filter extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { ...props.value };
  }

  private handleChange = (item: Item, value: Value) => {
    this.setState(
      Object.assign(
        {
          [item.key]: value
        },
        item.after ? item.after() : undefined
      )
    );
  };

  private handleReset = () => {
    const { defaultValue, data, onConfirm } = this.props;
    let value: State = {};

    if (defaultValue !== undefined) {
      value = defaultValue;
    } else {
      data.forEach(item => {
        if (Array.isArray(item.group)) {
          value[item.key] = item.group.length > 0 ? item.group[0].value : '';
        } else {
          value[item.key] = undefined;
        }
      });
    }

    this.setState(value, () => {
      onConfirm(value);
    });
  };

  private handleConfirm = () => {
    this.props.onConfirm(this.state);
  };

  private handleAdd = async (item: Item) => {
    try {
      const group = await (item.group as (state: State) => Promise<LabeledValue[]>)(this.state);

      this.setState(
        Object.assign(
          {
            [item.key]: group
          },
          item.after ? item.after() : undefined
        )
      );
    } catch (err) {}
  };

  private handleRemove = (item: Item) => {
    this.setState(
      Object.assign(
        {
          [item.key]: undefined
        },
        item.after ? item.after() : undefined
      )
    );
  };

  private handleRemoveLabeledValue = (item: Item, group: LabeledValue) => {
    let groups = this.state[item.key] as LabeledValue[];

    const index = groups.findIndex(item => item === group);

    if (index >= 0) {
      groups = [...groups];

      groups.splice(index, 1);

      this.setState(
        Object.assign(
          {
            [item.key]: groups
          },
          item.after ? item.after() : undefined
        )
      );
    }
  };

  public render() {
    const { data, scrollable } = this.props;

    const content = (
      <View style={styles.content}>
        {data.map(item => {
          const value = this.state[item.key];
          let elm: ReactNode;

          const handleChange = <T extends Value>(val: T) => {
            this.handleChange(item, val);
          };

          if (item.render) {
            elm = item.render(this.state, handleChange);
          } else if (typeof item.group === 'function') {
            elm = (
              <Flex wrap='wrap'>
                {Array.isArray(value) ? (
                  value.slice(0, 9).map(group => {
                    return (
                      <Button key={group.value} active onPress={() => this.handleRemoveLabeledValue(item, group)}>
                        {group.label}
                      </Button>
                    );
                  })
                ) : value !== undefined ? (
                  <Button active onPress={() => this.handleRemove(item)}>
                    {(value as LabeledValue).label}
                  </Button>
                ) : null}
                <Button onPress={() => this.handleAdd(item)} active={false}>
                  {Array.isArray(value) && value.length > 9 ? '更多' : '选择'}
                </Button>
              </Flex>
            );
          } else if (Array.isArray(value)) {
            elm = <CheckBox options={item.group} value={value} onChange={handleChange} />;
          } else {
            elm = (
              <Radio.Group value={value} onChange={handleChange}>
                {item.group.map(radio => (
                  <Radio key={radio.value} value={radio.value}>
                    {radio.label}
                  </Radio>
                ))}
              </Radio.Group>
            );
          }

          return (
            <View style={styles.filterBlock} key={item.key}>
              <Text>{item.label}</Text>
              {elm}
            </View>
          );
        })}
      </View>
    );

    return (
      <View>
        {scrollable ? (
          <ScrollView style={{ height: Dimensions.get('window').height * 0.6 }}>{content}</ScrollView>
        ) : (
          content
        )}
        <View style={styles.footer}>
          <TouchableHighlight
            style={styles.footerButton}
            onPress={this.handleReset}
            underlayColor={bottom_border_color}
          >
            <Text size='h1' color='light'>
              重置
            </Text>
          </TouchableHighlight>
          <View style={styles.line} />
          <TouchableHighlight
            style={styles.footerButton}
            onPress={this.handleConfirm}
            underlayColor={bottom_border_color}
          >
            <Text size='h1' color='primary'>
              确定
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: scaleSize(40),
    paddingBottom: scaleSize(20),
    paddingHorizontal: scaleSize(30)
  },
  filterBlock: {
    marginBottom: scaleSize(20)
  },
  footer: {
    flexDirection: 'row',
    width: '100%',
    height: scaleSize(90),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: bottom_border_color
  },
  line: {
    width: StyleSheet.hairlineWidth,
    height: '100%',
    backgroundColor: bottom_border_color
  },
  footerButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
