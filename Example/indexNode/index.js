import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, TextInput, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { lessThan } from '../../src/base';

// setInterval(() => {
//   let iters = 1e8,
//     sum = 0;
//   while (iters-- > 0) sum += iters;
// }, 300);

const {
  set,
  cond,
  eq,
  divide,
  add,
  Value,
  event,
  index,
  createAnimatedComponent,
} = Animated;

const AnimatedTextInput = createAnimatedComponent(TextInput);

const PICKER_WIDTH = Dimensions.get('window').width;
const TEXT_VALUES = ['a', 'b', 'c', 'd', 'e', 'f'];
const TEXT_DISTANCE_INTERVAL = 120;

export default class Example extends Component {
  constructor(props) {
    super(props);

    const dragX = new Value(0);
    const state = new Value(-1);

    this._onGestureEvent = event([
      {
        nativeEvent: { translationX: dragX, state: state },
      },
    ]);

    const offsetX = new Value(PICKER_WIDTH / 2);
    this._transX = cond(
      eq(state, State.ACTIVE),
      add(offsetX, dragX),
      set(offsetX, add(offsetX, dragX))
    );

    const i = divide(this._transX, TEXT_DISTANCE_INTERVAL);
    this._currText = index(TEXT_VALUES, cond(lessThan(i, 0), 0, i));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.separatorsContainer}>
          {TEXT_VALUES.map(x => (
            <Text key={x} style={styles.separator}>
              {x}
            </Text>
          ))}
        </View>
        <PanGestureHandler
          maxPointers={1}
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onGestureEvent}>
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{ translateX: this._transX }],
              },
            ]}>
            <AnimatedTextInput
              maxLength={1}
              editable={false}
              pointerEvents="none"
              style={styles.text}
              text={this._currText}
            />
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

const CIRCLE_SIZE = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
  },
  box: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    marginLeft: -CIRCLE_SIZE / 2,
    marginTop: -CIRCLE_SIZE / 2,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#ffcd32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    padding: 0,
    margin: 0,
    textAlign: 'center',
  },
  separatorsContainer: {
    position: 'absolute',
    height: '100%',
    bottom: 0,
    flexDirection: 'row',
  },
  separator: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    width: TEXT_DISTANCE_INTERVAL,
    margin: 0,
    padding: 5,
  },
});
