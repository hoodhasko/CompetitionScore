import React from 'react';
import {hideNavigationBar} from 'react-native-navigation-bar-color';

import Navigation from './src/navigation';

const App = () => {
  hideNavigationBar();

  return <Navigation />;
};

export default App;
