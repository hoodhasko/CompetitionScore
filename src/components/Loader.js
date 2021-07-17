import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet} from 'react-native';

const Loader = () => (
  <View style={styles.loading}>
    <ActivityIndicator size={70 || 'large'} color="#3D4785" />
    <Text style={styles.loadingText}>Идет загрузка...</Text>
  </View>
);

const styles = StyleSheet.create({
  loading: {
    backgroundColor: 'white',
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 200,
    borderRadius: 20,

    elevation: 3,
  },
  loadingText: {
    color: '#535353',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
  },
});

export default Loader;
