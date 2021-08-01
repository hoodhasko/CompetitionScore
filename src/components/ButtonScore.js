import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const ButtonScore = ({value, setValue, disable}) => {
  return (
    <Pressable
      style={disable ? styles.disable : styles.btnScore_number}
      onPress={() => setValue(value)}
      disabled={disable}
      android_ripple={{color: 'white', borderless: false}}>
      <Text style={styles.number}>{value}</Text>
    </Pressable>
  );
};

const baseBtnStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 15,
  marginLeft: 15,
  marginBottom: 10,
  width: 80,
  height: 80,
  borderRadius: 8,
  // elevation: 13,
};

const styles = StyleSheet.create({
  btnScore_number: {
    ...baseBtnStyle,
    backgroundColor: '#F9A221',
  },
  disable: {
    ...baseBtnStyle,
    backgroundColor: '#868686',
  },
  number: {
    fontSize: 30,
    color: 'white',
  },
});

export default ButtonScore;
