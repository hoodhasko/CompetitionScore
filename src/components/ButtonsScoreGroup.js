import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import ScoreButton from './ScoreButton.js';

const ButtonsScoreGroup = ({newScore, onChangeNewScore, disabled}) => {
  console.log('DSBLD:', disabled);
  const [disableNumber, setDisableNumber] = useState(false);
  const [disableComma, setDisableComma] = useState(true);
  const [disableDelete, setDisableDelete] = useState(true);

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const comma = ',';

  const checkOnChange = value => {
    if (newScore.length === 0) {
      setDisableNumber(true);
      setDisableComma(false);
      setDisableDelete(false);

      onChangeNewScore(value);
    } else {
      const v = newScore + value;
      setDisableNumber(true);

      onChangeNewScore(v);
    }
  };

  const commaValue = () => {
    const value = newScore + ',';

    setDisableNumber(false);
    setDisableComma(true);

    onChangeNewScore(value);
  };

  const deleteScore = () => {
    const value = newScore.slice(0, -1);

    if (value.length === 0) {
      setDisableNumber(false);
      setDisableComma(true);
      setDisableDelete(true);
    } else if (value.length === 1) {
      setDisableNumber(true);
      setDisableComma(false);
    } else if (value.length === 2) {
      setDisableNumber(false);
    }

    onChangeNewScore(value);
  };

  useEffect(() => {
    if (disabled) {
      setDisableNumber(true);
      setDisableComma(true);
      setDisableDelete(true);
    }
  }, [disabled]);

  return (
    <View style={styles.btnScore_group}>
      {numbers.map(number => (
        <ScoreButton
          setValue={checkOnChange}
          value={number}
          key={number}
          disable={disableNumber}
        />
      ))}
      <ScoreButton setValue={commaValue} value={comma} disable={disableComma} />
      <ScoreButton
        setValue={deleteScore}
        value={'DEL'}
        disable={disableDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnScore_group: {
    top: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 400,
  },
});

export default ButtonsScoreGroup;
