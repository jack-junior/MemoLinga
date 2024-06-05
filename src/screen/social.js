import React, { useState } from 'react';
import { View, StyleSheet, Modal, Image, TouchableOpacity, Text } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';


const Social = () => {
  const [messages, setMessages] = useState([]);

  const onSend = (newMessages = []) => {
    const newMessage = [
      {
        _id: Math.round(Math.random() * 1000000).toString(),
        text: 'Available Soon\nRegister your email address to receive all our updates.\n\n1- Go to the home page.\n2- Press the plus button.\n3- Register your email address.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ];
    setMessages(GiftedChat.append(messages, newMessages));
    setMessages(GiftedChat.append(messages, newMessage));
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0084ff',
          },
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#000',
          },
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        }}
        primaryStyle={{alignItems: 'center'}}
      />
    );
  };

  return (
    <View style={styles.container}>
      
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Social;
