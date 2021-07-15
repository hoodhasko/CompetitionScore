import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const ListItem = ({data, navigation}) => {
  // console.log(onPress());
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('InputScore')}>
      <Text style={styles.itemText}>{data.item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 60,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
    borderRadius: 16,

    elevation: 1,
  },
  itemText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#464B7B',
  },
});

export default ListItem;
