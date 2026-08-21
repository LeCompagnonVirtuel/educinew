import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuditLogScreen() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ action: '', user: '', dateRange: '7d' });
  const router = useRouter();

  useEffect(() => {
    loadLogs();
  }, [filters]);

  const loadLogs = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`/api/integration/audit-logs?${queryParams}`);
      const json = await response.json();
      setLogs(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Audit Log</Text>
      
      <View style={styles.filters}>
        <Text style={styles.filterLabel}>Date Range:</Text>
        <View style={styles.filterButtons}>
          {['24h', '7d', '30d', '90d'].map((range) => (
            <TouchableOpacity 
              key={range} 
              style={[styles.filterButton, filters.dateRange === range && styles.filterButtonActive]}
              onPress={() => setFilters(prev => ({ ...prev, dateRange: range }))}
            >
              <Text style={[styles.filterButtonText, filters.dateRange === range && styles.filterButtonTextActive]}>{range}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {logs.map((log) => (
        <View key={log.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardAction}>{log.action}</Text>
            <Text style={styles.cardTime}>{log.timestamp}</Text>
          </View>
          <Text style={styles.cardUser}>User: {log.user}</Text>
          <Text style={styles.cardResource}>Resource: {log.resource}</Text>
          <Text style={styles.cardDetails}>Details: {log.details}</Text>
          <Text style={styles.cardIp}>IP: {log.ipAddress}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  filters: { flexDirection: 'row', alignItems: 'center', padding: 8, paddingHorizontal: 16 },
  filterLabel: { fontSize: 14, color: '#666', marginRight: 8 },
  filterButtons: { flexDirection: 'row' },
  filterButton: { paddingHorizontal: 12, paddingVertical: 6, marginHorizontal: 4, borderRadius: 16, backgroundColor: '#fff' },
  filterButtonActive: { backgroundColor: '#007AFF' },
  filterButtonText: { fontSize: 12, color: '#333' },
  filterButtonTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardAction: { fontSize: 16, fontWeight: '600', color: '#333' },
  cardTime: { fontSize: 12, color: '#999' },
  cardUser: { fontSize: 14, color: '#666', marginTop: 8 },
  cardResource: { fontSize: 14, color: '#888', marginTop: 4 },
  cardDetails: { fontSize: 14, color: '#666', marginTop: 4 },
  cardIp: { fontSize: 12, color: '#999', marginTop: 4 },
});