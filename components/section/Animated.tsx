// AnimatedGradient.tsx (or inline above your screen)

import React from 'react';
import { ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedGradientProps {
  weatherCode: number;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const getGradientColors = (code: number): string[] => {
  if ([0, 1].includes(code)) return ['#fceabb', '#f8b500']; // Sunny
  if ([2, 3].includes(code)) return ['#bdc3c7', '#2c3e50']; // Cloudy
  return ['#4b6cb7', '#182848']; // Rainy or default
};

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ weatherCode, style, children }) => {
  const colors = getGradientColors(weatherCode);

  return (
    <LinearGradient colors={colors} style={[{ flex: 1 }, style]}>
      {children}
    </LinearGradient>
  );
};
