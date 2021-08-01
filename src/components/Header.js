import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import ButtonBack from './ButtonBack';

const Header = ({title, buttonBack}) => {
  const regexp = /[^,]*/;

  const titleTrim = title.trim();
  const fullName = regexp.exec(titleTrim);

  const [name, secondName] = String(fullName).split(' ');

  return (
    <View style={styles.header}>
      {buttonBack && <ButtonBack />}
      <View style={styles.viewText}>
        <Text style={styles.headerText}>{name}</Text>
        {secondName && <Text style={styles.headerText}>{secondName}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerText: {
    color: '#020202',
    fontSize: 36,
    fontWeight: '700',
    height: 46,
  },
  viewText: {
    flexWrap: 'wrap',
  },
});

export default Header;
