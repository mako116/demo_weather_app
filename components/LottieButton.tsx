import React, { useRef, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export default function DotLottieAnimation() {
 
  return (
    <View style={styles.container}>
      <LottieView
         source={require('../assets/animation/Add Flotting Action Button.json')}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 50,
    height: 50,
  },
});
