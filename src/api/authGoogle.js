import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
  androidClientId:
    '1079638034579-8fgmrcqn45htferj80np6fjtvd28796q.apps.googleusercontent.com',
});

const setTokenDate = async () => {
  const date = Date.now();
  await AsyncStorage.setItem('token_date', date.toString());
};

export const signIn = async () => {
  await AsyncStorage.multiRemove(['token_date', 'access_token']);
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // console.log(userInfo.user.email); get user email
    await AsyncStorage.setItem('email', userInfo.user.email);

    const accessToken = (await GoogleSignin.getTokens()).accessToken;
    setTokenDate();
    await AsyncStorage.setItem('access_token', accessToken);

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

const getRefreshToken = async () => {
  const res = await fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token:
        '1//0chncTfu_zNzKCgYIARAAGAwSNwF-L9Irv_DI7qgwnqmI9kJrrJNgVnY7G20AHItNHQLcj53vWakayTCdrfMPNBaTINNvKAjKCzk',
      client_id:
        '1079638034579-smfpe6jjmvcslg5lisi9dtoaaci3ev51.apps.googleusercontent.com',
      client_secret: 'yAzCOhLo72P856chOSgaA-nb',
    }),
  }).then(data => data.json());

  const accessToken = res.access_token;

  setTokenDate();

  await AsyncStorage.setItem('access_token', accessToken);
};

export const checkToken = async () => {
  const accessToken = await AsyncStorage.getItem('access_token');

  const email = await AsyncStorage.getItem('email');
  console.log(email);

  if (accessToken === null) {
    console.log('oldToken');
    await signIn();
  } else {
    const tokenDate = await AsyncStorage.getItem('token_date');

    const timeRefresh = (Date.now() - tokenDate) / 1000;

    if (timeRefresh > 3590) {
      console.log('refresh token');
      await getRefreshToken();
    } else {
      return;
    }
  }
};
