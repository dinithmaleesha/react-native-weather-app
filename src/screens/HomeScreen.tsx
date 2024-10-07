import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Images } from '../shared/styles/images';
import { rms, rs, rv } from '../shared/styles/responsive';
import { Colors } from '../shared/styles/colors';
import UnderDevelopment from '../shared/components/views/UnderDevelopment';

type HomeScreenProps = {
  navigation: NavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const weather = useSelector((state: RootState) => state.weather);
  const {
    cloud_cover,
    temperature_2m: currentTemperature,
    precipitation,
    time,
    rain, } = weather.weather.current;
  const {
    temperature_2m: temperatureUnit } = weather.weather.current_units;
  const [backgroundImage, setBackgroundImage] = useState(Images.default)
  const [iconName, setIconName] = useState('weather-sunny')

  const setBackground = () => {
    const currentHour = new Date().getHours()
    if (currentHour <= 5 && currentHour < 12) {
      setBackgroundImage(Images.morning)
    } else if (currentHour <= 12 && currentHour < 16) {
      setBackgroundImage(Images.afternoon)
    } else if (currentHour <= 16 && currentHour < 19) {
      setBackgroundImage(Images.evening)
    } else {
      setBackgroundImage(Images.night)
    }
  }

  const setWeatherIcon = () => {
    if (precipitation > 0 || rain > 0) {
      setIconName('weather-rainy');
    } else if (cloud_cover > 80) {
      setIconName('weather-cloudy');
    } else if (cloud_cover < 20 && currentTemperature > 25) {
      setIconName('weather-sunny');
    } else if (cloud_cover < 20 && currentTemperature <= 25) {
      setIconName('weather-partly-cloudy');
    }
  }

  useEffect(() => {
    setBackground();
    setWeatherIcon();
  })

  if (!weather.weather || !weather.weather.current) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.overlay} />

      <View style={styles.weatherDetails}>
        <Text style={styles.title}>{currentTemperature} {temperatureUnit}</Text>
        <Text style={styles.time}>{new Date(time).toLocaleTimeString()}</Text>
      </View>

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  weatherDetails: {
    marginTop: rv(80),
    alignItems: 'center'
  },
  title: {
    fontSize: rms(56),
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.white
  },
  time: {
    fontSize: rms(14),
    color: Colors.gray
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
