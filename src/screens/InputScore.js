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
import SubTitle from '../components/SubTitle.js';
import Loader from '../components/Loader';
import ButtonsScoreGroup from '../components/ButtonsScoreGroup.js';
import ButtonToggleAthlete from '../components/ButtonToggleAthlete.js';

const InputScore = ({navigation, route}) => {
  const [newScore, setNewScore] = useState('');
  const [newDecline, setNewDecline] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [typeInput, setTypeInput] = useState('score');

  const [disabledButtons, setDisabledButtons] = useState(false);
  const [disableSendButton, setDisableSendButton] = useState(false);
  const [disablePrevButton, setDisablePrevButton] = useState(false);
  const [disableNextButton, setDisableNextButton] = useState(false);
  const [disableInput, setDisableInput] = useState(true);
  const [activeScoreInput, setActiveScoreInput] = useState(true);
  const [activeDeclineInput, setActiveDeclineInput] = useState(false);
  const [inputBorderGreen, setInputBorderGreen] = useState(false);

  const [loading, setLoading] = useState(false);

  const {spreadSheetId, category, nomination, athlete, athletes, getAthletes} =
    route.params;

  const {
    id: idAthlete,
    indexAthlete,
    name,
    score,
    decline,
    showDecline,
  } = athlete;

  useEffect(() => {
    if (score) {
      setCurrentValue(score);
      setNewScore(score);
      decline ? setNewDecline(decline) : setNewDecline('');
      // setNewDecline(decline);

      setDisabledButtons(true);
      setDisableSendButton(true);
      setDisableInput(true);

      setInputBorderGreen(true);
    } else {
      setCurrentValue('');
      setNewScore('');
      setNewDecline('');

      setTypeInput('score');
      setActiveScoreInput(true);
      setActiveDeclineInput(false);

      setDisabledButtons(false);
      setDisableInput(false);
      setInputBorderGreen(false);
    }
  }, [score, decline, name]);

  const sendScore = async (valueScore, valueDecline) => {
    setLoading(true);
    setTypeInput('');

    if (valueDecline.length === 0) {
      valueDecline = null;
    }

    await setValueIntoCell(
      spreadSheetId,
      nomination,
      idAthlete,
      valueScore,
      valueDecline,
    );
    const athleteFiltered = athletes.filter(ath => ath.id === idAthlete)[0];
    athleteFiltered.score = valueScore;
    athleteFiltered.decline = valueDecline;

    getAthletes();

    setLoading(false);
    setDisableSendButton(true);
    setDisabledButtons(true);
    setDisableInput(true);
    setInputBorderGreen(true);
    toggleDisableNextPrevButtons(idAthlete, athletes);
  };

  const toggleAthlete = indexToggleAthlete => {
    const athleteFiltered = athletes.filter(
      ath => ath.indexAthlete === indexToggleAthlete,
    )[0];

    if (athleteFiltered) {
      navigation.navigate('InputScore', {
        spreadSheetId: spreadSheetId,
        athlete: athleteFiltered,
        athletes: athletes,
        getAthletes,
      });
    }
  };

  useEffect(() => {
    let lengthScore = newScore.length;
    let lengthDecline = newDecline.length;
    if (!score) {
      if (lengthScore === 0) {
        setDisableSendButton(true);
        setDisableNextButton(false);
        setDisablePrevButton(false);
        if (lengthDecline !== 0) {
          setDisableNextButton(true);
          setDisablePrevButton(true);
        }
      } else if (lengthScore === 1 || lengthDecline === 1) {
        setDisableSendButton(true);
        setDisableNextButton(true);
        setDisablePrevButton(true);
      } else if (lengthScore === 2 || lengthDecline === 2) {
        setDisableSendButton(true);
        setDisableNextButton(true);
        setDisablePrevButton(true);
      } else {
        setDisableSendButton(false);
        setDisableNextButton(true);
        setDisablePrevButton(true);
      }
    }
  }, [newScore, newDecline, score]);

  useEffect(() => {
    toggleDisableNextPrevButtons(indexAthlete, athletes);
  }, [indexAthlete, athletes, newScore]);

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

  const PressOnInput = (value, type) => {
    if (currentValue.length === 1 || currentValue.length === 2) {
      return;
    }
    setTypeInput(type);
    if (type === 'score') {
      setActiveDeclineInput(false);
      setActiveScoreInput(true);

      setCurrentValue(value);
    }
    if (type === 'decline') {
      setActiveScoreInput(false);
      setActiveDeclineInput(true);

      setCurrentValue(value);
    }
  };

  useEffect(() => {
    if (typeInput === 'score') {
      setNewScore(currentValue);
    }
    if (typeInput === 'decline') {
      setNewDecline(currentValue);
    }
  }, [currentValue, typeInput]);

  return (
    <SafeAreaView style={styles.root}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={styles.header}>
            <Header title={name} buttonBack />
            <SubTitle category={category} nomination={nomination} />
          </View>
          <View style={styles.score}>
            <View style={styles.inputScore}>
              <Text style={styles.labelInput}>ОЦЕНКА</Text>
              <TextInput
                style={
                  inputBorderGreen
                    ? styles.inputGreen
                    : activeScoreInput
                    ? styles.inputOrange
                    : styles.inputBlue
                }
                onChangeText={setNewScore}
                caretHidden
                editable={!disableInput}
                textAlign="center"
                maxLength={3}
                value={newScore}
                onPressIn={() => PressOnInput(newScore, 'score')}
                showSoftInputOnFocus={false}
              />
            </View>
            {showDecline && (
              <View style={styles.inputScore}>
                <Text style={styles.labelInput}>СБАВКА</Text>
                <TextInput
                  style={
                    inputBorderGreen
                      ? styles.inputGreen
                      : activeDeclineInput
                      ? styles.inputOrange
                      : styles.inputBlue
                  }
                  onChangeText={setNewDecline}
                  caretHidden
                  editable={!disableInput}
                  textAlign="center"
                  maxLength={3}
                  value={newDecline}
                  onPressIn={() => PressOnInput(newDecline, 'decline')}
                  showSoftInputOnFocus={false}
                />
              </View>
            )}
          </View>
          <ButtonsScoreGroup
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            typeInput={typeInput}
            disabled={disabledButtons}
          />
          <View style={styles.btnPanel}>
            <ButtonToggleAthlete
              text={'ПРЕД'}
              disabled={disablePrevButton}
              onPress={() => toggleAthlete(indexAthlete - 1)}
            />
            <TouchableOpacity
              style={
                disableSendButton
                  ? styles.buttonSubmitDisable
                  : styles.buttonSubmit
              }
              disabled={disableSendButton}
              onPress={() => sendScore(newScore, newDecline)}>
              <Text style={styles.buttonSubmitText}>ОТПРАВИТЬ</Text>
            </TouchableOpacity>
            <ButtonToggleAthlete
              text={'СЛЕД'}
              disabled={disableNextButton}
              onPress={() => toggleAthlete(indexAthlete + 1)}
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

const input = {
  alignSelf: 'center',
  height: '100%',
  width: 100,
  fontSize: 36,
  fontWeight: '700',
  borderWidth: 3,
  borderRadius: 6,
  marginBottom: 20,
  color: 'black',
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#E7EBF8',
    height: '100%',
  },
  header: {
    alignSelf: 'flex-start',
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
  inputBlue: {
    ...input,
    borderColor: '#2191F9',
  },
  inputOrange: {
    ...input,
    borderColor: '#F9A221',
  },
  inputGreen: {
    ...input,
    borderColor: 'green',
  },
  btnPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
