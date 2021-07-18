import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';

import {getSheetsFromSpreadSheet} from '../api/api';

import Header from '../components/Header';
import Loader from '../components/Loader';
import ListItem from '../components/ListItem';
import ButtonRefresh from '../components/ButtonRefresh';

const ListSheets = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sheets, setSheets] = useState();
  const {spreadSheetId} = route.params;

  const getSheets = async () => {
    setIsLoading(true);
    const nominations = await getSheetsFromSpreadSheet(spreadSheetId);
    setSheets(nominations);

    if (nominations !== undefined) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSheets();
  }, []);

  const navigateToAthletes = ({id, sheetId, title: name}) => {
    navigation.navigate('ListAthletes', {
      spreadSheetId: id,
      sheetId,
      sheetName: name,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.listItems}>
          <Header title="Номинация" />
          <FlatList
            data={sheets}
            renderItem={item => (
              <ListItem
                id={spreadSheetId}
                sheetId={item.item.properties.sheetId}
                title={item.item.properties.title}
                onPress={navigateToAthletes}
              />
            )}
            keyExtractor={item => item.properties.sheetId}
            refreshing={isLoading}
            showsVerticalScrollIndicator={false}
          />
          <ButtonRefresh refreshFunction={getSheets} />
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

export default ListSheets;
