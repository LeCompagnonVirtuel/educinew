import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface SessionDetail {
  id: string;
  title: string;
  model: string;
  status: string;
  messageCount: number;
  tokenUsage: number;
  startedAt: string;
  lastActivity: string;
  messages: { id: string; content: string; sender: string; timestamp: string }[];
}

export const AiSessionDetailScreen: React.FC<{ route: { params: { id: string } }; navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionDetail | null>(null);

  useEffect(() => {
    fetchSessionDetail();
  }, []);

  const fetchSessionDetail = async () => {
    try {
      const response = await fetch(`/api/ai/sessions/${route.params.id}`);
      const json = await response.json();
      setSession(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Session non trouvée</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{session.title}</Text>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{session.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Modèle</Text>
          <Text style={styles.infoValue}>{session.model}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Messages</Text>
          <Text style={styles.infoValue}>{session.messageCount}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tokens utilisés</Text>
          <Text style={styles.infoValue}>{session.tokenUsage}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Démarrée le</Text>
          <Text style={styles.infoValue}>{session.startedAt}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Dernière activité</Text>
          <Text style={styles.infoValue}>{session.lastActivity}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Messages récents</Text>
        {session.messages.map((message) => (
          <View key={message.id} style={[styles.messageCard, message.sender === 'user' ? styles.userMessage : styles.aiMessage]}>
            <Text style={styles.messageSender}>{message.sender === 'user' ? 'Vous' : 'IA'}</Text>
            <Text style={styles.messageContent}>{message.content}</Text>
            <Text style={styles.messageTime}>{message.timestamp}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('AiChat', { sessionId: session.id })}
      >
        <Text style={styles.continueButtonText}>Continuer la conversation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  statusBadge: { alignSelf: 'flex-start', backgroundColor: '#d4edda', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16 },
  statusText: { fontSize: 14, fontWeight: '600', color: '#155724' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  infoLabel: { fontSize: 14, color: '#333' },
  infoValue: { fontSize: 14, color: '#666' },
  messageCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8 },
  userMessage: { borderLeftWidth: 3, borderLeftColor: '#1565c0' },
  aiMessage: { borderLeftWidth: 3, borderLeftColor: '#28a745' },
  messageSender: { fontSize: 12, fontWeight: '600', color: '#333', marginBottom: 4 },
  messageContent: { fontSize: 14, color: '#666', lineHeight: 20 },
  messageTime: { fontSize: 10, color: '#999', marginTop: 4 },
  continueButton: { backgroundColor: '#1565c0', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  continueButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
