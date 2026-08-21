import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function IntegrationListScreen() {
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const response = await fetch('/api/integration/list');
      const json = await response.json();
      setIntegrations(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Integrations</Text>
      {integrations.map((integration) => (
        <TouchableOpacity 
          key={integration.id} 
          style={styles.card} 
          onPress={() => router.push(`/integration/${integration.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{integration.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: integration.status === 'active' ? '#4CAF50' : '#FF9800' }]}>
              <Text style={styles.statusText}>{integration.status}</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>{integration.description}</Text>
          <Text style={styles.cardType}>Type: {integration.type}</Text>
          <Text style={styles.cardDate}>Last sync: {integration.lastSync}</Text>
        </TouchableOpacity>
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
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 8 },
  cardType: { fontSize: 14, color: '#888', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#999', marginTop: 8 },
});