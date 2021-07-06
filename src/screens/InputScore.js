import React from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';

const createThreeButtonAlert = () =>
  Alert.alert('Вы видите это сообщение', 'потому что нажали на кнопку', [
    {
      text: 'Отмена',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'Да, нажал(а)', onPress: () => console.log('Cancel Pressed')},
  ]);

const InputScore = () => {
  return (
    <View style={styles.root}>
      <View style={styles.score}>
        <TextInput style={styles.input} />
        <Text>HELLO</Text>
      </View>
      <View style={styles.submit}>
        <Pressable style={styles.btn} onPress={() => createThreeButtonAlert()}>
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
  },
  score: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'red',
  },
  submit: {
    justifyContent: 'center',
    height: '10%',
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
