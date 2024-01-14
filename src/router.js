import React, {useEffect} from 'react';
import {Router, Scene, Stack, Tabs, Actions} from 'react-native-router-flux';
import SplashScreen from './views/splashScreen';

const Route = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar={true}>
        <Scene key="splashScreen" component={SplashScreen} initial />
      </Stack>
    </Router>
  );
};

export default Route;
