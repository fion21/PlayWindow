import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const loadWindows = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase!
        .from('windows')
        .select('id, sport, venue, time_label, time_detail, notes')
        .order('created_at', { ascending: false });

      if (error) {
        Alert.alert('Load failed', error.message);
        return;
      }

  setWindows(data ?? []);
} catch (err: unknown) {
  let message = 'Something went wrong loading windows.';

  if (err instanceof Error) {
    message = err.message;
    console.error('loadWindows error:', err.message, err.stack);
  } else {
    console.error('loadWindows unknown error:', err);
  }

  Alert.alert('Load failed', message);
} finally {
  setLoading(false);
}
};

  const handleJoin = async (windowId: string) => {
    try {
      setJoiningId(windowId);

      const { error } = await supabase!.from('window_responses').insert([
        {
          window_id: windowId,
          status: 'join',
        },
      ]);

      if (error) {
        Alert.alert('Join failed', error.message);
        return;
      }

      Alert.alert('Joined', 'You joined this window.');
    } catch (err) {
      console.error(err);
      Alert.alert('Join failed', 'Something went wrong while joining.');
    } finally {
      setJoiningId(null);
    }
  };

  const handlePass = async (windowId: string) => {
    try {
      setJoiningId(windowId);

      const { error } = await supabase!.from('window_responses').insert([
        {
          window_id: windowId,
          status: 'pass',
        },
      ]);

      if (error) {
        Alert.alert('Pass failed', error.message);
        return;
      }

      setWindows((current) => current.filter((item) => item.id !== windowId));
    } catch (err) {
      console.error(err);
      Alert.alert('Pass failed', 'Something went wrong while passing.');
    } finally {
      setJoiningId(null);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadWindows();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Nearby invitations</Text>
      <Text style={styles.subheading}>
        Browse local activity windows and respond.
      </Text>

      <FlatList
        data={windows}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              {loading ? 'Loading...' : 'No windows yet'}
            </Text>
            <Text style={styles.emptyText}>
              Create your first activity window from the Open Window screen.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          const isJoining = joiningId === item.id;

          return (
            <View style={styles.card}>
              <Text style={styles.sport}>{item.sport}</Text>
              <Text style={styles.detail}>{item.venue}</Text>
              <Text style={styles.detail}>
                {item.time_label} · {item.time_detail}
              </Text>
              {!!item.notes && <Text style={styles.note}>{item.notes}</Text>}

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.joinButton, isJoining && styles.disabledButton]}
                  onPress={() => handleJoin(item.id)}
                  disabled={isJoining}
                >
                  <Text style={styles.joinButtonText}>
                    {isJoining ? 'Joining...' : 'Join'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.passButton, isJoining && styles.disabledButton]}
                  onPress={() => handlePass(item.id)}
                  disabled={isJoining}
                >
                  <Text style={styles.passButtonText}>Pass</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
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
  disabledButton: {
    opacity: 0.6,
  },
});