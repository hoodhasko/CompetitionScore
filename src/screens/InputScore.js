import React, {useState} from 'react';
import {Pressable, Text, View, StyleSheet, TextInput} from 'react-native';

import ScoreButton from '../components/ScoreButton.js';
import Header from '../components/Header.js';

const InputScore = ({route}) => {
  const [score, onChangeScore] = useState('');
  const {spreadSheetId, sheetId, id, name} = route.params;

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <View style={styles.root}>
      <Header title={name} />
      <View style={styles.score}>
        <TextInput
          style={styles.input}
          placeholder="ОЦЕНКА"
          onChangeText={onChangeScore}
          caretHidden
          editable={false}
          textAlign="center"
          maxLength={3}
          value={score}
        />
        <TextInput
          style={styles.input}
          placeholder="СБАВКА"
          onChangeText={onChangeScore}
          caretHidden
          editable={false}
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
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  place: {
    color: 'red',
    fontSize: 20,
  },
  score: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 70,
    width: 100,
    fontSize: 22,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'red',
    marginBottom: 20,
    color: 'black',
  },
  btnScore_group: {
    top: 20,
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
    width: 200,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  btn_text: {
    color: 'white',
    fontSize: 20,
  },
});

export default InputScore;
