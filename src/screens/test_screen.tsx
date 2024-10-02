import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TestScreen = () => {
  return (
    <View>
      <Text style={styles.div}>Test Screen</Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  div: {
    alignItems: 'center',
  },
});
