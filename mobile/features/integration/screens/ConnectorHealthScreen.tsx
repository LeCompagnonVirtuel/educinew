import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ConnectorHealthScreen() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    loadHealth();
  }, [id]);

  const loadHealth = async () => {
    try {
      const response = await fetch(`/api/integration/connectors/${id}/health`);
      const json = await response.json();
      setHealth(json.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  if (!health) return <View style={styles.center}><Text>Health data not available</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Connector Health</Text>
        <View style={[styles.statusBadge, { backgroundColor: health.status === 'healthy' ? '#4CAF50' : health.status === 'degraded' ? '#FF9800' : '#FF3B30' }]}>
          <Text style={styles.statusText}>{health.status}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Status</Text>
        <Text style={styles.detail}>Status: {health.status}</Text>
        <Text style={styles.detail}>Uptime: {health.uptime}%</Text>
        <Text style={styles.detail}>Last Check: {health.lastCheck}</Text>
        <Text style={styles.detail}>Next Check: {health.nextCheck}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <Text style={styles.detail}>Avg Response Time: {health.avgResponseTime}ms</Text>
        <Text style={styles.detail}>P95 Response Time: {health.p95ResponseTime}ms</Text>
        <Text style={styles.detail}>P99 Response Time: {health.p99ResponseTime}ms</Text>
        <Text style={styles.detail}>Error Rate: {health.errorRate}%</Text>
        <Text style={styles.detail}>Throughput: {health.throughput} req/min</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resource Usage</Text>
        <Text style={styles.detail}>CPU Usage: {health.cpuUsage}%</Text>
        <Text style={styles.detail}>Memory Usage: {health.memoryUsage}%</Text>
        <Text style={styles.detail}>Disk Usage: {health.diskUsage}%</Text>
        <Text style={styles.detail}>Network I/O: {health.networkIO} MB/s</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health History</Text>
        {health.history && health.history.map((entry: any, index: number) => (
          <View key={index} style={styles.historyItem}>
            <View style={[styles.historyStatus, { backgroundColor: entry.status === 'healthy' ? '#4CAF50' : entry.status === 'degraded' ? '#FF9800' : '#FF3B30' }]} />
            <View style={styles.historyDetails}>
              <Text style={styles.historyTime}>{entry.timestamp}</Text>
              <Text style={styles.historyMetrics}>Response: {entry.responseTime}ms | Errors: {entry.errorCount}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/integration/connectors/${id}/health/test`)}>
          <Text style={styles.actionButtonText}>Run Health Check</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.warningButton]} onPress={() => router.push(`/integration/connectors/${id}/health/history`)}>
          <Text style={styles.actionButtonText}>View Full History</Text>
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
  historyItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  historyStatus: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  historyDetails: { flex: 1 },
  historyTime: { fontSize: 14, color: '#333' },
  historyMetrics: { fontSize: 12, color: '#666', marginTop: 4 },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  warningButton: { backgroundColor: '#FF9500' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});