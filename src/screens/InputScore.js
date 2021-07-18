import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import ScoreButton from '../components/ScoreButton.js';
import Header from '../components/Header.js';
import {setValueIntoCell} from '../api/api.js';

const InputScore = ({route}) => {
  const [newScore, onChangeNewScore] = useState('');
  const {spreadSheetId, id, score, athleteName} = route.params;

  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const setScore = async value => {
    await setValueIntoCell(spreadSheetId, id, value);
  };

  return (
    <View style={styles.root}>
      <Header title={athleteName} />
      <View style={styles.score}>
        <TextInput
          style={styles.input}
          placeholder="ОЦЕНКА"
          onChangeText={onChangeNewScore}
          caretHidden
          editable={false}
          textAlign="center"
          maxLength={3}
          value={newScore}
        />
        <TextInput
          style={styles.input}
          placeholder="СБАВКА"
          onChangeText={onChangeNewScore}
          caretHidden
          editable={false}
          textAlign="center"
          maxLength={3}
          value={newScore}
        />
      </View>
      <View style={styles.btnScore_group}>
        {numbers.map(number => (
          <ScoreButton
            setValue={onChangeNewScore}
            value={number}
            key={number}
          />
        ))}
      </View>
      <View style={styles.submit}>
        <TouchableOpacity style={styles.btn} onPress={() => setScore(newScore)}>
          <Text style={styles.btn_text}>Press</Text>
        </TouchableOpacity>
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
