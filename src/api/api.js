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

  // console.log(sheets);
  return sheets;
};

/*
Получить список спортсменов
Параметры: id книги, название листа
*/
export const getAthletesFromSheet = async (spreadSheetId, sheetName) => {
  const accessToken = await getFreshToken();
  const email = await AsyncStorage.getItem('email');
  console.log(sheetName);

  const indexColumnScore = range[email].indexScoreColumn; //Получаем индекс столбца с оценкой по email
  const accessToDecline = range[email]?.decline; //Смотрим есть ли у данного email разрешение на получение сбавки

  let rages = `${sheetName}!A24:Q50`;
  let ragesEncode = encodeURIComponent(rages); //Кодируем название листа, в избежании ошибок когда название будет например содержит символ +
  console.log(ragesEncode);

  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values:batchGet?ranges=${ragesEncode}`,
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
  console.log(response);

  const arrayValues = response.valueRanges[0].values;

  const arrayWithoutEmpty = arrayValues.filter(item => item[1]);
  // console.log(arrayWithoutEmpty);

  const athletes = arrayWithoutEmpty.map((item, index) => {
    return {
      ...athletes,
      id: index,
      name: item[1],
      score: item[indexColumnScore],
      decline: accessToDecline ? item[16] : null,
    };
  });
  // console.log(athletes);

  return athletes;
};

/*
Отправка оценки
Параметры: id книги, индекс спортсмена в таблице, оценка, сбавка
Если у пользователя нет доступа к сбавки приходит null и сбавка не отправляется
*/
export const setValueIntoCell = async (
  spreadSheetId,
  indexAthlete,
  valueScore,
  valueDecline,
) => {
  const accessToken = await getFreshToken();
  const email = await AsyncStorage.getItem('email');

  const row = Number(indexAthlete) + 24;
  const symbolColumnScore = range[email].symbolScoreColumn;

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
            range: `${symbolColumnScore}${row}`,
            values: [[valueScore]],
          },
          {
            range: `Q${row}`,
            values: [[valueDecline]],
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
