import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type HomeScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const weather = useSelector((state: RootState) => state.weather);

  if (!weather.weather || !weather.weather.current) {
    return (
      <View style={styles.container}>
        <Text>No weather data available</Text>
      </View>
    );
  }

  const { temperature_2m, precipitation, time } = weather.weather.current;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather Information</Text>
      
      <Text style={styles.text}>Temperature: {temperature_2m}°C</Text>
      <Text style={styles.text}>Precipitation: {precipitation} mm</Text>
      <Text style={styles.text}>Time: {new Date(time).toLocaleString()}</Text>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
