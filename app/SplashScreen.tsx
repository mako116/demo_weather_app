import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '@/app/_layout';
import { router } from 'expo-router';
import { RootStackParamList } from './_layout';
 
type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  const scale = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
    }).start(() => {
      setTimeout(() => router.push('/(tabs)'), 2000);
    });
  }, []);

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale }] }]}>
        <Text style={styles.logo}>🌤️</Text>
        <Text style={styles.text}>Berlin Weather</Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 64,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
});
