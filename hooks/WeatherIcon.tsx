import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface WeatherIconProps {
  code: number;
}

const animationUrls = {
  sunny: require('../assets/animation/sunny.json'),
  rainy: require('../assets/animation/rainy_icon.json'),
  cloud: require('../assets/animation/Clouds.json'),
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ code }) => {
  let animation;

  if ([0, 1].includes(code)) {
    animation = animationUrls.sunny;
  } else if ([2, 3].includes(code)) {
    animation = animationUrls.cloud;
  } else {
    animation = animationUrls.rainy;
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={animation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default WeatherIcon;
