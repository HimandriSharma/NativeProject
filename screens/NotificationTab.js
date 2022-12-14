import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const BigRedButton = () => {
  const sendNotification = () => {
    if (Platform !== 'ios') {
      PushNotification.localNotification({
        channelId: 'red-button-channel',
        title: 'Clicked Red Button',
        message:
          'You are receiving this notification because you click the big red button in your app.',
      });
    } else {
      PushNotificationIOS.addNotificationRequest({
        alertTitle: 'Clicked Red Button',
        alertBody:
          'You are receiving this notification because you click the big red button in your app.',
      });
    }
  };

  return (
    <View style={styles.view}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          sendNotification();
        }}>
        <Text style={styles.white_text_color}>Press Me</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BigRedButton;
const styles = StyleSheet.create({
  center_items: {},
  container: {
    backgroundColor: 'red',
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  white_text_color: {
    color: 'white',
  },
});
