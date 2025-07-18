import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import { useWeather } from '../hooks/useWeather';
import WeatherIcon from '../hooks/WeatherIcon';
// Remove expo linear gradient import
// import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { RefreshIndicator } from '@/components/section/RefreshIndicator';
import { AnimatedGradient } from '@/components/section/Animated';

// Paste AnimatedGradient component here or import it from its file
// (The code from Step 1)

export default function WeatherScreen() {
  const { weather, loading, fetchWeather } = useWeather();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const textColor = isDarkMode ? '#eee' : '#222';
  const buttonTextColor = isDarkMode ? '#203a43' : '#2980b9';
  const buttonBgColor = isDarkMode ? '#eee' : '#fff';

  const [displayTemp, setDisplayTemp] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // ... animations and useEffect as before ...

  if (loading || !weather) {
    return (
      <View style={[styles.loader, { backgroundColor: isDarkMode ? '#203a43' : '#2980b9' }]}>
        <ActivityIndicator size="large" color={textColor} />
      </View>
    );
  }

  const code = weather.hourly.weather_code[0];

  return (
    <AnimatedGradient weatherCode={code} style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchWeather} />}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        style={{ flex: 1 }}
      >
        {loading && !weather ? (
          <RefreshIndicator />
        ) : (
          <>
            <Text style={[styles.city, { color: textColor }]}>Berlin</Text>
            <WeatherIcon code={code} />
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              <Text style={[styles.temp, { color: textColor }]}>{displayTemp}°C</Text>
            </Animated.View>
            <TouchableOpacity
              style={[styles.detailBtn, { backgroundColor: buttonBgColor }]}
              onPress={() => router.push('/')}
            >
              <Text style={[styles.detailText, { color: buttonTextColor }]}>View Details</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
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
  },
  detailText: {
    fontSize: 16,
  },
});
