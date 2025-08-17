import { View, Text, Button } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login Screen</Text>
      <Button title="Login" onPress={() => alert('Login!')} />
    </View>
  );
}
