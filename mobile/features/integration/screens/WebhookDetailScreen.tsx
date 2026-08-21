import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WebhookDetailScreen() {
  const [webhook, setWebhook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadWebhook();
  }, [id]);

  const loadWebhook = async () => {
    try {
      const response = await fetch(`/api/integration/webhooks/${id}`);
      const json = await response.json();
      setWebhook(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!webhook) return <View style={styles.center}><Text>Webhook not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{webhook.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: webhook.isActive ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{webhook.isActive ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        <Text style={styles.detail}>URL: {webhook.url}</Text>
        <Text style={styles.detail}>Secret: {webhook.secret ? '••••••••' : 'Not set'}</Text>
        <Text style={styles.detail}>Content Type: {webhook.contentType}</Text>
        <Text style={styles.detail}>Created: {webhook.createdAt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Events</Text>
        {webhook.events && webhook.events.map((event: string, index: number) => (
          <View key={index} style={styles.eventItem}>
            <Text style={styles.eventText}>{event}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <Text style={styles.detail}>Total Deliveries: {webhook.deliveryCount}</Text>
        <Text style={styles.detail}>Successful: {webhook.successCount}</Text>
        <Text style={styles.detail}>Failed: {webhook.failureCount}</Text>
        <Text style={styles.detail}>Success Rate: {webhook.successRate}%</Text>
        <Text style={styles.detail}>Avg Response Time: {webhook.avgResponseTime}ms</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/webhooks/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit Webhook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/webhooks/${id}/test`)}>
          <Text style={styles.actionButtonText}>Test Webhook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/webhooks/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete Webhook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  section: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  detail: { fontSize: 14, color: '#333', marginBottom: 8 },
  eventItem: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 4, marginBottom: 4 },
  eventText: { fontSize: 14, color: '#333' },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});