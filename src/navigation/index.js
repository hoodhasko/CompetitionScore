import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';

import ListFiles from '../screens/ListFiles.js';
import ListSheets from '../screens/ListSheets.js';
import ListAthletes from '../screens/ListAthletes.js';
import InputScore from '../screens/InputScore.js';

const Stack = createStackNavigator();

// Не нашел другого решения передачи callback через navigate поэтому игнорю warning
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="ListFiles"
      headerMode="none"
      screenOptions={{animationEnabled: false}}>
      <Stack.Screen name="ListFiles" component={ListFiles} />
      <Stack.Screen name="ListSheets" component={ListSheets} />
      <Stack.Screen name="ListAthletes" component={ListAthletes} />
      <Stack.Screen name="InputScore" component={InputScore} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
