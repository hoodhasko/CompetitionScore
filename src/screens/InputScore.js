import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';

import {setValueIntoCell} from '../api/api.js';
import Header from '../components/Header.js';
import ButtonsScoreGroup from '../components/ButtonsScoreGroup.js';

const InputScore = ({route}) => {
  const [newScore, onChangeNewScore] = useState('');
  const [disabledButtons, setDisabledButtons] = useState();
  const [disableSendButton, setDisableSendButton] = useState(true);
  const {spreadSheetId, id, score, athleteName} = route.params;

  useEffect(() => {
    if (score) {
      onChangeNewScore(score);
      setDisabledButtons(true);
    }
  }, [score]);

  const setScore = async value => {
    // await setValueIntoCell(spreadSheetId, id, value);
    console.log('click');
  };

  useEffect(() => {
    if (newScore.length === 0) {
      setDisableSendButton(true);
    } else if (newScore.length === 1) {
      setDisableSendButton(false);
    } else if (newScore.length === 2) {
      setDisableSendButton(true);
    } else {
      setDisableSendButton(false);
    }
  }, [newScore]);

  return (
    <View style={styles.root}>
      <Header title={athleteName} buttonBack />
      <View style={styles.score}>
        <View style={styles.inputScore}>
          <Text style={styles.labelInput}>ОЦЕНКА</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNewScore}
            caretHidden
            editable={false}
            textAlign="center"
            maxLength={3}
            value={newScore}
          />
        </View>
        <View style={styles.inputScore}>
          <Text style={styles.labelInput}>СБАВКА</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNewScore}
            caretHidden
            editable={false}
            textAlign="center"
            maxLength={3}
            value={newScore}
          />
        </View>
      </View>
      <ButtonsScoreGroup
        newScore={newScore}
        onChangeNewScore={onChangeNewScore}
        disabled={disabledButtons}
      />
      <View style={styles.submit}>
        <TouchableOpacity
          style={styles.btn}
          disabled={disableSendButton}
          onPress={() => setScore(newScore)}>
          <Text style={styles.btn_text}>Press</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 10,
  },
  place: {
    color: 'red',
    fontSize: 20,
  },
  score: {
    alignItems: 'flex-end',
    marginRight: 145,
  },
  inputScore: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  labelInput: {
    bottom: 10,
    marginRight: 12,
    fontSize: 30,
  },
  input: {
    alignSelf: 'center',
    height: '100%',
    width: 100,
    fontSize: 36,
    fontWeight: '700',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'red',
    marginBottom: 20,
    color: 'black',
  },
  submit: {
    justifyContent: 'center',
    height: '20%',
  },
  btn: {
    backgroundColor: 'black',
    alignItems: 'center',
    alignSelf: 'center',
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
