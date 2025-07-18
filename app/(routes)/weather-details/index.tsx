import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  SafeAreaView,
  RefreshControl,
  useColorScheme,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWeather } from '../../../hooks/useWeather';
import Collapsible from 'react-native-collapsible';
import Ionicons from '@expo/vector-icons/Ionicons';
import { RefreshIndicator } from '@/components/section/RefreshIndicator';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

export default function WeatherDetailScreen() {
  const navigation = useNavigation();
  const { weather, loading, fetchWeather } = useWeather();
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <RefreshIndicator />
      </View>
    );
  }

  if (!weather) return null;

  const toggleSection = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchWeather} />}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backButton, { backgroundColor: isDark ? '#333' : '#007AFF' }]}>
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>

        <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>
          Detailed Weather Info
        </Text>

        {accordionItems.map((item, index) => (
          <View
            key={index}
            style={[
              styles.accordion,
              {
                backgroundColor: isDark ? '#1c1c1e' : '#fff',
                shadowColor: isDark ? '#000' : '#aaa',
              },
            ]}
          >
            <TouchableOpacity onPress={() => toggleSection(index)} style={[styles.accordionHeader, { backgroundColor: isDark ? '#2c2c2e' : '#f0f4f8' }]}>
              <Text style={[styles.label, { color: isDark ? '#fff' : '#333' }]}>{item.title}</Text>
            </TouchableOpacity>
            <Collapsible collapsed={activeSection !== index}>
              <View style={[styles.card, { backgroundColor: isDark ? '#121212' : '#fdfdfd' }]}>
                <Text style={[styles.cardText, { color: isDark ? '#ddd' : '#444' }]}>{item.content(weather)}</Text>
              </View>
            </Collapsible>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const accordionItems = [
  {
    title: 'UTC Time Offset',
    content: (weather: any) => `${weather.utc_offset_seconds} seconds`,
  },
  {
    title: 'Temperature (°C)',
    content: (weather: any) => weather.hourly.temperature_2m.slice(0, 10).join(', '),
  },
  {
    title: 'Weather Codes',
    content: (weather: any) => weather.hourly.weather_code.slice(0, 10).join(', '),
  },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: '10%',
  },
  container: {
    padding: 16,
  },
  backButton: {
    marginBottom: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  accordion: {
    marginBottom: 14,
    borderRadius: 10,
    overflow: 'hidden',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  accordionHeader: {
    padding: 14,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
