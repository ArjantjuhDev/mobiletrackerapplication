import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../screens/AdminDashboard';
import MemberDashboard from '../screens/MemberDashboard';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TwoFAScreen from '../screens/TwoFAScreen';
import KoppelCodeScreen from '../screens/KoppelCodeScreen';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();


const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkKoppelStatus = async () => {
      if (Platform.OS === 'android') {
        const status = await SecureStore.getItemAsync('koppelStatus');
        setInitialRoute(status === 'gekoppeld' ? 'LoginScreen' : 'KoppelCodeScreen');
      } else {
        setInitialRoute('LoginScreen');
      }
    };
    checkKoppelStatus();
  }, []);

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="KoppelCodeScreen" component={KoppelCodeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="TwoFAScreen" component={TwoFAScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="MemberDashboard" component={MemberDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
