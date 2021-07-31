import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import backIcon from '../assets/back-arrow.png';

const ButtonBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
      <Image style={styles.backIcon} source={backIcon} resizeMode={'center'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#FF6C65',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
});

export default ButtonBack;
