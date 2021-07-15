import AsyncStorage from '@react-native-async-storage/async-storage';

import {checkToken} from './authGoogle.js';

const getFreshToken = async () => {
  await checkToken();

  const token = await AsyncStorage.getItem('access_token');

  return token;
};

export const getFiles = async () => {
  const accessToken = await getFreshToken();

  console.log('files: ', accessToken);

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

export const getSheetsFromSpreadSheet = async spreadSheetid => {
  const accessToken = await getFreshToken();
  console.log('sheets: ', accessToken);
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetid}`,
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

  const sheets = response.sheets;
  // console.log(response.sheets[0].properties.sheetId);

  return sheets;
};
