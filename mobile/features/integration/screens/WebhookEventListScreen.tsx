import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WebhookEventListScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadEvents();
  }, [id]);

  const loadEvents = async () => {
    try {
      const response = await fetch(`/api/integration/webhooks/${id}/events`);
      const json = await response.json();
      setEvents(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Webhook Events</Text>
      {events.map((event) => (
        <View key={event.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{event.type}</Text>
            <View style={[styles.statusBadge, { backgroundColor: event.status === 'delivered' ? '#4CAF50' : event.status === 'failed' ? '#FF3B30' : '#FF9800' }]}>
              <Text style={styles.statusText}>{event.status}</Text>
            </View>
          </View>
          <Text style={styles.cardPayload}>Payload: {JSON.stringify(event.payload).substring(0, 100)}...</Text>
          <Text style={styles.cardDate}>Timestamp: {event.timestamp}</Text>
          <Text style={styles.cardResponse}>Response: {event.responseCode || 'N/A'}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  card: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardPayload: { fontSize: 14, color: '#666', marginTop: 8, fontFamily: 'monospace' },
  cardDate: { fontSize: 12, color: '#999', marginTop: 4 },
  cardResponse: { fontSize: 12, color: '#888', marginTop: 4 },
});