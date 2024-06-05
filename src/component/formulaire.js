import React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firestore from '@react-native-firebase/firestore';
import icons from '../constants/icons';
import { Modal } from 'react-native-paper';

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Email invalide').required('Email requis'),
});

const Formulaire = ({ modalVisible, handleCloseModal }) => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const emailsRef = firestore().collection('emails');
      const emailQuerySnapshot = await emailsRef
        .where('email', '==', values.email)
        .get();
  
      if (!emailQuerySnapshot.empty) {
        Alert.alert('Erreur', 'Cet email est déjà enregistré.');
      } else {
        await emailsRef.add({
          email: values.email,
        });
        resetForm();
        Alert.alert('Succès', 'Email sauvegardé avec succès. Veuillez vérifier votre email pour confirmer.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', "Échec de la sauvegarde de l'email");
    }
  };
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Image source={icons.logo} style={styles.logo} />
          </View>

          <Text style={styles.textArea}>
            
            Register your e-mail address {'\n'}
            so as not to miss the latest update.
          </Text>

          <Formik
            initialValues={{ email: '' }}
            validationSchema={EmailSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Your Email"
                  placeholderTextColor="#000" 
                />
                {errors.email && touched.email ? (
                  <Text style={styles.error}>{errors.email}</Text>
                ) : null}

<TouchableOpacity style={styles.button} onPress={handleSubmit}>
    <Text style={styles.buttonText}>Submit</Text>
  </TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={handleCloseModal}>
    <Text style={styles.buttonText}>Close</Text>
  </TouchableOpacity>

               
                
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: 420,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 190,
    height: 100,
    resizeMode: 'contain',
  },
  textArea: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Formulaire;
