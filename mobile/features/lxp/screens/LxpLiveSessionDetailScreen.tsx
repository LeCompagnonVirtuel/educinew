import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LiveSessionDetail {
  id: string;
  title: string;
  description: string;
  instructor: string;
  scheduledTime: string;
  duration: string;
  isLive: boolean;
  participantCount: number;
  chatMessages: { id: string; user: string; message: string; timestamp: string; }[];
}

export const LxpLiveSessionDetailScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<LiveSessionDetail | null>(null);

  useEffect(() => {
    fetchSessionDetail();
  }, []);

  const fetchSessionDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/live-sessions/${route.params.id}`);
      const json = await response.json();
      setSession(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!session) return <View style={styles.container}><Text>Session not found</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{session.title}</Text>
          {session.isLive && <View style={styles.liveBadge}><Text style={styles.liveText}>LIVE</Text></View>}
        </View>
        <Text style={styles.meta}>by {session.instructor}</Text>
        <Text style={styles.meta}>{session.scheduledTime} • {session.duration}</Text>
        <Text style={styles.participants}>{session.participantCount} participants</Text>
      </View>
      <ScrollView style={styles.chatContainer}>
        {session.chatMessages.map((msg) => (
          <View key={msg.id} style={styles.messageCard}>
            <Text style={styles.messageUser}>{msg.user}</Text>
            <Text style={styles.messageText}>{msg.message}</Text>
            <Text style={styles.messageTime}>{msg.timestamp}</Text>
          </View>
        ))}
      </ScrollView>
      {session.isLive && (
        <View style={styles.joinContainer}>
          <TouchableOpacity style={styles.joinButton} onPress={() => navigation.navigate('VirtualClassroom', { id: session.id })}>
            <Text style={styles.joinButtonText}>Join Session</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#fff', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', flex: 1 },
  liveBadge: { backgroundColor: '#f44336', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  liveText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  meta: { fontSize: 14, color: '#666', marginTop: 4 },
  participants: { fontSize: 12, color: '#999', marginTop: 4 },
  chatContainer: { flex: 1, padding: 16 },
  messageCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8 },
  messageUser: { fontSize: 12, fontWeight: '600', color: '#2196F3' },
  messageText: { fontSize: 14, color: '#333', marginTop: 4 },
  messageTime: { fontSize: 10, color: '#999', marginTop: 4 },
  joinContainer: { padding: 16, backgroundColor: '#fff' },
  joinButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center' },
  joinButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
