import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../shared/styles/colors';
import { rs, rv } from '../shared/styles/responsive';
import { AppDispatch, RootState } from '../store/store';
import { NavigationProp } from '@react-navigation/native';
import { getWeather } from '../store/weatherAction';
import { requestLocationPermission } from '../services/location_permission';
import Geolocation from '@react-native-community/geolocation';

type SplashScreenProps = {
  navigation: NavigationProp<any>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { splashText, loading } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();
  const [hasFetched, setHasFetched] = useState(false);

  const fetchWeatherAndNavigate = async () => {
    const locationPermission = await requestLocationPermission();
    if (locationPermission && !hasFetched) {
      const currentLocation = await getCurrentLocation();
      if (currentLocation) {
        dispatch(getWeather());
        setHasFetched(true);

        const timer = setTimeout(() => {
          navigation.replace('HomeScreen');
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  };

  const getCurrentLocation = async () => {
    console.log('getCurrentLocation()');
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        return true
      },
      (error) => {
        console.log(error.code, error.message);
        return false
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    return false
  }

  useEffect(() => {
    fetchWeatherAndNavigate();
  }, [navigation, dispatch, hasFetched]);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Weather Wave</Text>
      <View style={styles.bottomContainer}>
        <Text style={styles.splashText}>{splashText}</Text>
        <Text style={styles.bottomText}>Version 1.0.1</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  appName: {
    fontSize: rs(32),
    fontWeight: 'bold',
    color: Colors.white,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: rs(10),
    alignItems: 'center',
  },
  bottomText: {
    color: Colors.white,
  },
  splashText: {
    color: Colors.white,
    fontSize: rs(14),
    marginBottom: rv(10),
  },
});
