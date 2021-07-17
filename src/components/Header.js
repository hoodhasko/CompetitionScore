import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = ({title}) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
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
