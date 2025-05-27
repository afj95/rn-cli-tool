import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function {{componentName}}() {
  return (
    <View style={styles.container}>
      <Text>{{componentName}}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
