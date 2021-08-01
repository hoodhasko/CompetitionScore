import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, Text, StyleSheet} from 'react-native';

import {getAthletesFromSheet} from '../api/api';

import Header from '../components/Header';
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

  const navigateToInputScore = ({id, title, score}) => {
    navigation.navigate('InputScore', {
      spreadSheetId: spreadSheetId,
      id,
      athleteName: title,
      category: category,
      nomination: sheetName,
      score,
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
          <Text style={styles.subTitle}>
            Категория: {category} Номинация: {sheetName}
          </Text>
          <FlatList
            data={athletes}
            renderItem={item => (
              <ListItem
                id={item.item.id}
                title={item.item.name}
                score={item.item.score}
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
  subTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
});

export default ListAthletes;
