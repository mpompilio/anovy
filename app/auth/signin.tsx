import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Auth } from 'aws-amplify';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const user = await Auth.signIn(username, password);
      console.log('Sign-in successful:', user);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Sign In</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}
