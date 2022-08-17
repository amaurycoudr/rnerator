// @ts-nocheck
/* eslint-disable */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import data from './sandboxFiles';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {data.map((item) => (
        <Stack.Screen
          name={item.location}
          component={item.component}
          options={{
            title: item.name,
          }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default Navigator;
