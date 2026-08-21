import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WorkflowDetailScreen() {
  const [workflow, setWorkflow] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadWorkflow();
  }, [id]);

  const loadWorkflow = async () => {
    try {
      const response = await fetch(`/api/integration/workflows/${id}`);
      const json = await response.json();
      setWorkflow(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!workflow) return <View style={styles.center}><Text>Workflow not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{workflow.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: workflow.status === 'active' ? '#4CAF50' : workflow.status === 'draft' ? '#FF9800' : '#999' }]}>
          <Text style={styles.statusText}>{workflow.status}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Description: {workflow.description}</Text>
        <Text style={styles.detail}>Version: {workflow.version}</Text>
        <Text style={styles.detail}>Created: {workflow.createdAt}</Text>
        <Text style={styles.detail}>Last Modified: {workflow.updatedAt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Steps</Text>
        {workflow.steps && workflow.steps.map((step: any, index: number) => (
          <View key={index} style={styles.stepItem}>
            <View style={styles.stepHeader}>
              <Text style={styles.stepNumber}>{index + 1}</Text>
              <Text style={styles.stepName}>{step.name}</Text>
            </View>
            <Text style={styles.stepType}>Type: {step.type}</Text>
            <Text style={styles.stepConfig}>Config: {JSON.stringify(step.config).substring(0, 50)}...</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <Text style={styles.detail}>Total Runs: {workflow.runCount}</Text>
        <Text style={styles.detail}>Successful Runs: {workflow.successCount}</Text>
        <Text style={styles.detail}>Failed Runs: {workflow.failureCount}</Text>
        <Text style={styles.detail}>Avg Duration: {workflow.avgDuration}ms</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/workflows/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit Workflow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/workflows/${id}/run`)}>
          <Text style={styles.actionButtonText}>Run Workflow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/workflows/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete Workflow</Text>
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
  stepItem: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 4, marginBottom: 8 },
  stepHeader: { flexDirection: 'row', alignItems: 'center' },
  stepNumber: { backgroundColor: '#007AFF', color: '#fff', width: 24, height: 24, borderRadius: 12, textAlign: 'center', lineHeight: 24, marginRight: 8, fontSize: 12, fontWeight: '600' },
  stepName: { fontSize: 16, fontWeight: '600' },
  stepType: { fontSize: 14, color: '#666', marginTop: 4 },
  stepConfig: { fontSize: 12, color: '#888', marginTop: 4, fontFamily: 'monospace' },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});