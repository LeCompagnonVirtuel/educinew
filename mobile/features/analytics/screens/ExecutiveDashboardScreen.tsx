import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

interface KPI {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

const ExecutiveDashboardScreen: React.FC = () => {
  const [data, setData] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const mockData: KPI[] = [
        { id: '1', label: 'Total Students', value: '12,450', change: 5.2, trend: 'up' },
        { id: '2', label: 'Revenue', value: '$2.4M', change: 12.8, trend: 'up' },
        { id: '3', label: 'Attendance Rate', value: '94.5%', change: -1.2, trend: 'down' },
        { id: '4', label: 'Pass Rate', value: '87.3%', change: 3.1, trend: 'up' },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch dashboard data');
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
      <Text style={styles.title}>Executive Dashboard</Text>
      {data.map((kpi) => (
        <View key={kpi.id} style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>{kpi.label}</Text>
          <Text style={styles.kpiValue}>{kpi.value}</Text>
          <Text
            style={[
              styles.kpiChange,
              kpi.trend === 'up' ? styles.positive : kpi.trend === 'down' ? styles.negative : styles.neutral,
            ]}
          >
            {kpi.change > 0 ? '+' : ''}{kpi.change}%
          </Text>
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
  kpiCard: {
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
  kpiLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  kpiChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  positive: {
    color: '#22c55e',
  },
  negative: {
    color: '#ef4444',
  },
  neutral: {
    color: '#6b7280',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default ExecutiveDashboardScreen;
