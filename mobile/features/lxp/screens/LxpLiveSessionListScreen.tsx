import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LiveSessionItem {
  id: string;
  title: string;
  instructor: string;
  scheduledTime: string;
  duration: string;
  isLive: boolean;
  participantCount: number;
}

export const LxpLiveSessionListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<LiveSessionItem[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/lxp/live-sessions');
      const json = await response.json();
      setSessions(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {sessions.map((session) => (
        <TouchableOpacity key={session.id} style={styles.card} onPress={() => navigation.navigate('LiveSessionDetail', { id: session.id })}>
          <View style={styles.header}>
            <Text style={styles.title}>{session.title}</Text>
            {session.isLive && <View style={styles.liveBadge}><Text style={styles.liveText}>LIVE</Text></View>}
          </View>
          <Text style={styles.meta}>by {session.instructor}</Text>
          <Text style={styles.meta}>{session.scheduledTime} • {session.duration}</Text>
          <Text style={styles.participants}>{session.participantCount} participants</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '600', flex: 1 },
  liveBadge: { backgroundColor: '#f44336', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  liveText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  meta: { fontSize: 14, color: '#666', marginTop: 4 },
  participants: { fontSize: 12, color: '#999', marginTop: 4 },
});
