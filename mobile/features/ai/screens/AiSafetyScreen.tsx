import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface SafetyMetric {
  name: string;
  status: string;
  score: number;
  lastChecked: string;
}

export const AiSafetyScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<SafetyMetric[]>([]);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/ai/safety');
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
      case 'sécurisé': return '#28a745';
      case 'attention': return '#ffc107';
      case 'critique': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sécurité IA</Text>
      <Text style={styles.subtitle}>Surveillance de la sécurité du système IA</Text>

      <View style={styles.overallCard}>
        <Text style={styles.overallLabel}>Score de sécurité global</Text>
        <Text style={styles.overallValue}>
          {metrics.length > 0 ? Math.round(metrics.reduce((a, b) => a + b.score, 0) / metrics.length) : 0}%
        </Text>
      </View>

      {metrics.map((metric, index) => (
        <View key={index} style={styles.metricCard}>
          <View style={styles.metricHeader}>
            <Text style={styles.metricName}>{metric.name}</Text>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor(metric.status) }]} />
          </View>
          <View style={styles.metricBody}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${metric.score}%`, backgroundColor: getStatusColor(metric.status) }]} />
            </View>
            <Text style={styles.scoreText}>{metric.score}%</Text>
          </View>
          <Text style={styles.lastChecked}>Dernière vérification : {metric.lastChecked}</Text>
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
  overallCard: { backgroundColor: '#28a745', borderRadius: 12, padding: 20, marginBottom: 20, alignItems: 'center' },
  overallLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  overallValue: { fontSize: 40, fontWeight: 'bold', color: '#fff' },
  metricCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  metricHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  metricName: { fontSize: 16, fontWeight: '600', color: '#333' },
  statusDot: { width: 12, height: 12, borderRadius: 6 },
  metricBody: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  progressBar: { flex: 1, height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden', marginRight: 12 },
  progressFill: { height: '100%', borderRadius: 4 },
  scoreText: { fontSize: 14, fontWeight: '600', color: '#333', width: 40, textAlign: 'right' },
  lastChecked: { fontSize: 12, color: '#999' },
});
