import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        onPress={() => console.log(email, ' ', password)}
      />
    </View>
  );
};
export default SignUpForm;
