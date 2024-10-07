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
import packageJson from '../../package.json';

type SplashScreenProps = {
  navigation: NavigationProp<any>;
};

interface Position {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude?: number;
    heading?: number;
    speed?: number;
  };
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { splashText, loading } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();
  const [hasFetched, setHasFetched] = useState(false);

  // TODO: need to enhance this method
  const fetchWeatherAndNavigate = async () => {
    if (hasFetched) return;
    const locationPermission = await requestLocationPermission();

    if (locationPermission) {
      try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        
        dispatch(getWeather({ latitude, longitude }));
        setHasFetched(true);

        const timer = setTimeout(() => {
          navigation.replace('HomeScreen');
        }, 2000);

      } catch (error) {
        console.log(error);
      }
    }
  };

  const getCurrentLocation = (): Promise<Position> => {
    return new Promise((resolve, reject) => {

      Geolocation.getCurrentPosition(
        (position) => {
          resolve(position as Position);
        },
        (error) => {
          console.log(error.code, error.message);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    })
  }

  useEffect(() => {
    fetchWeatherAndNavigate();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Weather Wave</Text>
      <View style={styles.bottomContainer}>
        <Text style={styles.splashText}>{splashText}</Text>
        <Text style={styles.bottomText}>Version {packageJson.version}</Text>
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
