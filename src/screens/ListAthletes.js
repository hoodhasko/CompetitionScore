import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';

import {getAthletesFromSheet} from '../api/api';

import Header from '../components/Header';
import Loader from '../components/Loader';
import ListItem from '../components/ListItem';
import ButtonRefresh from '../components/ButtonRefresh';

const ListAthletes = ({route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [athletes, setAthletes] = useState();
  const {sheetId, sheetName} = route.params;

  const getAthletes = async () => {
    setIsLoading(true);
    const athletes = await getAthletesFromSheet(sheetId, sheetName);

    setAthletes(athletes);

    if (athletes !== undefined) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAthletes();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.listItems}>
          <Header title="Спортсмены" />
          <FlatList
            data={athletes}
            renderItem={item => (
              <ListItem
                id={item.item.id}
                title={item.item.name}
                onPress={() => console.log('click')}
              />
            )}
            keyExtractor={item => item.id}
            refreshing={isLoading}
            showsVerticalScrollIndicator={false}
          />
          <ButtonRefresh refreshFunction={getAthletes} />
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

export default ListAthletes;
