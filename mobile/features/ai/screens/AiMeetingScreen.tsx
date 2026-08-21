import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Meeting {
  id: string;
  title: string;
  participants: string[];
  date: string;
  time: string;
  duration: number;
  status: string;
}

export const AiMeetingScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await fetch('/api/ai/meetings');
      const json = await response.json();
      setMeetings(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planifiée': return '#1565c0';
      case 'en cours': return '#28a745';
      case 'terminée': return '#6c757d';
      case 'annulée': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Réunions</Text>
      <Text style={styles.subtitle}>Gestion des réunions avec l'IA</Text>

      {meetings.map((meeting) => (
        <TouchableOpacity
          key={meeting.id}
          style={styles.meetingCard}
          onPress={() => navigation.navigate('AiMeetingDetail', { id: meeting.id })}
        >
          <View style={styles.meetingHeader}>
            <Text style={styles.meetingTitle}>{meeting.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(meeting.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(meeting.status) }]}>{meeting.status}</Text>
            </View>
          </View>

          <View style={styles.meetingInfo}>
            <Text style={styles.infoIcon}>📅</Text>
            <Text style={styles.infoText}>{meeting.date} à {meeting.time}</Text>
          </View>

          <View style={styles.meetingInfo}>
            <Text style={styles.infoIcon}>⏱️</Text>
            <Text style={styles.infoText}>{meeting.duration} minutes</Text>
          </View>

          <View style={styles.participantsContainer}>
            <Text style={styles.participantsLabel}>Participants :</Text>
            <View style={styles.participantsList}>
              {meeting.participants.map((participant, index) => (
                <View key={index} style={styles.participantBadge}>
                  <Text style={styles.participantText}>{participant}</Text>
                </View>
              ))}
            </View>
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
  meetingCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  meetingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  meetingTitle: { fontSize: 16, fontWeight: '600', flex: 1, color: '#333' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  meetingInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoIcon: { fontSize: 14, marginRight: 8 },
  infoText: { fontSize: 14, color: '#666' },
  participantsContainer: { marginTop: 8, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12 },
  participantsLabel: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 8 },
  participantsList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  participantBadge: { backgroundColor: '#e3f2fd', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  participantText: { fontSize: 12, color: '#1565c0' },
});
