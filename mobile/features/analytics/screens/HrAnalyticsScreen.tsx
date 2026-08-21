import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

interface HrMetric {
  id: string;
  department: string;
  headcount: number;
  turnoverRate: number;
  satisfaction: number;
}

const HrAnalyticsScreen: React.FC = () => {
  const [data, setData] = useState<HrMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHrData();
  }, []);

  const fetchHrData = async () => {
    try {
      setLoading(true);
      const mockData: HrMetric[] = [
        { id: '1', department: 'Teaching', headcount: 120, turnoverRate: 8.5, satisfaction: 4.2 },
        { id: '2', department: 'Administration', headcount: 45, turnoverRate: 12.3, satisfaction: 3.8 },
        { id: '3', department: 'Support Staff', headcount: 65, turnoverRate: 15.1, satisfaction: 3.5 },
        { id: '4', department: 'Management', headcount: 15, turnoverRate: 5.2, satisfaction: 4.5 },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch HR data');
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
      <Text style={styles.title}>HR Analytics</Text>
      {data.map((metric) => (
        <View key={metric.id} style={styles.card}>
          <Text style={styles.department}>{metric.department}</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Headcount</Text>
              <Text style={styles.metricValue}>{metric.headcount}</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Turnover Rate</Text>
              <Text
                style={[
                  styles.metricValue,
                  metric.turnoverRate > 10 ? styles.negative : styles.positive,
                ]}
              >
                {metric.turnoverRate}%
              </Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>Satisfaction</Text>
              <Text style={styles.metricValue}>{metric.satisfaction}/5</Text>
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
  department: {
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
  positive: {
    color: '#22c55e',
  },
  negative: {
    color: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default HrAnalyticsScreen;
