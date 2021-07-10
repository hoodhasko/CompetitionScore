import React, {useState} from 'react';
import {SafeAreaView, View, Button, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GDrive} from '@robinbobin/react-native-google-drive-api-wrapper';

const GoogleSignButton = () => {
  const [arrayBooks, setArrayBooks] = useState();
  const [accessToken, setAccessToken] = useState();
  const [arrayValues, setArrayValues] = useState();
  const [sheetId, setSheetId] = useState();
  GoogleSignin.configure({
    scopes: [
      'https://www.googleapis.com/auth/drive',
      //   'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.file',
      //   'https://www.googleapis.com/auth/drive.metadata',
      //   'https://www.googleapis.com/auth/drive.metadata.readonly',
      //   'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/spreadsheets',
      //   'https://www.googleapis.com/auth/spreadsheets.readonly',
    ], // We want   read and write access
    // webClientId:
    //   '1079638034579-smfpe6jjmvcslg5lisi9dtoaaci3ev51.apps.googleusercontent.com',
    androidClientId:
      '1079638034579-8fgmrcqn45htferj80np6fjtvd28796q.apps.googleusercontent.com',
    // offlineAccess: true,
    // forceCodeForRefreshToken: true,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user.email);
      const apiKey = (await GoogleSignin.getTokens()).accessToken;
      console.log('Successful login');

      const gdrive = new GDrive();
      gdrive.accessToken = apiKey;
      setAccessToken(apiKey);

      const arrBooks = await gdrive.files.list();
      const nArr = arrBooks.files.map(item => ({
        name: item.name,
        id: item.id,
      }));
      setArrayBooks(nArr);
      console.log(arrayBooks);
      console.log(accessToken);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('in progress ');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('play services not available');
      } else {
        // some other error happened
        console.log('some error happened');
        console.log(error);
      }
    }
  };

  const getValuesForRange = async () => {
    //РАБОЧИЙ МЕТОД GET CELL
    let rages = 'ИД2010!A1:A3';

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${arrayBooks[0].id}/values:batchGet?ranges=${rages}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
      .then(res => res.json())
      .then(data => data);

    console.log(res);

    const arrayV = res.valueRanges[0].values.map(item => item[0]);
    setArrayValues(arrayV);
    console.log(arrayValues);
  };

  const getSheetId = async () => {
    //РАБОЧИЙ МЕТОД GET SHEETID
    let range = 'ИД2010';

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${arrayBooks[0].id}?ranges=${range}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
      .then(res => res.json())
      .then(data => data);

    // console.log(response.sheets[0].properties.sheetId);
    setSheetId(await response.sheets[0].properties.sheetId);
  };

  const setValueIntoCell = async () => {
    //РАБОЧИЙ МЕТОД POST
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${arrayBooks[0].id}:batchUpdate`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          requests: [
            {
              repeatCell: {
                range: {
                  startColumnIndex: 0,
                  endColumnIndex: 1,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  sheetId: sheetId,
                },
                cell: {
                  userEnteredValue: {
                    numberValue: 200200,
                  },
                },
                fields: '*',
              },
            },
          ],
        }),
      },
    );
    console.log(res);
  };

  return (
    <SafeAreaView>
      <View>
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      </View>
      <View>
        <Text>{accessToken}</Text>
        <Button
          title="Получить значения из range"
          onPress={getValuesForRange}
        />
        {arrayValues?.map(item => (
          <Text key={item}>{item}</Text>
        ))}
        <Button title="Отправить значение" onPress={setValueIntoCell} />
      </View>
      <View>
        <Button title="получить ID" onPress={getSheetId} />
        <Text>{sheetId}</Text>
      </View>
    </SafeAreaView>
  );
};

export default GoogleSignButton;
