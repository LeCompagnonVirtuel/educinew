import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AnalyticsData {
  totalRequests: number;
  averageResponseTime: number;
  successRate: number;
  topEndpoints: { name: string; calls: number; avgTime: number }[];
  dailyUsage: { day: string; count: number }[];
}

export const AiAnalyticsScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/ai/analytics');
      const json = await response.json();
      setAnalytics(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!analytics) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Données non disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analytiques</Text>
      <Text style={styles.subtitle}>Statistiques d'utilisation de l'IA</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.totalRequests.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Requêtes totales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.averageResponseTime}ms</Text>
          <Text style={styles.statLabel}>Temps moyen</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.successRate}%</Text>
          <Text style={styles.statLabel}>Taux de succès</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Utilisation quotidienne</Text>
      <View style={styles.chartCard}>
        <View style={styles.chart}>
          {analytics.dailyUsage.map((day, index) => (
            <View key={index} style={styles.chartBar}>
              <View style={[styles.barFill, { height: `${(day.count / Math.max(...analytics.dailyUsage.map((d) => d.count))) * 100}%` }]} />
              <Text style={styles.barLabel}>{day.day}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Endpoints les plus utilisés</Text>
      {analytics.topEndpoints.map((endpoint, index) => (
        <View key={index} style={styles.endpointCard}>
          <Text style={styles.endpointName}>{endpoint.name}</Text>
          <View style={styles.endpointStats}>
            <Text style={styles.endpointCalls}>{endpoint.calls} appels</Text>
            <Text style={styles.endpointTime}>{endpoint.avgTime}ms</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, marginHorizontal: 4, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#1565c0' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333', marginTop: 8 },
  chartCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16 },
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  chartBar: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginHorizontal: 4 },
  barFill: { width: 20, backgroundColor: '#1565c0', borderRadius: 4, minHeight: 4 },
  barLabel: { fontSize: 10, color: '#666', marginTop: 4 },
  endpointCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8 },
  endpointName: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 },
  endpointStats: { flexDirection: 'row', justifyContent: 'space-between' },
  endpointCalls: { fontSize: 13, color: '#666' },
  endpointTime: { fontSize: 13, color: '#1565c0' },
});
