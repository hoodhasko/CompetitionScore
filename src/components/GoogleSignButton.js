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

      setAccessToken(apiKey);
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

  const getList = async () => {
    const list = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => data);

    console.log(list);
  };

  const getValuesForRange = async () => {
    //?????????????? ?????????? GET CELL
    let rages = '????2010!A1:A3';

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
    //?????????????? ?????????? GET SHEETID
    let range = '????2010';

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
    //?????????????? ?????????? POST
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
          title="???????????????? ???????????????? ???? range"
          onPress={getValuesForRange}
        />
        {arrayValues?.map(item => (
          <Text key={item}>{item}</Text>
        ))}
        <Button title="?????????????????? ????????????????" onPress={setValueIntoCell} />
      </View>
      <View>
        <Button title="???????????????? ID" onPress={getSheetId} />
        <Text>{sheetId}</Text>
      </View>
      <View>
        <Button title="???????????????? list" onPress={getList} />
      </View>
    </SafeAreaView>
  );
};

export default GoogleSignButton;
