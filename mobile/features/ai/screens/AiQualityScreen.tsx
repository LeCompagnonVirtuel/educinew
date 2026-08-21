import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface QualityMetric {
  name: string;
  score: number;
  status: string;
  trend: string;
}

export const AiQualityScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<QualityMetric[]>([]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/ai/quality');
      const json = await response.json();
      setMetrics(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return '#28a745';
      case 'bon': return '#17a2b8';
      case 'moyen': return '#ffc107';
      case 'faible': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Assurance Qualité</Text>
      <Text style={styles.subtitle}>Métriques de qualité de l'IA</Text>

      {metrics.map((metric, index) => (
        <View key={index} style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricName}>{metric.name}</Text>
            <Text style={[styles.trendText, { color: metric.trend === 'up' ? '#28a745' : metric.trend === 'down' ? '#dc3545' : '#666' }]}>
              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
            </Text>
          </View>
          <View style={styles.metricBody}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${metric.score}%`, backgroundColor: getStatusColor(metric.status) }]} />
            </View>
            <Text style={styles.scoreText}>{metric.score}%</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(metric.status) + '20' }]}>
            <Text style={[styles.statusText, { color: getStatusColor(metric.status) }]}>{metric.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  metricCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  metricName: { fontSize: 16, fontWeight: '600', color: '#333' },
  trendText: { fontSize: 16, fontWeight: '600' },
  metricBody: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  progressBar: { flex: 1, height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden', marginRight: 12 },
  progressFill: { height: '100%', borderRadius: 4 },
  scoreText: { fontSize: 14, fontWeight: '600', color: '#333', width: 40, textAlign: 'right' },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
});
