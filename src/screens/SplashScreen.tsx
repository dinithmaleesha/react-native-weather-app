import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../store/store';
import { setLocation, setLocationError } from '../store/locationSlice';
import { fetchWeather } from '../store/weatherSlice';
import Geolocation from '@react-native-community/geolocation';

const SplashScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const weather = useSelector((state: RootState) => state.weather);
  const navigation = useNavigation();

  useEffect(() => {
    // const getLocationAndWeather = async (dispatch: AppDispatch) => {
    //   const hasPermission = await requestLocationPermission();
    
    //   if (hasPermission) {
    //     Geolocation.getCurrentPosition(
    //       (position: GeolocationPosition) => {
    //         const { latitude, longitude } = position.coords;
    //         dispatch(setLocation({ latitude, longitude })); // Set location in Redux
    //         dispatch(fetchWeather()); // Fetch weather data
    //       },
    //       (error: GeolocationPositionError) => {
    //         dispatch(setLocationError(error.message)); // Handle error
    //       }
    //     );
    //   } else {
    //     dispatch(setLocationError('Location permission denied'));
    //   }
    // };

    // getLocationAndWeather();
  }, [dispatch]);

  useEffect(() => {
    if (weather.data && !weather.loading && !weather.error) {
      navigation.navigate('Home');
    }
  }, [weather, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Weather Wave</Text>
      <View style={styles.bottomContainer}>
        {weather.loading ? (
          <Text style={styles.loadingText}>Fetching weather...</Text>
        ) : weather.error ? (
          <Text style={styles.errorText}>{weather.error}</Text>
        ) : null}
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
    backgroundColor: '#1E1E1E',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFF',
  },
  errorText: {
    color: 'red',
  },
});
