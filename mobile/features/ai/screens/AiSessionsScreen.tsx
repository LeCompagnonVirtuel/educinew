import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AiSession {
  id: string;
  title: string;
  model: string;
  status: string;
  messageCount: number;
  startedAt: string;
  lastActivity: string;
}

export const AiSessionsScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState<AiSession[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/ai/sessions');
      const json = await response.json();
      setSessions(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#28a745';
      case 'paused': return '#ffc107';
      case 'completed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sessions IA</Text>
      <Text style={styles.subtitle}>Historique des sessions d'intelligence artificielle</Text>
      {sessions.map((session) => (
        <TouchableOpacity
          key={session.id}
          style={styles.card}
          onPress={() => navigation.navigate('AiSessionDetail', { id: session.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{session.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(session.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(session.status) }]}>{session.status}</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>Modèle: {session.model}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>{session.messageCount} messages</Text>
            <Text style={styles.footerText}>Dernière activité: {session.lastActivity}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  cardSubtitle: { fontSize: 14, color: '#666', marginBottom: 12 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 12, color: '#999' },
});
