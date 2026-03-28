import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'NearbyWindows'>;

export default function NearbyWindowsScreen({ navigation, route }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nearby Invitations</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: '700',
  },
});