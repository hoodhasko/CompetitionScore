import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ButtonBack from './ButtonBack';

const Header = ({title, buttonBack}) => (
  <View style={styles.header}>
    {buttonBack && <ButtonBack />}
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    marginBottom: 4,
  },
  headerText: {
    color: '#020202',
    fontSize: 36,
    fontWeight: '700',
    borderBottomColor: 'black',
  },
});

export default Header;
