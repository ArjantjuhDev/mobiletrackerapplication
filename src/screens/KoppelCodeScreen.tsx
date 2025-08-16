import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { v4 as uuidv4 } from 'uuid';

const KoppelCodeScreen = ({ navigation }: any) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const isAndroid = Platform.OS === 'android';

  useEffect(() => {
    if (isAndroid) {
      SecureStore.getItemAsync('koppelCode').then(async stored => {
        if (stored) {
          console.log('Koppelcode gevonden:', stored);
          setCode(stored);
        } else {
          const newCode = uuidv4().slice(0, 8).toUpperCase();
          await SecureStore.setItemAsync('koppelCode', newCode);
          console.log('Nieuwe koppelcode gegenereerd:', newCode);
          setCode(newCode);
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Koppelcode</Text>
        <Text style={styles.instructions}>Koppelcode wordt opgehaald...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Koppelcode</Text>
      <Text style={styles.code}>{code}</Text>
      <Text style={styles.instructions}>
        Voer deze code in op de website om je toestel te koppelen en te verifiëren.
      </Text>
      <Button title="Koppelen voltooid" onPress={async () => {
        await SecureStore.setItemAsync('koppelStatus', 'gekoppeld');
        navigation.reset({ index: 0, routes: [{ name: 'LoginScreen' }] });
      }} color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#181818' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: '#f5f5f5' },
  code: { fontSize: 36, fontWeight: 'bold', color: '#00e676', marginBottom: 16 },
  instructions: { color: '#aaa', fontSize: 18, textAlign: 'center', marginBottom: 32 },
});

export default KoppelCodeScreen;
