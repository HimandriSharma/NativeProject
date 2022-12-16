/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
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
    <View>
      {!user ? (
        <>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Sign Up" onPress={() => createUser()} />
        </>
      ) : (
        <>
          <Text>Welcome, {user.email}</Text>
          <Button title="Log Out" onPress={() => LogOut()} />
        </>
      )}
      {/* <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={() => createUser()} />
      <Button title="Log Out" onPress={() => LogOut()} /> */}
    </View>
  );
};
export default SignUpForm;
