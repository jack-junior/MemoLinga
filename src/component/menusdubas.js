import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, View, Modal, Text,Linking, TouchableOpacity} from 'react-native';
import Recherche from '../screen/dico';
import Practice from '../screen/practice';
import Social from '../screen/social';
import Home from '../screen/home';
import icons from '../constants/icons';

const Tab = createBottomTabNavigator();

const MenuBas = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDictionaryPress = () => {
    setModalVisible(true);
  };

  const handlePracticePress = () => {
    setModalVisible(true);
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:focusgeek0@gmail.com');
  };

  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarLabelStyle: {
            fontSize: 16, // Changer la taille de la police
            color: 'white', // Changer la couleur des étiquettes
          },
          headerShown: false,
          tabBarStyle: [
            {
              display: 'flex',
              backgroundColor: 'blue', // Changer la couleur de la barre de tabulation en bleu
            },
            null,
          ],
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => (
              <Image
                source={icons.acceuil}
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: 10,
                }}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Practice"
          component={Recherche}
          options={{
            tabBarLabel: 'Practice',
            tabBarIcon: () => (
              <Image
                source={icons.exo}
                style={{width: 24, height: 24, marginLeft: 10}}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Dictionary"
          component={Practice}
          options={{
            tabBarLabel: 'Dictionary',
            tabBarIcon: () => (
              <Image
                source={icons.diction}
                style={{width: 24, height: 24, marginLeft: 10}}
              />
            ),
            tabBarButton: props => (
              <TouchableOpacity {...props} onPress={handleDictionaryPress} />
            ),
          }}
        />

        <Tab.Screen
          name="Social"
          component={Social}
          options={{
            tabBarLabel: 'Social',
            tabBarIcon: () => (
              <Image
                source={icons.reseau}
                style={{width: 24, height: 24, marginLeft: 10}}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Image
              source={icons.logo}
              style={{width: 190, height: 100, resizeMode: 'contain'}}
            />
            <Text style={{marginTop: 10, fontWeight: 'bold', color: '#000'}}>
              Available Soon {'\n'}
              Register your email address to receive all our updates. {'\n\n'}
              1- Go to the home page. {'\n'}
              2- Press the plus button. {'\n'}
              3- Register your email address.
            </Text>
            <Text style={{marginTop: 10,  color: '#000'}}>
            You can also leave us a short message by clicking on this link below. {'\n'}
            </Text>
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                focusgeek0@gmail.com
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  fontSize: 20,
                  color: 'blue',
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MenuBas;
