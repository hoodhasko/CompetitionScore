import React from 'react';
import {Text, StyleSheet} from 'react-native';

const SubTitle = ({category, nomination}) => {
  return (
    <Text style={styles.subTitle}>
      Категория: <Text style={styles.categoryText}>{category}</Text>
      {nomination && (
        <>
          {' '}
          Номинация: <Text style={styles.nominationText}>{nomination}</Text>
        </>
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 24,
    fontWeight: '700',
  },
  nominationText: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default SubTitle;
