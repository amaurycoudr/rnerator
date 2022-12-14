import { Extension } from '../type/type';
import { getFileName, getNoTextIfJs } from '../utils/string';

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

const home = (extension: Extension) => {
  const textIfTs = getNoTextIfJs(extension);
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

const wrapper = (extension: Extension) => {
  const textIfTs = getNoTextIfJs(extension);
  return `import React,${textIfTs(' { FC }')} from 'react';

const Wrapper${textIfTs(': FC')} = ({ children }) => <>{children}</>;

export default Wrapper;`;
};
const getSandboxContent = (extension: Extension = 'ts') => {
  const getReactFileName = getFileName({ extension, isReactFile: true });

  return {
    [getReactFileName('App')]: app,
    [getReactFileName('Home')]: home(extension),
    [getReactFileName('Navigator')]: navigator,
    [getReactFileName('Wrapper')]: wrapper(extension),
  };
};

export default getSandboxContent;
