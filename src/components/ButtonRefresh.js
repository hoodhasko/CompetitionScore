import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ButtonRefresh = ({refreshFunction}) => (
  <TouchableOpacity style={styles.button} onPress={refreshFunction}>
    <Text style={styles.buttonText}>Обновить</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: '#FF6C65',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    height: 50,
    width: '40%',

    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
  },
});

export default ButtonRefresh;
