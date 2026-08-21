import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ConnectorDetailScreen() {
  const [connector, setConnector] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadConnector();
  }, [id]);

  const loadConnector = async () => {
    try {
      const response = await fetch(`/api/integration/connectors/${id}`);
      const json = await response.json();
      setConnector(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!connector) return <View style={styles.center}><Text>Connector not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{connector.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: connector.status === 'healthy' ? '#4CAF50' : connector.status === 'degraded' ? '#FF9800' : '#FF3B30' }]}>
          <Text style={styles.statusText}>{connector.status}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Text style={styles.detail}>Type: {connector.type}</Text>
        <Text style={styles.detail}>Provider: {connector.provider}</Text>
        <Text style={styles.detail}>Version: {connector.version}</Text>
        <Text style={styles.detail}>Created: {connector.createdAt}</Text>
        <Text style={styles.detail}>Last Updated: {connector.updatedAt}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration</Text>
        {connector.config && Object.entries(connector.config).map(([key, value]) => (
          <Text key={key} style={styles.configItem}>{key}: {String(value)}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Metrics</Text>
        <Text style={styles.detail}>Uptime: {connector.uptime}%</Text>
        <Text style={styles.detail}>Avg Response Time: {connector.avgResponseTime}ms</Text>
        <Text style={styles.detail}>Error Rate: {connector.errorRate}%</Text>
        <Text style={styles.detail}>Last Health Check: {connector.lastHealthCheck}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Logs</Text>
        {connector.recentLogs && connector.recentLogs.map((log: any, index: number) => (
          <View key={index} style={styles.logItem}>
            <Text style={[styles.logLevel, { color: log.level === 'error' ? '#FF3B30' : log.level === 'warn' ? '#FF9800' : '#333' }]}>{log.level.toUpperCase()}</Text>
            <Text style={styles.logMessage}>{log.message}</Text>
            <Text style={styles.logTime}>{log.timestamp}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/connectors/${id}/edit`)}>
          <Text style={styles.actionButtonText}>Edit Connector</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/connectors/${id}/test`)}>
          <Text style={styles.actionButtonText}>Test Connection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.dangerButton]} onPress={() => router.push(`/integration/connectors/${id}/delete`)}>
          <Text style={styles.actionButtonText}>Delete Connector</Text>
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
  logItem: { borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical: 8 },
  logLevel: { fontSize: 12, fontWeight: '600' },
  logMessage: { fontSize: 14, color: '#333', marginTop: 4 },
  logTime: { fontSize: 12, color: '#999', marginTop: 4 },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  dangerButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});