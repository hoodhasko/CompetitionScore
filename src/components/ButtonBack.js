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
    height: 40,
    width: 40,
    borderRadius: 20,
    top: 2,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6C65',
    marginRight: 8,
  },
  backIcon: {
    height: 25,
    width: 25,
  },
});

export default ButtonBack;
