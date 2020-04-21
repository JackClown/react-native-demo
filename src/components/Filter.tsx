import React, { ReactText, ReactNode, useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, ScrollView, Dimensions } from 'react-native';
import { Flex } from '@ant-design/react-native';

import { scaleSize } from '@/utils/scale';
import Text from './Text';
import Radio, { Button } from './Radio';
import { useTheme } from './Theme';

type Value = ReactText | LabeledValue | LabeledValue[] | undefined;

export interface Item<T extends State> {
  key: keyof T;
  label: string;
  type?: 'checkbox' | 'radio' | 'select' | 'multi-select';
  group: LabeledValue[] | ((state: T) => Promise<LabeledValue | LabeledValue[]>);
  render?: (state: T, onChange: (value: Value) => void) => ReactNode;
}

interface Props<T extends State> {
  data: Item<T>[];
  defaultValue?: T;
  value: T;
  onChange: (value: T) => void;
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

export default function Filter<T extends State>(props: Props<T>) {
  const { defaultValue, value, onChange, scrollable, data } = props;

  const origin = useMemo(() => {
    if (defaultValue) {
      return defaultValue;
    } else {
      return value;
    }
  }, [defaultValue]);

  const [state, setState] = useState(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  const handleChange = (item: Item<T>, value: Value) => {
    setState(prev => ({
      ...prev,
      [item.key]: value
    }));
  };

  const handleReset = () => {
    onChange(origin);
  };

  const handleConfirm = () => {
    onChange(state);
  };

  const handleAdd = async (item: Item<T>) => {
    try {
      const group = await (item.group as (state: T) => Promise<LabeledValue[]>)(state);

      handleChange(item, group);
    } catch (err) {}
  };

  const handleRemove = (item: Item<T>) => {
    handleChange(item, undefined);
  };

  const handleRemoveLabeledValue = (item: Item<T>, group: LabeledValue) => {
    let value = state[item.key] as LabeledValue[];

    const index = value.findIndex(item => item === group);

    if (index >= 0) {
      value = [...value];

      value.splice(index, 1);

      handleChange(item, value);
    }
  };

  const { color } = useTheme();

  const content = (
    <View style={[styles.content, { backgroundColor: color.foreground }]}>
      {data.map(item => {
        const value = state[item.key];
        let elm: ReactNode;

        const change = (val: Value) => {
          handleChange(item, val);
        };

        if (item.render) {
          elm = item.render(state, change);
        } else if (item.type === 'radio') {
          elm = (
            <Radio.Group value={value} onChange={change}>
              {(item.group as LabeledValue[]).map(radio => (
                <Radio key={radio.value} value={radio.value}>
                  {radio.label}
                </Radio>
              ))}
            </Radio.Group>
          );
        } else if (item.type === 'checkbox') {
          elm = <CheckBox options={item.group as LabeledValue[]} value={value as LabeledValue[]} onChange={change} />;
        } else if (item.type === 'select') {
          elm = (
            <Flex wrap='wrap'>
              {value !== undefined ? (
                <Button active onPress={() => handleRemove(item)}>
                  {(value as LabeledValue).label}
                </Button>
              ) : null}
              <Button onPress={() => handleAdd(item)} active={false}>
                选择
              </Button>
            </Flex>
          );
        } else if (item.type === 'multi-select') {
          elm = (
            <Flex wrap='wrap'>
              {Array.isArray(value) &&
                value.slice(0, 9).map(group => {
                  return (
                    <Button key={group.value} active onPress={() => handleRemoveLabeledValue(item, group)}>
                      {group.label}
                    </Button>
                  );
                })}
              <Button onPress={() => handleAdd(item)} active={false}>
                {Array.isArray(value) && value.length > 9 ? '更多' : '选择'}
              </Button>
            </Flex>
          );
        }

        return (
          <View style={styles.filterBlock} key={item.key as string}>
            <Text size='h3' color='dark'>{item.label}</Text>
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
      <View style={[styles.footer, { borderTopColor: color.line, backgroundColor: color.foreground }]}>
        <TouchableHighlight style={styles.footerButton} onPress={handleReset} underlayColor={color.background}>
          <Text size='h1' color='light'>
            重置
          </Text>
        </TouchableHighlight>
        <View style={[styles.line, { backgroundColor: color.line }]} />
        <TouchableHighlight style={styles.footerButton} onPress={handleConfirm} underlayColor={color.background}>
          <Text size='h1' color='primary'>
            确定
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
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
    borderTopWidth: StyleSheet.hairlineWidth
  },
  line: {
    width: StyleSheet.hairlineWidth,
    height: '100%'
  },
  footerButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
