import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

interface AcademicMetric {
  id: string;
  subject: string;
  averageScore: number;
  passRate: number;
  topPerformers: number;
}

const AcademicAnalyticsScreen: React.FC = () => {
  const [data, setData] = useState<AcademicMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAcademicData();
  }, []);

  const fetchAcademicData = async () => {
    try {
      setLoading(true);
      const mockData: AcademicMetric[] = [
        { id: '1', subject: 'Mathematics', averageScore: 78.5, passRate: 85.2, topPerformers: 45 },
        { id: '2', subject: 'Science', averageScore: 82.3, passRate: 88.7, topPerformers: 52 },
        { id: '3', subject: 'English', averageScore: 75.8, passRate: 82.1, topPerformers: 38 },
        { id: '4', subject: 'History', averageScore: 80.1, passRate: 86.5, topPerformers: 42 },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch academic data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Academic Analytics</Text>
      {data.map((metric) => (
        <View key={metric.id} style={styles.card}>
          <Text style={styles.subject}>{metric.subject}</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Avg Score</Text>
              <Text style={styles.metricValue}>{metric.averageScore}%</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Pass Rate</Text>
              <Text style={styles.metricValue}>{metric.passRate}%</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Top Performers</Text>
              <Text style={styles.metricValue}>{metric.topPerformers}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default AcademicAnalyticsScreen;
