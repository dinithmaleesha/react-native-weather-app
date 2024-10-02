import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import SplashScreen from './src/screens/SplashScreen';
import { store } from './src/store/store';
import MainStack from './src/navigation/MainStack';
import TestScreen from './src/screens/test_screen';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack/>
      </NavigationContainer>
    </Provider>
    // <Text style={{alignContent:'center'}}>Hey</Text>
    // <TestScreen/>
  );
};

export default App;

const styles = StyleSheet.create({});
