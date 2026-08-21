import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function ApiKeyListScreen() {
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      const response = await fetch('/api/integration/api-keys');
      const json = await response.json();
      setApiKeys(json.data || []);
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
        <Text style={styles.title}>API Keys</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/integration/api-keys/new')}>
          <Text style={styles.addButtonText}>+ Add Key</Text>
        </TouchableOpacity>
      </View>
      
      {apiKeys.map((apiKey) => (
        <TouchableOpacity 
          key={apiKey.id} 
          style={styles.card} 
          onPress={() => router.push(`/integration/api-keys/${apiKey.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{apiKey.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: apiKey.isActive ? '#4CAF50' : '#FF9800' }]}>
              <Text style={styles.statusText}>{apiKey.isActive ? 'Active' : 'Inactive'}</Text>
            </View>
          </View>
          <Text style={styles.cardKey}>Key: {apiKey.keyPrefix}...{apiKey.keySuffix}</Text>
          <Text style={styles.cardScope}>Scope: {apiKey.scope}</Text>
          <Text style={styles.cardDate}>Created: {apiKey.createdAt}</Text>
          <Text style={styles.cardDate}>Last Used: {apiKey.lastUsedAt || 'Never'}</Text>
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
  cardKey: { fontSize: 14, color: '#666', marginTop: 8, fontFamily: 'monospace' },
  cardScope: { fontSize: 14, color: '#888', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#999', marginTop: 4 },
});