import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import SignUpForm from './screens/SignupForm';

const YourApp = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Try editing me! 🎉</Text>
      <SignUpForm />
    </View>
  );
};

export default YourApp;
