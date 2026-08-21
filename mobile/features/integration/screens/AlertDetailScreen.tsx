import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AlertDetailScreen() {
  const [alert, setAlert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadAlert();
  }, [id]);

  const loadAlert = async () => {
    try {
      const response = await fetch(`/api/integration/alerts/${id}`);
      const json = await response.json();
      setAlert(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!alert) return <View style={styles.center}><Text>Alert not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{alert.name}</Text>
        <View style={[styles.severityBadge, { backgroundColor: alert.severity === 'critical' ? '#FF3B30' : alert.severity === 'warning' ? '#FF9800' : '#4CAF50' }]}>
          <Text style={styles.severityText}>{alert.severity}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Description: {alert.description}</Text>
        <Text style={styles.detail}>Condition: {alert.condition}</Text>
        <Text style={styles.detail}>Status: {alert.status}</Text>
        <Text style={styles.detail}>Created: {alert.createdAt}</Text>
        <Text style={styles.detail}>Last Modified: {alert.updatedAt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        <Text style={styles.detail}>Threshold: {alert.threshold}</Text>
        <Text style={styles.detail}>Duration: {alert.duration}</Text>
        <Text style={styles.detail}>Cooldown: {alert.cooldown}</Text>
        <Text style={styles.detail}>Notification Channels: {alert.notificationChannels?.join(', ')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trigger History</Text>
        {alert.triggerHistory && alert.triggerHistory.map((trigger: any, index: number) => (
          <View key={index} style={styles.triggerItem}>
            <Text style={styles.triggerTime}>{trigger.timestamp}</Text>
            <Text style={styles.triggerValue}>Value: {trigger.value}</Text>
            <Text style={styles.triggerStatus}>Status: {trigger.status}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/alerts/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/alerts/${id}/test`)}>
          <Text style={styles.actionButtonText}>Test Alert</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/alerts/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete Alert</Text>
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
  severityBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  severityText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  section: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  detail: { fontSize: 14, color: '#333', marginBottom: 8 },
  triggerItem: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 8 },
  triggerTime: { fontSize: 14, color: '#333' },
  triggerValue: { fontSize: 14, color: '#666', marginTop: 4 },
  triggerStatus: { fontSize: 12, color: '#999', marginTop: 4 },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});