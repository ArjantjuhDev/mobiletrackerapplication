import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TwoFAScreen = ({ navigation }: any) => {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    // Hier komt de 2FA verificatie logica
    navigation.navigate('AdminDashboard'); // Of MemberDashboard afhankelijk van rol
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Twee-factor authenticatie</Text>
      <Text>Voer de code in die je per e-mail/SMS hebt ontvangen.</Text>
      <TextInput
        style={styles.input}
        placeholder="2FA Code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <Button title="Verifiëren" onPress={handleVerify} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: 250, height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
});

export default TwoFAScreen;
