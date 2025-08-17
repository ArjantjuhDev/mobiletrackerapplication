import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';

const mockUsers = [
  { id: '1', username: 'admin', role: 'Admin' },
  { id: '2', username: 'member1', role: 'Member' },
  { id: '3', username: 'member2', role: 'Member' },
];

type AdminDashboardProps = {
// Removed React Navigation imports. Use Expo Router navigation hooks if needed.
const AdminDashboard = () => {
  const mockUsersWithPhone = [
    { id: '1', username: 'admin', role: 'admin', phoneConnected: true },
    { id: '2', username: 'lid1', role: 'member', phoneConnected: false },
    { id: '3', username: 'lid2', role: 'member', phoneConnected: true },
  ];
  const [users, setUsers] = useState(mockUsersWithPhone);

  const handleCreate = () => {
    // Hier komt logica voor account aanmaken
  };
  const handleEdit = (id: string) => {
    // Hier komt logica voor account wijzigen
  };

  const handleResetPassword = (id: string) => {
    // Mock wachtwoord reset
    alert(`Wachtwoord voor gebruiker ${id} is gereset.`);
  };

  const handleBackendReset = () => {
    // Mock backend reset
    alert('Backend is gereset.');
  };
  const handleDelete = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const isWeb = Platform.OS === 'web';
  const themedStyles = isWeb ? webStyles : androidStyles;
  return (
    <View style={themedStyles.container}>
      <Text style={themedStyles.title}>Admin Dashboard</Text>
  {/* Replace navigation logic with Expo Router if needed */}
  <Button title="Lid toevoegen" onPress={() => alert('Navigatie naar RegisterScreen!')} color={isWeb ? '#007bff' : undefined} />
      <View style={{ marginVertical: 10 }}>
        <Button title="Reset backend" color={isWeb ? '#d9534f' : undefined} onPress={handleBackendReset} />
      </View>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={themedStyles.userRow}>
            <View style={{ flex: 1 }}>
              <Text style={themedStyles.userText}>{item.username} ({item.role})</Text>
              <Text style={{ color: item.phoneConnected ? '#00e676' : '#ff1744', fontWeight: 'bold' }}>
                Telefoon: {item.phoneConnected ? 'Aangesloten' : 'Niet aangesloten'}
              </Text>
            </View>
            <View style={themedStyles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item.id)} style={themedStyles.actionBtn}>
                <Text style={themedStyles.actionText}>Wijzig</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={themedStyles.actionBtn}>
                <Text style={themedStyles.actionText}>Verwijder</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleResetPassword(item.id)} style={[themedStyles.actionBtn, { backgroundColor: isWeb ? '#f0ad4e' : '#ffb300' }]}> 
                <Text style={themedStyles.actionText}>Reset wachtwoord</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};


const webStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#181818', padding: 40 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 32, color: '#f5f5f5' },
  userRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 600, padding: 20, backgroundColor: '#232323', marginBottom: 16, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  userText: { color: '#f5f5f5', fontSize: 18 },
  actions: { flexDirection: 'row' },
  actionBtn: { marginLeft: 16, padding: 10, backgroundColor: '#007bff', borderRadius: 4 },
  actionText: { color: '#fff', fontWeight: 'bold' },
});

const androidStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#222' },
  userRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 300, padding: 10, backgroundColor: '#fff', marginBottom: 8, borderRadius: 5, borderWidth: 1, borderColor: '#eee' },
  userText: { color: '#222', fontSize: 16 },
  actions: { flexDirection: 'row' },
  actionBtn: { marginLeft: 10, padding: 5, backgroundColor: '#007bff', borderRadius: 3 },
  actionText: { color: '#fff' },
});

export default React.memo(AdminDashboard);
