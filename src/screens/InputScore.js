import React, {useState} from 'react';
import {Pressable, Text, View, StyleSheet, TextInput} from 'react-native';

import ScoreButton from '../components/ScoreButton.js';

const InputScore = () => {
  const [score, onChangeScore] = useState('');

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <View style={styles.root}>
      <View style={styles.score}>
        <Text>{score}</Text>
        <TextInput
          style={styles.input}
          placeholder="ОЦЕНКА"
          onChangeText={onChangeScore}
          caretHidden
          textAlign="center"
          maxLength={3}
          value={score}
        />
      </View>
      <View style={styles.btnScore_group}>
        {numbers.map(number => (
          <ScoreButton setValue={onChangeScore} value={number} key={number} />
        ))}
      </View>
      <View style={styles.submit}>
        <Pressable style={styles.btn} onPress={() => onChangeScore(25)}>
          <Text style={styles.btn_text}>Press</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  place: {
    color: 'red',
    fontSize: 20,
  },
  score: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
  input: {
    height: 70,
    width: 100,
    fontSize: 34,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'red',
  },
  btnScore_group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: 400,
  },
  submit: {
    justifyContent: 'center',
    height: '20%',
  },
  btn: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  btn_text: {
    color: 'white',
    fontSize: 20,
  },
});

export default InputScore;
