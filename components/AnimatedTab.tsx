import React, { useRef } from 'react';
import { Animated, Pressable, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

interface AnimatedTabButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  accessibilityState?: { selected?: boolean };
  style?: StyleProp<ViewStyle>;
}

export function AnimatedTabButton({ children, onPress, accessibilityState, style }: AnimatedTabButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const focused = accessibilityState?.selected ?? false;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.2,
      useNativeDriver: true,
      friction: 3,
      tension: 150,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
      tension: 150,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 8 }, style]}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
