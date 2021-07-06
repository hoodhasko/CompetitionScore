import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

const ScoreButton = ({value, setValue}) => {
  return (
    <Pressable
      style={styles.btnScore_number}
      onPress={() => setValue(value)}
      android_ripple={{color: 'white', borderless: false}}>
      <Text style={styles.number}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnScore_number: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 10,
    width: 80,
    height: 80,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 40},
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 13,
    shadowRadius: 2,
  },
  number: {
    fontSize: 30,
    color: 'white',
  },
});

export default ScoreButton;
