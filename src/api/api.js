import AsyncStorage from '@react-native-async-storage/async-storage';

import {checkToken} from './authGoogle.js';
import {range} from '../config/associate.js';

const getFreshToken = async () => {
  await checkToken();

  const token = await AsyncStorage.getItem('access_token');

  return token;
};

export const getFiles = async () => {
  const accessToken = await getFreshToken();
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

export const getSheetsFromSpreadSheet = async spreadSheetid => {
  const accessToken = await getFreshToken();

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

export const getAthletesFromSheet = async (spreadSheetid, sheetName) => {
  const accessToken = await getFreshToken();
  const email = await AsyncStorage.getItem('email');

  const column = range[email];

  let rages = `${sheetName}!B24:Q50`;

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetid}/values:batchGet?ranges=${rages}`,
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

  const arrayValues = response.valueRanges[0].values;

  const arrayWithoutEmpty = arrayValues.filter(item => item[0]);

  const athletes = arrayWithoutEmpty.map((item, index) => {
    return {
      ...athletes,
      id: index,
      name: item[0],
      score: item[column - 2],
    };
  });

  return athletes;
};

export const setValueIntoCell = async (spreadSheetId, sheetId, id, score) => {
  const accessToken = await getFreshToken();

  const row = id + 24;

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        data: [
          {
            range: `D${row}`,
            values: [[score]],
          },
        ],
        valueInputOption: 'USER_ENTERED',
      }),
    },
  );
};

// export const getValuesOfCell = async (spreadSheetId, sheetName) => {
//   const accessToken = await getFreshToken();
//   let rages = 'ИД2010!A1:A3';

//   const response = await fetch(
//     `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values:batchGet?ranges=${rages}`,
//     {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//     },
//   )
//     .then(res => res.json())
//     .then(data => data);

//   console.log(response);

//   const arrayV = response.valueRanges[0].values.map(item => item[0]);

//   console.log(arrayV);
// };
