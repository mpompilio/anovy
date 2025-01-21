import { Text, View, Button } from "react-native";

import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to the App!</Text>
      <Button title="Go to Sign In" onPress={() => router.push('./auth/signin')} />
    </View>
  );
}