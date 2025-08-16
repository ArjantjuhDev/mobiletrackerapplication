import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { linkDevice, getDevices, lockDevice, unlockDevice, followDevice, controlDevice } from '../api/deviceApi';

// ...existing code...

// ...verwijderd: dubbele definitie...
const MemberDashboard = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isWeb = Platform.OS === 'web';
  const themedStyles = isWeb ? webStyles : androidStyles;

  useEffect(() => {
    setLoading(true);
    getDevices('userId')
      .then(devs => setDevices(devs))
      .catch(() => setError('Kan toestellen niet ophalen'))
      .finally(() => setLoading(false));
  }, []);

  const handleLinkDevice = async () => {
    setLoading(true);
    try {
      const res = await linkDevice({ name: 'Nieuw toestel', status: 'Actief', locked: false, location: 'Onbekend' });
      if (res.success) setDevices([...devices, res.device]);
    } catch {
      setError('Koppelen mislukt');
    }
    setLoading(false);
  };

  const handleFollowDevice = async (id: string) => {
    setLoading(true);
    try {
      const res = await followDevice(id);
      Alert.alert('Locatie', `Locatie: ${res.location}, Status: ${res.status}`);
    } catch {
      setError('Volgen mislukt');
    }
    setLoading(false);
  };

  const handleLockDevice = async (id: string) => {
    setLoading(true);
    try {
      const res = await lockDevice(id);
      if (res.success) setDevices(devices.map(d => d.id === id ? { ...d, locked: true } : d));
    } catch {
      setError('Locken mislukt');
    }
    setLoading(false);
  };

  const handleUnlockDevice = async (id: string) => {
    setLoading(true);
    try {
      const res = await unlockDevice(id);
      if (res.success) setDevices(devices.map(d => d.id === id ? { ...d, locked: false } : d));
    } catch {
      setError('Unlocken mislukt');
    }
    setLoading(false);
  };

  const handleControlDevice = async (id: string) => {
    setLoading(true);
    try {
      const res = await controlDevice(id, 'bedien');
      if (res.success) Alert.alert('Bediening', 'Actie uitgevoerd');
    } catch {
      setError('Bedienen mislukt');
    }
    setLoading(false);
  };

  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Leden Dashboard</Text>
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button title="Toestel koppelen" onPress={handleLinkDevice} />
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={devices}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={themedStyles.deviceRow}>
              <View>
                <Text style={themedStyles.deviceName}>{item.name}</Text>
                <Text>Status: {item.status}</Text>
                <Text>Locatie: {item.location}</Text>
                <Text>Lock: {item.locked ? 'Ja' : 'Nee'}</Text>
              </View>
              <View style={themedStyles.actions}>
                <TouchableOpacity onPress={() => handleFollowDevice(item.id)} style={themedStyles.actionBtn}>
                  <Text style={themedStyles.actionText}>Volgen</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleControlDevice(item.id)} style={themedStyles.actionBtn}>
                  <Text style={themedStyles.actionText}>Bedienen</Text>
                </TouchableOpacity>
                {item.locked ? (
                  <TouchableOpacity onPress={() => handleUnlockDevice(item.id)} style={themedStyles.actionBtn}>
                    <Text style={themedStyles.actionText}>Unlock</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => handleLockDevice(item.id)} style={themedStyles.actionBtn}>
                    <Text style={themedStyles.actionText}>Lock</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};


const webStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#181818', padding: 40 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 32, color: '#f5f5f5' },
  deviceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 600, padding: 20, backgroundColor: '#232323', marginBottom: 16, borderRadius: 8, borderWidth: 1, borderColor: '#333', boxShadow: '0 2px 8px #0006' },
  deviceName: { fontWeight: 'bold', fontSize: 18, color: '#f5f5f5' },
  actions: { flexDirection: 'row' },
  actionBtn: { marginLeft: 16, padding: 10, backgroundColor: '#007bff', borderRadius: 4 },
  actionText: { color: '#fff', fontWeight: 'bold' },
});

const androidStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#222' },
  deviceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 300, padding: 10, backgroundColor: '#fff', marginBottom: 8, borderRadius: 5, borderWidth: 1, borderColor: '#eee' },
  deviceName: { fontWeight: 'bold', fontSize: 16, color: '#222' },
  actions: { flexDirection: 'row' },
  actionBtn: { marginLeft: 10, padding: 5, backgroundColor: '#007bff', borderRadius: 3 },
  actionText: { color: '#fff' },
});

export default React.memo(MemberDashboard);
