import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  GDrive,
  MimeTypes,
} from '@robinbobin/react-native-google-drive-api-wrapper';

const GoogleSignButton = () => {
  GoogleSignin.configure({
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.appdata',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.metadata',
      'https://www.googleapis.com/auth/drive.metadata.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
    ], // We want   read and write access
    webClientId:
      '1079638034579-smfpe6jjmvcslg5lisi9dtoaaci3ev51.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      //await GoogleSignin.signIn();
      const apiKey = (await GoogleSignin.getTokens()).accessToken;
      console.log('Successful login');

      const gdrive = new GDrive();
      gdrive.accessToken = apiKey;

      const arrBooks = await gdrive.files.list();
      const arrObj = arrBooks.files.map(item => ({
        name: item.name,
        id: item.id,
      }));
      console.log(arrObj);
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
    </SafeAreaView>
  );
};

export default GoogleSignButton;
