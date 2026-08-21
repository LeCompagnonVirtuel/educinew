import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function AIPipelineListScreen() {
  const [pipelines, setPipelines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadPipelines();
  }, []);

  const loadPipelines = async () => {
    try {
      const response = await fetch('/api/integration/ai/pipelines');
      const json = await response.json();
      setPipelines(json.data || []);
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
        <Text style={styles.title}>AI Pipelines</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/integration/ai/pipelines/new')}>
          <Text style={styles.addButtonText}>+ Add Pipeline</Text>
        </TouchableOpacity>
      </View>
      
      {pipelines.map((pipeline) => (
        <TouchableOpacity 
          key={pipeline.id} 
          style={styles.card} 
          onPress={() => router.push(`/integration/ai/pipelines/${pipeline.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{pipeline.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: pipeline.status === 'active' ? '#4CAF50' : pipeline.status === 'running' ? '#FF9800' : '#999' }]}>
              <Text style={styles.statusText}>{pipeline.status}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{pipeline.description}</Text>
          <Text style={styles.cardSteps}>Steps: {pipeline.stepCount}</Text>
          <Text style={styles.cardStats}>Runs: {pipeline.runCount} | Success: {pipeline.successRate}%</Text>
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
  cardSteps: { fontSize: 14, color: '#888', marginTop: 4 },
  cardStats: { fontSize: 12, color: '#999', marginTop: 4 },
});