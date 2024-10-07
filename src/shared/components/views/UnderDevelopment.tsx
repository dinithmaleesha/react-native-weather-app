import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from '../../styles/colors';

const UnderDevelopment = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../../assets/images/under-construction.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Under Development</Text>
      <Text style={styles.text}>This feature is currently under development. Please check back later!</Text>
    </View>
  );
};

export default UnderDevelopment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.white,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.gray,
  },
});
