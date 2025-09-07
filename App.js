//import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text testID="welcome-text">Hello, React Native!
      </Text>
      <Text>Nama: Galuh Budi Marthaningrum </Text>
      <Text>NIM : D1041221056</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
  },
});
