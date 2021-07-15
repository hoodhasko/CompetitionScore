import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import ListFiles from '../screens/ListFiles';
import InputScore from '../screens/InputScore';

const Stack = createStackNavigator();

const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="ListFiles"
      headerMode="none"
      screenOptions={{animationEnabled: false}}>
      <Stack.Screen name="ListFiles" component={ListFiles} />
      <Stack.Screen name="InputScore" component={InputScore} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
