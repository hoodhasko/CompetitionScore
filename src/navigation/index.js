import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import ListFiles from '../screens/ListFiles.js';
import ListSheets from '../screens/ListSheets.js';
import InputScore from '../screens/InputScore.js';

const Stack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="ListFiles"
      headerMode="none"
      screenOptions={{animationEnabled: false}}>
      <Stack.Screen name="ListFiles" component={ListFiles} />
      <Stack.Screen name="ListSheets" component={ListSheets} />
      <Stack.Screen name="InputScore" component={InputScore} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
