import { Extension } from './type';
import { curryFileName, curryTextIfTs } from './utils';

const app = `import * as React from 'react';
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
`;

const home = (isJs: boolean = false) => {
  const textIfTs = curryTextIfTs(isJs);
  return `import * as React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
 ${textIfTs('ListRenderItem')}
  StyleSheet,
} from 'react-native';
import data from './sandboxFiles';

const HomeScreen = ({navigation}${textIfTs(
    ': {navigation: {navigate: Function}}'
  )}) => {
  const renderItem${textIfTs(
    ': ListRenderItem<typeof data[number]>'
  )} = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate(item.location);
        }}
      >
        <Text>➡️ {item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.location}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 20,
    marginHorizontal: 10,
    borderBottomColor: '#2a302fc',
  },
});
export default HomeScreen;
`;
};
const navigator = `import * as React from 'react';
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
`;
const sandboxFiles = (isJs: boolean) => {
  const textIfTs = curryTextIfTs(isJs);

  return `
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS DIRECTLY.\n
/* eslint global-require: off */\n
import { FC } from 'react';

${textIfTs(
  'type SandBoxInfo = { name: string; location: string; component: FC };'
)}

const data${textIfTs(': SandBoxInfo[]')} = [];

export default data;
`;
};
const wrapper = (isJs: boolean) => {
  const textIfTs = curryTextIfTs(isJs);
  return `import React, { FC } from 'react';

const Wrapper${textIfTs(': FC')} = ({ children }) => <>{children}</>;

export default Wrapper;`;
};
const getSandboxContent = (extension: Extension = 'ts') => {
  const isJs = extension === 'js';
  const getReactFileName = curryFileName({ extension, isReactFile: true });
  const getFileName = curryFileName({ extension, isReactFile: false });
  return {
    [getReactFileName('App')]: app,
    [getReactFileName('Home')]: home(isJs),
    [getReactFileName('Navigator')]: navigator,
    [getFileName('sandboxFiles')]: sandboxFiles(isJs),
    [getReactFileName('Wrapper')]: wrapper(isJs),
  };
};

export default getSandboxContent;
