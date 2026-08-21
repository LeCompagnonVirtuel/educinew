import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function ConnectorListScreen() {
  const [connectors, setConnectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadConnectors();
  }, []);

  const loadConnectors = async () => {
    try {
      const response = await fetch('/api/integration/connectors');
      const json = await response.json();
      setConnectors(json.data || []);
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
        <Text style={styles.title}>Connectors</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/integration/connectors/new')}>
          <Text style={styles.addButtonText}>+ Add Connector</Text>
        </TouchableOpacity>
      </View>
      
      {connectors.map((connector) => (
        <TouchableOpacity 
          key={connector.id} 
          style={styles.card} 
          onPress={() => router.push(`/integration/connectors/${connector.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{connector.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: connector.status === 'healthy' ? '#4CAF50' : connector.status === 'degraded' ? '#FF9800' : '#FF3B30' }]}>
              <Text style={styles.statusText}>{connector.status}</Text>
            </View>
          </View>
          <Text style={styles.cardType}>Type: {connector.type}</Text>
          <Text style={styles.cardProvider}>Provider: {connector.provider}</Text>
          <Text style={styles.cardStats}>Requests: {connector.requestCount} | Errors: {connector.errorCount}</Text>
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
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardType: { fontSize: 14, color: '#666', marginTop: 8 },
  cardProvider: { fontSize: 14, color: '#888', marginTop: 4 },
  cardStats: { fontSize: 12, color: '#999', marginTop: 4 },
});