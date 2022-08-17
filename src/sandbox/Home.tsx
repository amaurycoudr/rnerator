// @ts-nocheck
/* eslint-disable */
// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ListRenderItem,
  StyleSheet,
} from 'react-native';
import data from './sandboxFiles';

const HomeScreen = ({ navigation }) => {
  const renderItem: ListRenderItem<typeof data[number]> = ({ item }) => {
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
};
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
