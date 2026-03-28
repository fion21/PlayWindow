import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';
import { APP_NAME } from '../lib/config';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>
          Open a paid window, alert nearby players, and keep the meet-up simple.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How it works</Text>
        <Text style={styles.cardText}>1. Choose a sport</Text>
        <Text style={styles.cardText}>2. Add venue and time</Text>
        <Text style={styles.cardText}>3. Open your local window</Text>
        <Text style={styles.cardText}>4. Nearby users can join, pass, or message</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Safety rules</Text>
        <Text style={styles.cardText}>Meet in public venues only.</Text>
        <Text style={styles.cardText}>Do not ask for name, age, or home address in chat.</Text>
        <Text style={styles.cardText}>Venue fees are handled in person between users.</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('OpenWindow')}
      >
        <Text style={styles.primaryButtonText}>Open a Window</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('NearbyWindows')}
      >
        <Text style={styles.secondaryButtonText}>Browse Invitations</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    marginTop: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: COLORS.mutedText,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.text,
    marginBottom: 6,
  },
  primaryButton: {
    backgroundColor: COLORS.fill,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  primaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: COLORS.highlight,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
  },
});