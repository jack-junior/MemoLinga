import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const TableauItem = ({titre, data, numberColumn, handleOpenDetail}) => {
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleOpenDetail(item)}
      style={styles.item}>
      <Text style={{fontSize: 16, color:'#000', fontWeight:'bold'}}>{item?.word}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.column}>
      <Text style={styles.header}>{titre}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={numberColumn}
        keyExtractor={item => item?.word}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    color: '#000',
    backgroundColor: '#4BAE4F',
    flexDirection: 'row',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 1,
    width: '150%',
    //alignItems: "center",
    justifyContent: 'center',
    textAlign: 'center',
    //margin: 5,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
});

export default TableauItem;
