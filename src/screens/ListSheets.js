import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';

import {getSheetsFromSpreadSheet} from '../api/api';

import Header from '../components/Header';
import Loader from '../components/Loader';
import ListItem from '../components/ListItem';
import ButtonRefresh from '../components/ButtonRefresh';

const ListSheets = ({route}) => {
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
                id={item.item.id}
                title={item.item.properties.title}
                onPress={() => console.log('click')}
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
  item: {
    height: 60,
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
    borderRadius: 16,

    elevation: 1,
  },
  itemText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#464B7B',
  },
});

export default ListSheets;
