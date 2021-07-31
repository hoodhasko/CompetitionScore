import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ButtonToggleAthlete = ({text, disabled, onPress}) => {
  return (
    <TouchableOpacity
      style={disabled ? styles.btnDisabled : styles.btn}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.txt}>{text}</Text>
    </TouchableOpacity>
  );
};

const baseBtn = {
  width: 80,
  height: 60,
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: 5,
  borderRadius: 30,
};

const styles = StyleSheet.create({
  btn: {
    ...baseBtn,
    backgroundColor: '#2191F9',
  },
  btnDisabled: {
    ...baseBtn,
    backgroundColor: '#868686',
  },
  txt: {
    color: 'white',
    fontSize: 20,
  },
});

export default ButtonToggleAthlete;
