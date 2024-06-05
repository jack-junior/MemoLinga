import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert // Importer Alert depuis react-native
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Tts from 'react-native-tts';
import Voice from '@react-native-voice/voice';
import { NativeEventEmitter, NativeModules } from 'react-native';

const Recherche = () => {
  const [recherche, setRecherche] = useState('');
  const [resultat, setResultat] = useState('');
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  const validerRecherche = () => {
    setResultat(recherche);
  };

  const lireResultat = () => {
    Tts.speak(resultat);
  };

  const startListening = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
      if (!recognizedText) { // Vérifier si aucun son n'a été enregistré
        setError('No speech detected. Please try again.'); // Définir le message d'erreur
      } else {
        setError(''); // Réinitialiser le message d'erreur si un son a été enregistré
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');

    const ttsEventEmitter = new NativeEventEmitter(NativeModules.TextToSpeech);
    const onTtsFinish = () => {
      console.log('TTS Playback Finished');
    };

    ttsEventEmitter.addListener('tts-finish', onTtsFinish);

    return () => {
      ttsEventEmitter.removeAllListeners('tts-finish');
    };
  }, []);

  useEffect(() => {
    Voice.onSpeechResults = event => {
      setRecognizedText(event.value[0]);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Write and Listen</Text>
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              placeholderTextColor={'#000'}
              value={recherche}
              onChangeText={text => setRecherche(text)}
              
            />
            <Button title="Submit" onPress={validerRecherche} />
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultHeader}>Result:</Text>
            <Text style={styles.resultText}>{resultat}</Text>
          </View>

          <TouchableOpacity style={styles.readButton} onPress={lireResultat}>
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Path d="M3 22v-20l18 10-18 10z" fill="#FFFFFF" />
            </Svg>
            <Text style={styles.readButtonText}>Read Result</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ScrollView contentContainerStyle={styles.sectionContainer}>
        <Text style={styles.sectionHeader}>Speak and Transcribe</Text>
        <View style={styles.searchBoxContainer}>
          <View style={styles.voiceRecognitionContainer}>
            <Text style={styles.instructions}>
              Press the button and speak to record your search:
            </Text>

            <TouchableOpacity
              style={styles.listenButton}
              onPress={isListening ? stopListening : startListening}>
              <Svg width={24} height={24} viewBox="0 0 24 24">
                <Path
                  d="M12 2c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm-2 10.5h-1v-3h1v3zm4 0h-1v-3h1v3z"
                  fill="#FFFFFF"
                />
              </Svg>
              <Text style={styles.listenButtonText}>
                {isListening ? 'Stop Listening' : 'Start Listening'}
              </Text>
            </TouchableOpacity>

            <View />
            <View style={styles.resultContainerVoice}>
              <Text style={styles.recognizedText}>{recognizedText}</Text>
            </View>
          </View>
        </View>
        {error ? (
          <Text style={styles.errorText}>{error}</Text> // Afficher le message d'erreur si présent
        ) : null}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  sectionHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
    color: 'black',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    color: 'black',
    fontWeight:'bold'
  },
  resultContainer: {
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    padding: 10,
  },
  resultHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  resultText: {
    fontSize: 14,
    color: 'black',
  },
  readButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  readButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  searchBoxContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowradius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceRecognitionContainer: {
    marginTop: 20,
    alignItems: 'center',
    height: 200,
  },
  instructions: {
    marginBottom: 10,
    color: 'black',
  },
  recognizedText: {
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  listenButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  listenButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  resultContainerVoice: {
    marginBottom: 20,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    padding: 10,
  },
  errorText: { // Styles for error message
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Recherche;

