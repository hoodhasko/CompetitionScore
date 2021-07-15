import AsyncStorage from '@react-native-async-storage/async-storage';

import {checkToken} from './authGoogle.js';

export const getFiles = async () => {
  await checkToken();

  const accessToken = await AsyncStorage.getItem('access_token');

  console.log(accessToken);

  const files = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(res => res.json())
    .then(data => data);

  return files;
};
