import React, {useEffect} from 'react';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import {useAppState} from '@react-native-community/hooks';

import Navigation from './src/navigation';

const App = () => {
  const currentAppState = useAppState();
  useEffect(() => {
    if (currentAppState === 'active') {
      hideNavigationBar();
    }
  }, [currentAppState]);

  return <Navigation />;
};

export default App;
