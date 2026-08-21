import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

interface ParentMetric {
  id: string;
  category: string;
  count: number;
  engagementRate: number;
  lastActivity: string;
}

const ParentAnalyticsScreen: React.FC = () => {
  const [data, setData] = useState<ParentMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchParentData();
  }, []);

  const fetchParentData = async () => {
    try {
      setLoading(true);
      const mockData: ParentMetric[] = [
        { id: '1', category: 'Registered Parents', count: 8920, engagementRate: 78.5, lastActivity: '2 hours ago' },
        { id: '2', category: 'Active This Month', count: 7450, engagementRate: 83.5, lastActivity: '1 day ago' },
        { id: '3', category: 'Meeting Attendees', count: 3200, engagementRate: 35.9, lastActivity: '1 week ago' },
        { id: '4', category: 'Portal Users', count: 6800, engagementRate: 76.2, lastActivity: '3 hours ago' },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch parent data');
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
      <Text style={styles.title}>Parent Analytics</Text>
      {data.map((metric) => (
        <View key={metric.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.category}>{metric.category}</Text>
            <Text style={styles.lastActivity}>{metric.lastActivity}</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.countContainer}>
              <Text style={styles.count}>{metric.count.toLocaleString()}</Text>
              <Text style={styles.countLabel}>Parents</Text>
            </View>
            <View style={styles.engagementContainer}>
              <Text style={styles.engagementValue}>{metric.engagementRate}%</Text>
              <Text style={styles.engagementLabel}>Engagement</Text>
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastActivity: {
    fontSize: 12,
    color: '#666',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  countContainer: {
    alignItems: 'center',
  },
  count: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  countLabel: {
    fontSize: 12,
    color: '#666',
  },
  engagementContainer: {
    alignItems: 'center',
  },
  engagementValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  engagementLabel: {
    fontSize: 12,
    color: '#666',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default ParentAnalyticsScreen;
