import React from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const rotation = new Animated.Value(0);

Animated.loop(
  Animated.timing(rotation, {
    toValue: 1,
    duration: 2000,
    useNativeDriver: true,
    easing: Easing.linear,
  })
).start();

const spin = rotation.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

export const RefreshIndicator: React.FC = () => {
  return (
    <Animated.View style={[styles.circle, { transform: [{ rotate: spin }] }]}>
      <View style={styles.innerCircle} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 16,
    height: 16,
    backgroundColor: '#3498db',
    borderRadius: 8,
  },
});
