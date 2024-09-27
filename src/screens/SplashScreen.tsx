import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../shared/styles/colors';
import { rms, rv } from '../shared/styles/responsive';
import DeviceInfo from 'react-native-device-info';

const SplashScreen = () => {
  const version = DeviceInfo.getVersion();
  const buildNumber = DeviceInfo.getBuildNumber();

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Weather Wave</Text>

      <View style={styles.bottomContainer}>
        <Text style={styles.launchingText}>Launching...</Text>
        <Text style={styles.versionText}>v{version} ({buildNumber})</Text>
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
    backgroundColor: Colors.primary
  },
  appName: {
    fontSize: rms(32),
    fontWeight: 'bold',
    color: Colors.white
  },
  bottomContainer: {
    position: 'absolute',
    bottom: rv(10),
    alignItems: 'center',
  },
  launchingText: {
    fontSize: rms(16),
    color: Colors.white,
    marginBottom: rv(5),
  },
  versionText: {
    fontSize: rms(12),
    color: Colors.white
  },
});
