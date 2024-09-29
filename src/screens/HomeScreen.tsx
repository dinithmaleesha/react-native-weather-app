import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


const HomeScreen = () => {
  const weather = useSelector((state: RootState) => state.weather);

  return (
    <View style={styles.container}>
      {weather.data ? (
        <>
          <Text style={styles.header}>Weather Details</Text>
          <Text style={styles.tempText}>Temperature: {weather.data.main.temp}°C</Text>
          <Text style={styles.descText}>Description: {weather.data.weather[0].description}</Text>
        </>
      ) : (
        <Text style={styles.errorText}>Failed to load weather data</Text>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  tempText: {
    fontSize: 20,
    color: '#FFF',
    marginVertical: 10,
  },
  descText: {
    fontSize: 16,
    color: '#FFF',
  },
  errorText: {
    color: 'red',
  },
});
