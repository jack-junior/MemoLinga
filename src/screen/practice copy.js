import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Formulaire from '../component/formulaire';

const Practice = () => {
  const handleGameSelection = game => {
    // Naviguer vers l'écran du jeu sélectionné
  };

  return (
    /* <View style={styles.container}>
      <Text style={styles.title}>Choisissez un jeu :</Text>
      <TouchableOpacity onPress={() => handleGameSelection('MemoryGame')} style={styles.button}>
        <Text style={styles.buttonText}>Jeu de mémoire</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleGameSelection('WordGuessingGame')} style={styles.button}>
        <Text style={styles.buttonText}>Jeu de devinette de mots</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleGameSelection('TranslationGame')} style={styles.button}>
        <Text style={styles.buttonText}>Jeu de traduction</Text>
        </View>
  </TouchableOpacity>*/

    <View style={{flex: 1, backgroundColor: 'rgba(0, 132, 255, 0.5)'}}>
      <Formulaire />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0084ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Practice;
