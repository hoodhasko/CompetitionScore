import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {getFiles} from '../api/api.js';
import ListItem from '../components/ListItem';
import ButtonRefresh from '../components/ButtonRefresh';
import Header from '../components/Header';
import Loader from '../components/Loader';

const ListFiles = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState();

  const getFilesFromGDrive = async () => {
    setIsLoading(true);

    const listFiles = await getFiles();

    setFiles(listFiles.files);

    if (listFiles !== undefined) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFilesFromGDrive();
  }, []);

  const navigateToSheets = ({id, title}) => {
    navigation.navigate('ListSheets', {
      spreadSheetId: id,
      category: title,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar hidden={true} />
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.listItems}>
          <Header title="Категория" />
          <FlatList
            data={files}
            renderItem={item => (
              <ListItem
                id={item.item.id}
                title={item.item.name}
                onPress={navigateToSheets}
              />
            )}
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

export default ListFiles;
