import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { RootStackParamList } from '../types/navigation';
import { COLORS } from '../constants/colors';
import { supabase } from '../lib/supabase';

type Props = NativeStackScreenProps<RootStackParamList, 'OpenWindow'>;

export default function OpenWindowScreen({ navigation }: Props) {
  const [sport, setSport] = useState('');
  const [venue, setVenue] = useState('');
  const [timeLabel, setTimeLabel] = useState('');
  const [timeDetail, setTimeDetail] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const resetForm = () => {
    setSport('');
    setVenue('');
    setTimeLabel('');
    setTimeDetail('');
    setNotes('');
  };

  const handleCreateWindow = async () => {
    if (!sport.trim() || !venue.trim() || !timeLabel.trim() || !timeDetail.trim()) {
      Alert.alert(
        'Missing details',
        'Please fill in sport, venue, time label, and time detail.'
      );
      return;
    }

    if (!supabase) {
      Alert.alert('Config error', 'Supabase environment variables are missing.');
      return;
    }

    try {
      setSaving(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      const locationAllowed = status === 'granted';
      const location = locationAllowed
        ? await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          })
        : null;

      const payload = {
        sport: sport.trim(),
        venue: venue.trim(),
        time_label: timeLabel.trim(),
        time_detail: timeDetail.trim(),
        notes: notes.trim() ? notes.trim() : null,
      };

      const payloadWithCoords = location
        ? {
            ...payload,
            latitude: Number(location.coords.latitude.toFixed(3)),
            longitude: Number(location.coords.longitude.toFixed(3)),
          }
        : payload;

      let { error } = await supabase.from('windows').insert([payloadWithCoords]);

      if (
        error &&
        location &&
        (error.message.includes('latitude') || error.message.includes('longitude'))
      ) {
        console.warn(
          'Location columns missing on windows table, retrying without coordinates.'
        );
        ({ error } = await supabase.from('windows').insert([payload]));
      }

      if (error) {
        Alert.alert('Could not create window', error.message);
        return;
      }

      if (!locationAllowed) {
        Alert.alert(
          'Success',
          'Your window is now live. Enable location to improve nearby matching.'
        );
      } else {
        Alert.alert('Success', 'Your window is now live.');
      }
      resetForm();
      navigation.navigate('NearbyWindows');
    } catch (err) {
      console.error('Create window error:', err);
      Alert.alert('Error', 'Something went wrong while creating the window.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Open a Window</Text>
            <Text style={styles.subtitle}>
              Create a local sports invite that nearby players can join.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Sport</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Tennis"
              placeholderTextColor="#9CA3AF"
              value={sport}
              onChangeText={setSport}
              editable={!saving}
            />

            <Text style={styles.label}>Venue</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Newport Sports Village"
              placeholderTextColor="#9CA3AF"
              value={venue}
              onChangeText={setVenue}
              editable={!saving}
            />

            <Text style={styles.label}>Time label</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Today"
              placeholderTextColor="#9CA3AF"
              value={timeLabel}
              onChangeText={setTimeLabel}
              editable={!saving}
            />

            <Text style={styles.label}>Time detail</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 7:00 PM - 8:00 PM"
              placeholderTextColor="#9CA3AF"
              value={timeDetail}
              onChangeText={setTimeDetail}
              editable={!saving}
            />

            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.notesInput]}
              placeholder="Optional: skill level, price, court number, what to bring..."
              placeholderTextColor="#9CA3AF"
              value={notes}
              onChangeText={setNotes}
              editable={!saving}
              multiline
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.primaryButton, saving && styles.buttonDisabled]}
              onPress={handleCreateWindow}
              disabled={saving}
            >
              <Text style={styles.primaryButtonText}>
                {saving ? 'Creating...' : 'Create Window'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('NearbyWindows')}
              disabled={saving}
            >
              <Text style={styles.secondaryButtonText}>Browse Invitations</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Tips</Text>
            <Text style={styles.infoText}>Use a clear venue name.</Text>
            <Text style={styles.infoText}>Keep times simple and easy to scan.</Text>
            <Text style={styles.infoText}>Add notes if players need cash or equipment.</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.mutedText,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
  },
  notesInput: {
    minHeight: 110,
  },
  primaryButton: {
    backgroundColor: COLORS.fill,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 12,
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
  buttonDisabled: {
    opacity: 0.6,
  },
  infoCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.text,
    marginBottom: 6,
  },
});
