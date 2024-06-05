import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Image,
  NativeEventEmitter,
  ScrollView,
} from 'react-native';
import texte from '../constants/texte';
import icons from '../constants/icons';
import {COLORS} from '../constants/theme';
import Tts from 'react-native-tts';
import SoundPlayer from 'react-native-sound';

const Details = ({handleCloseDetail, detailVisible, selectedWord}) => {
  const [currentPlayingWordId, setCurrentPlayingWordId] = useState(null);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    Tts.setDefaultLanguage('en-US');

    const ttsEventEmitter = new NativeEventEmitter(Tts);

    const onTtsFinish = () => {
      console.log('TTS Playback Finished');
      setCurrentPlayingWordId(null);
    };

    ttsEventEmitter.addListener('tts-finish', onTtsFinish);

    return () => {
      ttsEventEmitter.removeAllListeners('tts-finish');
    };
  }, []);

  useEffect(() => {
    if (selectedWord?.audioFile) {
      const soundInstance = new SoundPlayer(
        selectedWord.audioFile,
        SoundPlayer.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log('Failed to load the sound', error);
            return;
          }
          setSound(soundInstance);
        },
      );

      return () => {
        if (sound) {
          sound.release();
        }
      };
    }
  }, [selectedWord]);

  const handleToggleTts = item => {
    const wordToSpeak = item.word.replace(/\[([^[\]]+)\]/, '').trim();

    if (currentPlayingWordId === wordToSpeak) {
      Tts.stop();
      setCurrentPlayingWordId(null);
    } else {
      Tts.speak(wordToSpeak);
      setCurrentPlayingWordId(wordToSpeak);
    }
  };

  const handlePlayAudio = () => {
    if (sound) {
      sound.play(success => {
        if (!success) {
          console.log('Sound playback failed');
        }
      });
    }
  };

  const renderRowWithIcon_2 = ({item}) => (
    <View style={styles.row}>
      <View style={{width: '60%'}}>
        <Text style={{color: '#000'}}>{item.word}</Text>
      </View>
      <TouchableOpacity onPress={() => handleToggleTts(item)}>
        <Image
          source={currentPlayingWordId === item.word ? icons.pause : icons.play}
          style={{width: 24, height: 24}}
        />
      </TouchableOpacity>
    </View>
  );

  const renderRowWithIcon_1 = ({item, index}) => {
    if (index === 0) {
      return (
        <View style={styles.row}>
          <View style={{width: '60%'}}>
            <Text style={{color: '#000'}}>{item.word}</Text>
          </View>
          <TouchableOpacity onPress={() => handleToggleTts(item)}>
            <Image
              source={
                currentPlayingWordId === item.word ? icons.pause : icons.play
              }
              style={{width: 24, height: 24}}
            />
            <Text style={{color: '#000'}}>Alphabet</Text>
          </TouchableOpacity>
          {selectedWord?.audioFile && (
            <TouchableOpacity onPress={handlePlayAudio}>
              <Image source={icons.audio} style={{width: 24, height: 24}} />
              <Text style={{color: '#000'}}>Phonetic</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.row}>
          <View style={{width: '60%'}}>
            <Text style={{color: '#000'}}>{item.word}</Text>
          </View>
          <TouchableOpacity onPress={() => handleToggleTts(item)}>
            <Image
              source={
                currentPlayingWordId === item.word ? icons.pause : icons.play
              }
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={detailVisible}
      onRequestClose={handleCloseDetail}>
      <View style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.section}>
            <Text style={styles.title}>{texte.commonS}</Text>
            <FlatList
              data={selectedWord?.commonSpelling}
              renderItem={renderRowWithIcon_1}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {/*tableau 2*/}
          <View style={styles.section}>
            <Text style={styles.title}>{texte.alternativeS}</Text>
            <View style={styles.twoColumn}>
              <FlatList
                data={selectedWord?.alternativeSpelling}
                renderItem={renderRowWithIcon_2}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <TouchableOpacity
              onPress={handleCloseDetail}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  section2: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height:1111
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  twoColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: COLORS.principal,
    padding: 10,
    //marginBottom: 2,
    marginTop: 2,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  scroll: {
    padding: 20,
    flex: 1,
    width: '100%',
    
  },
});

export default Details;
