import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, FlatList, Text, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {signIn, getFiles} from './src/components/authGoogle';
import InputScore from './src/screens/InputScore.js';
import ListItem from './src/components/ListItem';
import ButtonRefresh from './src/components/ButtonRefresh';
import Header from './src/components/Header';
import Loader from './src/components/Loader';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState();
  const [accessToken, setAccessToken] = useState();

  const auth = async () => {
    setIsLoading(true);
    const token = await signIn();
    await AsyncStorage.setItem('access_token', token);
    setAccessToken(token);
  };

  const getFilesFromGDrive = async () => {
    setIsLoading(true);

    const token = await AsyncStorage.getItem('access_token');

    const listFiles = await getFiles(token);

    setFiles(listFiles.files);

    console.log(listFiles);

    if (listFiles !== undefined) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    getFilesFromGDrive();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.listItems}>
          <Header title="Номинации" />
          <FlatList
            data={files}
            renderItem={ListItem}
            keyExtractor={item => item.id}
            refreshing={isLoading}
            showsVerticalScrollIndicator={false}
          />
          <ButtonRefresh refreshFunction={getFilesFromGDrive} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E7EBF8',
  },
  listItems: {
    paddingHorizontal: 10,
    width: '100%',
    height: '100%',
  },
});

export default App;
