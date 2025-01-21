import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { Auth } from 'aws-amplify';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  // Handle user sign-up
  const handleSignUp = async () => {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email, // You can add more attributes like phone_number if required
        },
      });
      setIsCodeSent(true); // Move to confirmation step
      Alert.alert('Success', 'Sign-up successful! Please check your email for the confirmation code.');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error signing up:', error);
    }
  };

  // Handle user confirmation
  const handleConfirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, code);
      Alert.alert('Success', 'Sign-up confirmed! You can now log in.');
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error confirming sign-up:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Sign Up</Text>
      {!isCodeSent ? (
        <>
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
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
          />
          <Button title="Sign Up" onPress={handleSignUp} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Confirmation Code"
            value={code}
            onChangeText={setCode}
            style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
          />
          <Button title="Confirm Sign Up" onPress={handleConfirmSignUp} />
        </>
      )}
    </View>
  );
}
