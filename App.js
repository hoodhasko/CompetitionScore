import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import {signIn, getFiles} from './src/components/authGoogle';
import InputScore from './src/screens/InputScore.js';
const Drawer = createDrawerNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState();
  const [accessToken, setAccessToken] = useState();

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.item} onPress={() => console.log('click')}>
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const Header = ({title}) => (
    <View style="styles.header">
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
  const ButtonRefresh = () => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => getFilesFromGDrive(accessToken)}>
      <Text style={styles.buttonText}>Обновить</Text>
    </TouchableOpacity>
  );

  const auth = async () => {
    setIsLoading(true);
    const token = await signIn();
    setAccessToken(token);
  };

  const getFilesFromGDrive = async token => {
    setIsLoading(true);

    const listFiles = await getFiles(token);

    setFiles(listFiles.files);

    if (listFiles !== undefined) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    getFilesFromGDrive(accessToken);
  }, [accessToken]);

  return (
    <View style={styles.root}>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={70 || 'large'} color="#3D4785" />
          <Text style={styles.loadingText}>Идет загрузка...</Text>
        </View>
      ) : (
        <View style={styles.itemList}>
          <Header title="Номинации" />
          <FlatList
            data={files}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshing={isLoading}
            showsVerticalScrollIndicator={false}
          />
          <ButtonRefresh />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EBF8',
  },
  loading: {
    backgroundColor: 'white',
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    height: 200,
    borderRadius: 20,

    elevation: 3,
  },
  loadingText: {
    color: '#535353',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
  },
  itemList: {
    paddingHorizontal: 10,
    paddingTop: 15,
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

    elevation: 2,
  },
  itemText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#545A94',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#3E4685',
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    height: 50,
    width: '40%',

    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
  },
  header: {
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 36,
    fontWeight: '700',
    borderBottomColor: 'black',
    marginBottom: 10,
  },
});

export default App;
