import React, { useCallback, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

type WindowItem = {
  id: string;
  sport: string;
  venue: string;
  time_label: string;
  time_detail: string;
  notes: string | null;
};

export default function NearbyWindowsScreen() {
  const [windows, setWindows] = useState<WindowItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadWindows = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('windows')
      .select('id, sport, venue, time_label, time_detail, notes')
      .order('created_at', { ascending: false });

    setLoading(false);

    if (error) {
      Alert.alert('Load failed', error.message);
      return;
    }

    setWindows(data ?? []);
  };

  useFocusEffect(
    useCallback(() => {
      loadWindows();
    }, [])
  );

  return (
    <SafeArea style={styles.container}>
      <Text style={styles.heading}>Nearby invitations</Text>
      <Text style={styles.subheading}>
        These are now loading from Supabase.
      </Text>

      <FlatList
        data={windows}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>{loading ? 'Loading...' : 'No windows yet'}</Text>
            <Text style={styles.emptyText}>
              Create your first activity window from the Open Window screen.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.sport}>{item.sport}</Text>
            <Text style={styles.detail}>{item.venue}</Text>
            <Text style={styles.detail}>
              {item.time_label} · {item.time_detail}
            </Text>
            {!!item.notes && <Text style={styles.note}>{item.notes}</Text>}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.passButton}>
                <Text style={styles.passButtonText}>Pass</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4B5563',
    marginBottom: 20,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#4B5563',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  sport: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  detail: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 4,
  },
  note: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
    marginBottom: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  joinButton: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  passButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  passButtonText: {
    color: '#111827',
    fontWeight: '700',
  },
});