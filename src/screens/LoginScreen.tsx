import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';

// Mock user database
export const users: any[] = [
  { username: 'admin', password: 'admin123', role: 'admin' },
];

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      setError('Ongeldige gebruikersnaam of wachtwoord');
      return;
    }
    if (user.role === 'admin') {
      navigation.navigate('AdminDashboard');
    } else {
      navigation.navigate('MemberDashboard');
    }
  };

  const isWeb = Platform.OS === 'web';
  const themedStyles = isWeb ? webStyles : androidStyles;
  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Inloggen</Text>
      {error && <Text style={{ color: '#ff1744', fontWeight: 'bold' }}>{error}</Text>}
      <TextInput
        style={themedStyles.input}
        placeholder="Gebruikersnaam"
        placeholderTextColor={isWeb ? '#aaa' : '#888'}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={themedStyles.input}
        placeholder="Wachtwoord"
        placeholderTextColor={isWeb ? '#aaa' : '#888'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} color={isWeb ? '#007bff' : undefined} />
    </View>
  );
};


const webStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 32, color: '#f5f5f5' },
  input: { width: 350, height: 48, borderColor: '#333', borderWidth: 1, marginBottom: 16, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#232323', color: '#f5f5f5', fontSize: 18 },
});

const androidStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#222' },
  input: { width: 250, height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5, backgroundColor: '#fff', color: '#222', fontSize: 16 },
});

export default LoginScreen;
