import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Routes from './src/Routes';
import icons from './src/constants/icons';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  {
    /*useEffect(() => {
    const checkFirebaseConnection = async () => {
      try {
        await firestore().collection('test').get();
        console.log('Firebase is connected!');
      } catch (error) {
        console.error('Error connecting to Firebase:', error);
      }
    };

    checkFirebaseConnection();
  }, []);*/
  }

  
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
   
  }, []);
  

  return (
    <View style={{flex: 1}}>
      <View style={Homestyle.Header}>
        <Image
          source={icons.logo2}
          style={Homestyle.logo}
          resizeMode="contain"
        />
        <View style={Homestyle.textconteneur}>
          <Text style={Homestyle.memo}>MemoLinga</Text>
        </View>
      </View>

      <Routes />
    </View>
  );
};

const Homestyle = StyleSheet.create({
  logo: {
    width: 120,
    height: 50,
  },

  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    backgroundColor: 'blue',
  },

  textconteneur: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },

  memo: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  addButton: {
    backgroundColor: 'blue', // Couleur de fond du bouton
    alignItems: 'center',
    justifyContent: 'center',
    width: 60, // Largeur du bouton
    height: 60, // Hauteur du bouton
    borderRadius: 30, // Pour rendre le bouton rond, la moitié de la largeur/hauteur
    position: 'absolute', // Position absolue pour placer le bouton où vous le souhaitez dans votre vue
    bottom: 60, // Ajustez ces valeurs pour placer le bouton où vous le souhaitez
    right: 20,
  },
});
export default App;
