import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

// Mock user database (importeer uit LoginScreen)
import { users } from './LoginScreen';

const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = () => {
    if (!username || !password || !email) {
      setError('Vul alle velden in');
      return;
    }
    if (users.find(u => u.username === username)) {
      setError('Gebruikersnaam bestaat al');
      return;
    }
    users.push({ username, password, email, role: 'member' });
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registreren</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Gebruikersnaam"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Wachtwoord"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Account aanmaken" onPress={handleRegister} />
      <Button title="Terug naar login" onPress={() => navigation.navigate('LoginScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: 250, height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
});

export default RegisterScreen;
