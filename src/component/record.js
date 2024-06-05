import React from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import icons from '../constants/icons';

function Record({handleCloseModal, modalVisible}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Image source={icons.logo} style={styles.logo} />
          </View>

          {/* Champ texte */}
          <View style={styles.inputContainer}>
            <TextInput placeholder="Nom" style={styles.input} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput placeholder="Choisir une photo" style={styles.input} />
          </View>

          {/* Champs de paragraphe */}
          <View style={styles.textAreaContainer}>
            <View>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCloseModal}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
  textAreaContainer: {
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentArea: {
    height: 100, // Hauteur supplémentaire pour le champ de commentaire
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour le modal
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%', // Largeur du contenu modal
  },

  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    marginBottom: 2,
    marginTop: 2,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Record;
