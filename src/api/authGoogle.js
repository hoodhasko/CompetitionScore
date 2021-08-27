import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
  // androidClientId:
  //   '1079638034579-8fgmrcqn45htferj80np6fjtvd28796q.apps.googleusercontent.com',
  webClientId:
    '1079638034579-smfpe6jjmvcslg5lisi9dtoaaci3ev51.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

const setTokenDate = async () => {
  const date = Date.now();
  await AsyncStorage.setItem('token_date', date.toString());
};

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const pairItems = [
      ['email', userInfo.user.email],
      ['server_auth_code', userInfo.serverAuthCode],
    ];

    await AsyncStorage.multiSet(pairItems);

    await getAccessToken();
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
  const serverAuthCode = await AsyncStorage.getItem('server_auth_code');
  const refreshToken = await fetch(
    'https://www.googleapis.com/oauth2/v4/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        code: serverAuthCode,
        client_id:
          '1079638034579-smfpe6jjmvcslg5lisi9dtoaaci3ev51.apps.googleusercontent.com',
        client_secret: 'yAzCOhLo72P856chOSgaA-nb',
      }),
    },
  )
    .then(data => data.json())
    .then(res => res.refresh_token);

  console.log(refreshToken);

  await AsyncStorage.setItem('refresh_token', refreshToken);
};

const getAccessToken = async () => {
  let refreshToken = await AsyncStorage.getItem('refresh_token');

  if (!refreshToken) {
    await getRefreshToken();
    refreshToken = await AsyncStorage.getItem('refresh_token');
  }

  const res = await fetch('https://www.googleapis.com/oauth2/v4/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
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

  if (accessToken === null) {
    await signIn();
  } else {
    const tokenDate = await AsyncStorage.getItem('token_date');

    const timeRefresh = (Date.now() - tokenDate) / 1000;

    if (timeRefresh > 3500) {
      console.log('refresh token');
      await getAccessToken();
    } else {
      return;
    }
  }
};
