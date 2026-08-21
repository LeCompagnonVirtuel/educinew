import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WebhookDeliveryListScreen() {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadDeliveries();
  }, [id]);

  const loadDeliveries = async () => {
    try {
      const response = await fetch(`/api/integration/webhooks/${id}/deliveries`);
      const json = await response.json();
      setDeliveries(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Webhook Deliveries</Text>
      {deliveries.map((delivery) => (
        <View key={delivery.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Delivery #{delivery.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: delivery.success ? '#4CAF50' : '#FF3B30' }]}>
              <Text style={styles.statusText}>{delivery.success ? 'Success' : 'Failed'}</Text>
            </View>
          </View>
          <Text style={styles.cardEvent}>Event: {delivery.eventType}</Text>
          <Text style={styles.cardResponse}>Response Code: {delivery.responseCode}</Text>
          <Text style={styles.cardDuration}>Duration: {delivery.duration}ms</Text>
          <Text style={styles.cardDate}>Timestamp: {delivery.timestamp}</Text>
          {delivery.error && <Text style={styles.cardError}>Error: {delivery.error}</Text>}
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
  cardEvent: { fontSize: 14, color: '#666', marginTop: 8 },
  cardResponse: { fontSize: 14, color: '#888', marginTop: 4 },
  cardDuration: { fontSize: 12, color: '#999', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#999', marginTop: 4 },
  cardError: { fontSize: 12, color: '#FF3B30', marginTop: 4 },
});