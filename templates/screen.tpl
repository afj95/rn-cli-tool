import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const {{screenName}} = () => {
  return (
    <View style={styles.container}>
      <Text>{{screenName}}</Text>
    </View>
  );
}

export default {{screenName}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
