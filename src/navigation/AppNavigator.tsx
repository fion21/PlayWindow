import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OpenWindowScreen from '../screens/OpenWindowScreen';
import NearbyWindowsScreen from '../screens/NearbyWindowsScreen';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background, // 🔵 dark blue
        },
        headerTintColor: COLORS.text, // white text/icons
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: COLORS.background, // full screen background
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'PlayWindow' }}
      />
      <Stack.Screen
        name="OpenWindow"
        component={OpenWindowScreen}
        options={{ title: 'Open a Window' }}
      />
      <Stack.Screen
        name="NearbyWindows"
        component={NearbyWindowsScreen}
        options={{ title: 'Nearby Invitations' }}
      />
    </Stack.Navigator>
  );
}