import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AIAgentDetailScreen() {
  const [agent, setAgent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadAgent();
  }, [id]);

  const loadAgent = async () => {
    try {
      const response = await fetch(`/api/integration/ai/agents/${id}`);
      const json = await response.json();
      setAgent(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!agent) return <View style={styles.center}><Text>Agent not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{agent.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: agent.status === 'active' ? '#4CAF50' : agent.status === 'training' ? '#FF9800' : '#999' }]}>
          <Text style={styles.statusText}>{agent.status}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Type: {agent.type}</Text>
        <Text style={styles.detail}>Model: {agent.model}</Text>
        <Text style={styles.detail}>Description: {agent.description}</Text>
        <Text style={styles.detail}>Created: {agent.createdAt}</Text>
        <Text style={styles.detail}>Last Updated: {agent.updatedAt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        {agent.config && Object.entries(agent.config).map(([key, value]) => (
          <Text key={key} style={styles.configItem}>{key}: {String(value)}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance</Text>
        <Text style={styles.detail}>Total Tasks: {agent.taskCount}</Text>
        <Text style={styles.detail}>Success Rate: {agent.successRate}%</Text>
        <Text style={styles.detail}>Avg Response Time: {agent.avgResponseTime}ms</Text>
        <Text style={styles.detail}>Last Active: {agent.lastActiveAt || 'Never'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Tasks</Text>
        {agent.recentTasks && agent.recentTasks.map((task: any, index: number) => (
          <View key={index} style={styles.taskItem}>
            <View style={styles.taskHeader}>
              <Text style={styles.taskId}>Task #{task.id}</Text>
              <View style={[styles.taskStatus, { backgroundColor: task.status === 'completed' ? '#4CAF50' : task.status === 'failed' ? '#FF3B30' : '#FF9800' }]}>
                <Text style={styles.taskStatusText}>{task.status}</Text>
              </View>
            </View>
            <Text style={styles.taskInput}>Input: {task.input.substring(0, 50)}...</Text>
            <Text style={styles.taskOutput}>Output: {task.output?.substring(0, 50) || 'Pending'}...</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/ai/agents/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit Agent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/ai/agents/${id}/test`)}>
          <Text style={styles.actionButtonText}>Test Agent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/ai/agents/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete Agent</Text>
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
  configItem: { fontSize: 14, color: '#666', marginBottom: 4, fontFamily: 'monospace' },
  taskItem: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 8 },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  taskId: { fontSize: 14, fontWeight: '600' },
  taskStatus: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  taskStatusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  taskInput: { fontSize: 14, color: '#666', marginTop: 4 },
  taskOutput: { fontSize: 14, color: '#888', marginTop: 4 },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});