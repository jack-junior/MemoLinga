import React, {useState} from 'react';
import { Image, StyleSheet} from 'react-native';
import icons from '../constants/icons';


const Practice = () => {
 

  return (
    <Image
        source={icons.back} 
        style={styles.background}
        resizeMode="cover"
      >
        
      </Image>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '50%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Pour ajouter un overlay semi-transparent
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
});

export default Practice;
