import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Workflow {
  id: string;
  name: string;
  description: string;
  stepsCount: number;
  status: string;
  lastRun: string;
}

export const AiWorkflowScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const response = await fetch('/api/ai/workflows');
      const json = await response.json();
      setWorkflows(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return '#28a745';
      case 'brouillon': return '#ffc107';
      case 'archivé': return '#6c757d';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Workflows</Text>
      <Text style={styles.subtitle}>Flux de travail automatisés</Text>

      {workflows.map((workflow) => (
        <TouchableOpacity
          key={workflow.id}
          style={styles.workflowCard}
          onPress={() => navigation.navigate('AiWorkflowDetail', { id: workflow.id })}
        >
          <View style={styles.workflowHeader}>
            <Text style={styles.workflowName}>{workflow.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(workflow.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(workflow.status) }]}>{workflow.status}</Text>
            </View>
          </View>
          <Text style={styles.workflowDescription}>{workflow.description}</Text>
          <View style={styles.workflowFooter}>
            <Text style={styles.stepsCount}>{workflow.stepsCount} étapes</Text>
            <Text style={styles.lastRun}>Dernière exécution : {workflow.lastRun}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  workflowCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  workflowHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  workflowName: { fontSize: 16, fontWeight: '600', flex: 1, color: '#333' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  workflowDescription: { fontSize: 14, color: '#666', marginBottom: 12 },
  workflowFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  stepsCount: { fontSize: 12, color: '#1565c0', fontWeight: '600' },
  lastRun: { fontSize: 12, color: '#999' },
});
