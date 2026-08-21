import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

interface StudentMetric {
  id: string;
  category: string;
  count: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

const StudentAnalyticsScreen: React.FC = () => {
  const [data, setData] = useState<StudentMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const mockData: StudentMetric[] = [
        { id: '1', category: 'Enrolled Students', count: 12450, percentage: 100, trend: 'up' },
        { id: '2', category: 'Active Students', count: 11890, percentage: 95.5, trend: 'up' },
        { id: '3', category: 'On Leave', count: 320, percentage: 2.6, trend: 'stable' },
        { id: '4', category: 'Transferred Out', count: 240, percentage: 1.9, trend: 'down' },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch student data');
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
      <Text style={styles.title}>Student Analytics</Text>
      {data.map((metric) => (
        <View key={metric.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.category}>{metric.category}</Text>
            <Text
              style={[
                styles.trend,
                metric.trend === 'up' ? styles.trendUp : metric.trend === 'down' ? styles.trendDown : styles.trendStable,
              ]}
            >
              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
            </Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.count}>{metric.count.toLocaleString()}</Text>
            <Text style={styles.percentage}>{metric.percentage}%</Text>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
  },
  trend: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trendUp: {
    color: '#22c55e',
  },
  trendDown: {
    color: '#ef4444',
  },
  trendStable: {
    color: '#6b7280',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  count: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  percentage: {
    fontSize: 18,
    color: '#666',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default StudentAnalyticsScreen;
