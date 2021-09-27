import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, StyleSheet} from 'react-native';

import {getAthletesFromSheet} from '../api/api';

import Header from '../components/Header';
import SubTitle from '../components/SubTitle';
import Loader from '../components/Loader';
import ListItem from '../components/ListItem';
import ButtonRefresh from '../components/ButtonRefresh';

const ListAthletes = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [athletes, setAthletes] = useState();
  const {spreadSheetId, category, sheetName} = route.params;

  useEffect(() => {
    getAthletes();
  }, []);

  const getAthletes = async () => {
    setIsLoading(true);
    const arrayAthletes = await getAthletesFromSheet(spreadSheetId, sheetName);

    if (arrayAthletes !== undefined) {
      setIsLoading(false);
    }

    setAthletes(arrayAthletes);
  };

  const navigateToInputScore = ({athlete}) => {
    navigation.navigate('InputScore', {
      spreadSheetId: spreadSheetId,
      category: category,
      nomination: sheetName,
      athlete,
      athletes: athletes,
      getAthletes,
    });
  };

  return (
    <SafeAreaView style={styles.root}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.listItems}>
          <Header title="Спортсмены" buttonBack />
          <SubTitle category={category} nomination={sheetName} />
          <FlatList
            data={athletes}
            renderItem={item => (
              <ListItem
                id={item.item.id}
                title={item.item.name}
                athlete={item.item}
                onPress={navigateToInputScore}
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
