import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorange from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/spreadsheets',
  ],
  webClientId:
    '1079638034579-smfpe6jjmvcslg5lisi9dtoaaci3ev51.apps.googleusercontent.com',
  offlineAccess: true,
});

export const signIn = async () => {
  try {
    const userInfo = await GoogleSignin.signIn();
    const SAC = userInfo.serverAuthCode;

    const accessToken = (await GoogleSignin.getTokens()).accessToken;

    await AsyncStorange.setItem('access_token', accessToken);

    await GoogleSignin.clearCachedAccessToken(accessToken);

    // console.log('SAC: ', userInfo.serverAuthCode);
    // console.log('INFO: ', userInfo);

    // getRefreshToken(accessToken);

    return {accessToken, SAC};
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
  const res = await fetch(`https://www.googleapis.com/oauth2/v4/token`, {
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
  });
  //   console.log('refresh');
  //   console.log(res);
};

export const getFiles = async accessToken => {
  const files = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(res => res.json())
    .then(data => data);

  console.log(files);

  return files;
};

// export const getFiles = accessToken => {
//   return new Promise((resolve, reject) => {
//     fetch('https://www.googleapis.com/drive/v3/files', {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     })
//       .then(res => res.json())
//       .then(data => {
//         console.log(data);
//         resolve(data);
//       })
//       .catch(error => {
//         reject(error);
//       });
//     // window.axios
//     //   .get(`/athletes?page=${page}&per_page=${perPage}`)
//     //   .then(response => {
//     //     resolve(response);
//     //   })
//     //   .catch(error => {
//     //     reject(error.response);
//     //   });
//   });
// };
