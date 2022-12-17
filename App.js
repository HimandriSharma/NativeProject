import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppScreen from './screens/AppScreen';
import SignUpForm from './screens/SignupForm';

const YourApp = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <>
      <SignUpForm />
      {/* <AppScreen /> */}
    </>
  );
};

export default YourApp;
