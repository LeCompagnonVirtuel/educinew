import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function MetricDashboardScreen() {
  const [metrics, setMetrics] = useState<any>({});
  const [timeRange, setTimeRange] = useState('24h');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadMetrics();
  }, [timeRange]);

  const loadMetrics = async () => {
    try {
      const response = await fetch(`/api/integration/metrics?range=${timeRange}`);
      const json = await response.json();
      setMetrics(json.data || {});
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Metrics Dashboard</Text>
      
      <View style={styles.timeRangeSelector}>
        {['1h', '24h', '7d', '30d'].map((range) => (
          <TouchableOpacity 
            key={range} 
            style={[styles.timeRangeButton, timeRange === range && styles.timeRangeButtonActive]}
            onPress={() => setTimeRange(range)}
          >
            <Text style={[styles.timeRangeText, timeRange === range && styles.timeRangeTextActive]}>{range}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.totalRequests || 0}</Text>
          <Text style={styles.metricLabel}>Total Requests</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.successRate || 0}%</Text>
          <Text style={styles.metricLabel}>Success Rate</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.avgResponseTime || 0}ms</Text>
          <Text style={styles.metricLabel}>Avg Response Time</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{metrics.errorRate || 0}%</Text>
          <Text style={styles.metricLabel}>Error Rate</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Endpoints</Text>
        {metrics.topEndpoints && metrics.topEndpoints.map((endpoint: any, index: number) => (
          <View key={index} style={styles.endpointItem}>
            <Text style={styles.endpointPath}>{endpoint.path}</Text>
            <Text style={styles.endpointCount}>{endpoint.count} requests</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Error Distribution</Text>
        {metrics.errorDistribution && metrics.errorDistribution.map((error: any, index: number) => (
          <View key={index} style={styles.errorItem}>
            <Text style={styles.errorCode}>{error.code}</Text>
            <Text style={styles.errorCount}>{error.count} occurrences</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/integration/metrics/export')}>
          <Text style={styles.actionButtonText}>Export Metrics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => router.push('/integration/metrics/alerts')}>
          <Text style={styles.actionButtonText}>Configure Alerts</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  timeRangeSelector: { flexDirection: 'row', justifyContent: 'center', padding: 8 },
  timeRangeButton: { paddingHorizontal: 16, paddingVertical: 8, marginHorizontal: 4, borderRadius: 20, backgroundColor: '#fff' },
  timeRangeButtonActive: { backgroundColor: '#007AFF' },
  timeRangeText: { color: '#333', fontWeight: '600' },
  timeRangeTextActive: { color: '#fff' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  metricCard: { backgroundColor: '#fff', width: '48%', margin: '1%', padding: 16, borderRadius: 8, elevation: 2, alignItems: 'center' },
  metricValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  metricLabel: { fontSize: 14, color: '#666', marginTop: 4, textAlign: 'center' },
  section: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  endpointItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  endpointPath: { fontSize: 14, color: '#333', fontFamily: 'monospace' },
  endpointCount: { fontSize: 14, color: '#666' },
  errorItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  errorCode: { fontSize: 14, color: '#FF3B30', fontWeight: '600' },
  errorCount: { fontSize: 14, color: '#666' },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  secondaryButton: { backgroundColor: '#666' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});