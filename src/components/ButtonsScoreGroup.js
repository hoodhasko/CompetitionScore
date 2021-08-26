import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import ButtonScore from './ButtonScore.js';

const ButtonsScoreGroup = ({currentValue, setCurrentValue, disabled}) => {
  const [disableNumber, setDisableNumber] = useState(false);
  const [disableComma, setDisableComma] = useState(true);
  const [disableDelete, setDisableDelete] = useState(true);

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const comma = ',';

  const setScore = v => {
    const value = currentValue + v;

    setCurrentValue(value);
  };

  const setComma = () => {
    const value = currentValue + ',';

    setCurrentValue(value);
  };

  const deleteScore = () => {
    const value = currentValue.slice(0, -1);

    setCurrentValue(value);
  };

  useEffect(() => {
    if (disabled) {
      setDisableNumber(true);
      setDisableComma(true);
      setDisableDelete(true);
    }
  }, [disabled]);

  useEffect(() => {
    if (!disabled) {
      let lengthCurrentValue = currentValue.length;
      if (lengthCurrentValue === 0) {
        setDisableNumber(false);
        setDisableComma(true);
        setDisableDelete(true);
      } else if (lengthCurrentValue === 1) {
        setDisableNumber(true);
        setDisableComma(false);
        setDisableDelete(false);
      } else if (lengthCurrentValue === 2) {
        setDisableNumber(false);
        setDisableComma(true);
        setDisableDelete(false);
      } else {
        setDisableNumber(true);
        setDisableDelete(false);
      }
    }
  }, [currentValue, disabled]);

  return (
    <View style={styles.btnScore_group}>
      {numbers.map(number => (
        <ButtonScore
          setValue={setScore}
          value={number}
          key={number}
          disable={disableNumber}
        />
      ))}
      <ButtonScore setValue={setComma} value={comma} disable={disableComma} />
      <ButtonScore
        setValue={deleteScore}
        value={'DEL'}
        disable={disableDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnScore_group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 400,
  },
});

export default ButtonsScoreGroup;
