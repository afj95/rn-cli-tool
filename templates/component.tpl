import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const {{componentName}} = () => {
  return (
    <View style={styles.container}>
      <Text>{{componentName}}</Text>
    </View>
  );
}

export default {{componentName}};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
