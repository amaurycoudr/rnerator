// @ts-nocheck
/* eslint-disable */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator';
import Wrapper from './Wrapper';

function App() {
  return (
    <Wrapper>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Wrapper>
  );
}

export default App;
