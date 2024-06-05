import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Tableau from '../component/tableau';
import icons from '../constants/icons';
import Formulaire from '../component/formulaire';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tableau />
      <TouchableOpacity style={Homestyle.addButton} onPress={handleOpenModal}>
        <Image source={icons.plus} style={{ width: 60, height: 60 }} />
      </TouchableOpacity>

      {modalVisible && (
        <Formulaire
          modalVisible={modalVisible}
          handleCloseModal={handleCloseModal}
        />
      )}
    </View>
  );
};

const Homestyle = StyleSheet.create({
  addButton: {
   // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default Home;
