import * as React from 'react';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import InputScore from './src/screens/InputScore.js';
import GoogleSignButton from './src/components/GoogleSignButton.js';

function HomeScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text>Домашний экран2</Text>
      <GoogleSignButton />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="inputScore" component={InputScore} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
