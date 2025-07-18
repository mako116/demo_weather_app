import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  useColorScheme,
} from 'react-native';
import { useWeather } from '../../hooks/useWeather';
import WeatherIcon from '../../hooks/WeatherIcon';
// import { AnimatedGradient } from './AnimatedGradient'; // adjust import path
import { router } from 'expo-router';
import { AnimatedGradient } from '@/components/section/Animated';
import DotLottieAnimation from '@/components/LottieButton';

export default function Home() {
  const { weather, loading } = useWeather();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [displayTemp, setDisplayTemp] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (weather) {
      // Animate temperature count-up
      let start = 0;
      const toValue = weather.hourly.temperature_2m[0];
      const duration = 1500;
      const increment = toValue / (duration / 30);
      const interval = setInterval(() => {
        start += increment;
        if (start >= toValue) {
          setDisplayTemp(Math.round(toValue));
          clearInterval(interval);
        } else {
          setDisplayTemp(Math.round(start));
        }
      }, 30);

      // Animate fade and slide-in
      fadeAnim.setValue(0);
      slideAnim.setValue(20);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();

      return () => clearInterval(interval);
    }
  }, [weather]);

  if (loading || !weather) {
    return (
      <View
        style={[
          styles.loader,
          { backgroundColor: isDarkMode ? '#203a43' : '#2980b9' },
        ]}
      >
        <ActivityIndicator size="large" color={isDarkMode ? '#eee' : '#fff'} />
      </View>
    );
  }

  const code = weather.hourly.weather_code[0];

  return (
    <AnimatedGradient weatherCode={code} style={styles.container}>
      <Text style={[styles.city, { color: isDarkMode ? '#eee' : '#fff' }]}>Berlin</Text>
      <WeatherIcon code={code} />
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Text style={[styles.temp, { color: isDarkMode ? '#eee' : '#fff' }]}>
          {displayTemp}°C
        </Text>
      </Animated.View>
      <TouchableOpacity
        style={[
          styles.detailBtn,
          { backgroundColor: isDarkMode ? '#eee' : '#fff' },
        ]}
        onPress={() => router.push('/(routes)/weather-details')}
      >
        <Text style={[styles.detailText, { color: isDarkMode ? '#203a43' : '#2980b9' }]}>
          View Details
        </Text>
        <DotLottieAnimation/>
      </TouchableOpacity>
    </AnimatedGradient>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  city: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 64,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  detailBtn: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
  },
});
