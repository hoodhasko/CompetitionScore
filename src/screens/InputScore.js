import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';

import {setValueIntoCell} from '../api/api.js';
import Header from '../components/Header.js';
import Loader from '../components/Loader';
import ButtonsScoreGroup from '../components/ButtonsScoreGroup.js';
import ButtonToggleAthlete from '../components/ButtonToggleAthlete.js';

const InputScore = ({navigation, route}) => {
  const [newScore, setNewScore] = useState('');
  const [name, setName] = useState('');
  const [idAthlete, setIdAthlete] = useState('');

  const [disabledButtons, setDisabledButtons] = useState();
  const [disableSendButton, setDisableSendButton] = useState(false);
  const [disablePrevButton, setDisablePrevButton] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    spreadSheetId,
    id,
    score,
    athleteName,
    category,
    nomination,
    athletes,
    getAthletes,
  } = route.params;

  useEffect(() => {
    setName(athleteName);
    setIdAthlete(id);
    setNewScore(score);
    if (score) {
      setDisabledButtons(true);
      setDisableSendButton(true);
    }
  }, [score, athleteName, id]);

  const toggleDisableNextPrevButtons = (idA, arrayA) => {
    if (idA === 0) {
      setDisablePrevButton(true);
    } else {
      setDisablePrevButton(false);
    }

    if (idA === arrayA.length - 1) {
      setDisableNextButton(true);
    } else {
      setDisableNextButton(false);
    }
  };

  useEffect(() => {
    toggleDisableNextPrevButtons(idAthlete, athletes);
  }, [idAthlete, athletes]);

  const sendScore = async value => {
    setLoading(true);

    await setValueIntoCell(spreadSheetId, idAthlete, value);
    const athlete = athletes.filter(ath => ath.id === idAthlete)[0];
    athlete.score = value;

    getAthletes();

    setLoading(false);
    setDisableSendButton(true);
    setDisabledButtons(true);
    toggleDisableNextPrevButtons(idAthlete, athletes);
  };

  const toggleAthlete = idToggleAthlete => {
    const athlete = athletes.filter(ath => ath.id === idToggleAthlete)[0];

    if (athlete) {
      navigation.navigate('InputScore', {
        spreadSheetId: spreadSheetId,
        id: athlete.id,
        athleteName: athlete.name,
        score: athlete.score,
        athletes: athletes,
        getAthletes,
      });
    }
  };

  useEffect(() => {
    if (!score) {
      if (newScore.length === 0) {
        setDisableSendButton(true);
        setDisableNextButton(false);
        setDisablePrevButton(false);
      } else if (newScore.length === 1) {
        setDisableSendButton(true);
        setDisableNextButton(true);
        setDisablePrevButton(true);
      } else if (newScore.length === 2) {
        setDisableSendButton(true);
        setDisableNextButton(true);
        setDisablePrevButton(true);
      } else {
        setDisableSendButton(false);
        setDisableNextButton(true);
        setDisablePrevButton(true);
      }
    }
  }, [newScore, score]);

  return (
    <SafeAreaView style={styles.root}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.header}>
            <Header title={name} buttonBack />
            <Text style={styles.subTitle}>
              Категория: {category} Номинация: {nomination}
            </Text>
          </View>
          <View style={styles.score}>
            <View style={styles.inputScore}>
              <Text style={styles.labelInput}>ОЦЕНКА</Text>
              <TextInput
                style={styles.input}
                onChangeText={setNewScore}
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
                onChangeText={setNewScore}
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
            setNewScore={setNewScore}
            disabled={disabledButtons}
          />
          <View style={styles.btnPanel}>
            <ButtonToggleAthlete
              text={'ПРЕД'}
              disabled={disablePrevButton}
              onPress={() => toggleAthlete(idAthlete - 1)}
            />
            <TouchableOpacity
              style={
                disableSendButton
                  ? styles.buttonSubmitDisable
                  : styles.buttonSubmit
              }
              disabled={disableSendButton}
              onPress={() => sendScore(newScore)}>
              <Text style={styles.buttonSubmitText}>Press</Text>
            </TouchableOpacity>
            <ButtonToggleAthlete
              text={'СЛЕД'}
              disabled={disableNextButton}
              onPress={() => toggleAthlete(idAthlete + 1)}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const baseButtonSubmit = {
  alignItems: 'center',
  justifyContent: 'center',
  width: 200,
  height: 60,
  borderRadius: 30,
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  header: {
    alignSelf: 'flex-start',
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  score: {
    alignItems: 'flex-end',
    marginRight: 145,
  },
  inputScore: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
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
  btnPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '20%',
  },
  buttonSubmit: {
    ...baseButtonSubmit,
    backgroundColor: '#6ABE5D',
  },
  buttonSubmitDisable: {
    ...baseButtonSubmit,
    backgroundColor: '#868686',
  },
  buttonSubmitText: {
    color: 'white',
    fontSize: 20,
  },
});

export default InputScore;
