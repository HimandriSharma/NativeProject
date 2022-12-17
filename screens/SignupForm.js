/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import AppScreen from './AppScreen';
import PushNotification from 'react-native-push-notification';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  // eslint-disable-next-line no-shadow
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'red-button-channel',
      channelName: 'Red Button Channel',
    });
  };
  useEffect(() => {
    createChannels();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }
  const createUser = () => {
    console.log('button clicked');
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  const LogOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <>
      {!user ? (
        <View style={styles.container}>
          <FormInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <FormButton buttonTitle="Sign Up" onPress={() => createUser()} />
        </View>
      ) : (
        <AppScreen />
        // <FormButton buttonTitle="Sign Up" onPress={() => LogOut()} />
      )}
    </>
  );
};
export default SignUpForm;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
