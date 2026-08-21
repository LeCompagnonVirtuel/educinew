import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SagaDetailScreen() {
  const [saga, setSaga] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadSaga();
  }, [id]);

  const loadSaga = async () => {
    try {
      const response = await fetch(`/api/integration/sagas/${id}`);
      const json = await response.json();
      setSaga(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!saga) return <View style={styles.center}><Text>Saga not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{saga.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: saga.status === 'completed' ? '#4CAF50' : saga.status === 'failed' ? '#FF3B30' : '#FF9800' }]}>
          <Text style={styles.statusText}>{saga.status}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Description: {saga.description}</Text>
        <Text style={styles.detail}>Started: {saga.startedAt}</Text>
        <Text style={styles.detail}>Completed: {saga.completedAt || 'In progress'}</Text>
        <Text style={styles.detail}>Duration: {saga.duration || 'N/A'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Steps ({saga.completedSteps}/{saga.totalSteps})</Text>
        {saga.steps && saga.steps.map((step: any, index: number) => (
          <View key={index} style={[styles.stepItem, { borderLeftColor: step.status === 'completed' ? '#4CAF50' : step.status === 'failed' ? '#FF3B30' : '#FF9800' }]}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepName}>{step.name}</Text>
              <View style={[styles.stepStatus, { backgroundColor: step.status === 'completed' ? '#4CAF50' : step.status === 'failed' ? '#FF3B30' : '#FF9800' }]}>
                <Text style={styles.stepStatusText}>{step.status}</Text>
              </View>
            </View>
            <Text style={styles.stepDescription}>{step.description}</Text>
            {step.error && <Text style={styles.stepError}>Error: {step.error}</Text>}
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/sagas/${id}/retry`)}>
          <Text style={styles.actionButtonText}>Retry Saga</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/sagas/${id}/compensate`)}>
          <Text style={styles.actionButtonText}>Compensate</Text>
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
  stepItem: { borderLeftWidth: 4, paddingLeft: 12, marginBottom: 12 },
  stepHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepName: { fontSize: 16, fontWeight: '600', flex: 1 },
  stepStatus: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  stepStatusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  stepDescription: { fontSize: 14, color: '#666', marginTop: 4 },
  stepError: { fontSize: 12, color: '#FF3B30', marginTop: 4 },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});