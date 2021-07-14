import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
  androidClientId:
    '1079638034579-8fgmrcqn45htferj80np6fjtvd28796q.apps.googleusercontent.com',
});

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // console.log(userInfo.user.email); get user email
    const accessToken = (await GoogleSignin.getTokens()).accessToken;

    return accessToken;
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

export const getFiles = accessToken => {
  const files = fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(res => res.json())
    .then(data => data);

  console.log(accessToken);

  return files;
};
