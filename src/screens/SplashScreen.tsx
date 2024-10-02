import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../shared/styles/colors';
import { rs, rv } from '../shared/styles/responsive';
import { AppDispatch, RootState } from '../store/store';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getWeather } from '../store/weatherAction';

type SplashScreenProps = {
  navigation: NavigationProp<any>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { splashText, loading } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getWeather())
    if(!loading) {
      const timer = setTimeout(() => {
        navigation.navigate('HomeScreen')
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [navigation]);

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
    marginBottom: rv(10)
  }
});
