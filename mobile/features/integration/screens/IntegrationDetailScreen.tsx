import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function IntegrationDetailScreen() {
  const [integration, setIntegration] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadIntegration();
  }, [id]);

  const loadIntegration = async () => {
    try {
      const response = await fetch(`/api/integration/${id}`);
      const json = await response.json();
      setIntegration(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!integration) return <View style={styles.center}><Text>Integration not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{integration.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: integration.status === 'active' ? '#4CAF50' : '#FF9800' }]}>
          <Text style={styles.statusText}>{integration.status}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Type: {integration.type}</Text>
        <Text style={styles.detail}>Provider: {integration.provider}</Text>
        <Text style={styles.detail}>Description: {integration.description}</Text>
        <Text style={styles.detail}>Last Sync: {integration.lastSync}</Text>
        <Text style={styles.detail}>Created: {integration.createdAt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        {integration.config && Object.entries(integration.config).map(([key, value]) => (
          <Text key={key} style={styles.configItem}>{key}: {String(value)}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Metrics</Text>
        <Text style={styles.detail}>Total Requests: {integration.metrics?.totalRequests || 0}</Text>
        <Text style={styles.detail}>Success Rate: {integration.metrics?.successRate || 0}%</Text>
        <Text style={styles.detail}>Avg Response Time: {integration.metrics?.avgResponseTime || 0}ms</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit Integration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete Integration</Text>
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
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});