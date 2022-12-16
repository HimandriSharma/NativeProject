import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!',
      )
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
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={() => createUser()} />
    </View>
  );
};
export default SignUpForm;
