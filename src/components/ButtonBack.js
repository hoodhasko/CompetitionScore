import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ButtonBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    marginRight: 8,
  },
});

export default ButtonBack;
