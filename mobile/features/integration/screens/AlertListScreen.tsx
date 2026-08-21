import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function AlertListScreen() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const response = await fetch('/api/integration/alerts');
      const json = await response.json();
      setAlerts(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alerts</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/integration/alerts/new')}>
          <Text style={styles.addButtonText}>+ Add Alert</Text>
        </TouchableOpacity>
      </View>
      
      {alerts.map((alert) => (
        <TouchableOpacity 
          key={alert.id} 
          style={styles.card} 
          onPress={() => router.push(`/integration/alerts/${alert.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{alert.name}</Text>
            <View style={[styles.severityBadge, { backgroundColor: alert.severity === 'critical' ? '#FF3B30' : alert.severity === 'warning' ? '#FF9800' : '#4CAF50' }]}>
              <Text style={styles.severityText}>{alert.severity}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{alert.description}</Text>
          <Text style={styles.cardCondition}>Condition: {alert.condition}</Text>
          <Text style={styles.cardStatus}>Status: {alert.status}</Text>
          <Text style={styles.cardDate}>Last Triggered: {alert.lastTriggeredAt || 'Never'}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  addButton: { backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: '600' },
  card: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  severityText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardDescription: { fontSize: 14, color: '#666', marginTop: 8 },
  cardCondition: { fontSize: 14, color: '#888', marginTop: 4 },
  cardStatus: { fontSize: 14, color: '#333', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#999', marginTop: 4 },
});