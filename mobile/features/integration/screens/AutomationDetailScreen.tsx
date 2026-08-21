import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function AutomationDetailScreen() {
  const [automation, setAutomation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadAutomation();
  }, [id]);

  const loadAutomation = async () => {
    try {
      const response = await fetch(`/api/integration/automations/${id}`);
      const json = await response.json();
      setAutomation(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!automation) return <View style={styles.center}><Text>Automation not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{automation.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: automation.isActive ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{automation.isActive ? 'Active' : 'Inactive'}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Description: {automation.description}</Text>
        <Text style={styles.detail}>Trigger: {automation.trigger}</Text>
        <Text style={styles.detail}>Created: {automation.createdAt}</Text>
        <Text style={styles.detail}>Last Modified: {automation.updatedAt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        {automation.actions && automation.actions.map((action: any, index: number) => (
          <View key={index} style={styles.actionItem}>
            <Text style={styles.actionName}>{action.name}</Text>
            <Text style={styles.actionType}>Type: {action.type}</Text>
            <Text style={styles.actionConfig}>Config: {JSON.stringify(action.config).substring(0, 50)}...</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <Text style={styles.detail}>Total Runs: {automation.runCount}</Text>
        <Text style={styles.detail}>Successful Runs: {automation.successCount}</Text>
        <Text style={styles.detail}>Failed Runs: {automation.failureCount}</Text>
        <Text style={styles.detail}>Last Run: {automation.lastRunAt || 'Never'}</Text>
        <Text style={styles.detail}>Next Scheduled: {automation.nextScheduledAt || 'Not scheduled'}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/automations/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit Automation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/automations/${id}/run`)}>
          <Text style={styles.actionButtonText}>Run Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/automations/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete Automation</Text>
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
  actionItem: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 4, marginBottom: 8 },
  actionName: { fontSize: 16, fontWeight: '600' },
  actionType: { fontSize: 14, color: '#666', marginTop: 4 },
  actionConfig: { fontSize: 12, color: '#888', marginTop: 4, fontFamily: 'monospace' },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});