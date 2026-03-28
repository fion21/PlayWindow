import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'OpenWindow'>;

export default function OpenWindowScreen({ navigation, route }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Open a Window</Text>
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