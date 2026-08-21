import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function SagaListScreen() {
  const [sagas, setSagas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadSagas();
  }, []);

  const loadSagas = async () => {
    try {
      const response = await fetch('/api/integration/sagas');
      const json = await response.json();
      setSagas(json.data || []);
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
        <Text style={styles.title}>Sagas</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/integration/sagas/new')}>
          <Text style={styles.addButtonText}>+ Add Saga</Text>
        </TouchableOpacity>
      </View>
      
      {sagas.map((saga) => (
        <TouchableOpacity 
          key={saga.id} 
          style={styles.card} 
          onPress={() => router.push(`/integration/sagas/${saga.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{saga.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: saga.status === 'completed' ? '#4CAF50' : saga.status === 'failed' ? '#FF3B30' : '#FF9800' }]}>
              <Text style={styles.statusText}>{saga.status}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{saga.description}</Text>
          <Text style={styles.cardSteps}>Steps: {saga.totalSteps} | Completed: {saga.completedSteps}</Text>
          <Text style={styles.cardDate}>Started: {saga.startedAt}</Text>
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
  cardDescription: { fontSize: 14, color: '#666', marginTop: 8 },
  cardSteps: { fontSize: 12, color: '#888', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#999', marginTop: 4 },
});