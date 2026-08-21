import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

interface Report {
  id: string;
  name: string;
  type: string;
  generatedAt: string;
  status: 'ready' | 'generating' | 'failed';
}

const ReportsScreen: React.FC = () => {
  const [data, setData] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const mockData: Report[] = [
        { id: '1', name: 'Monthly Academic Summary', type: 'Academic', generatedAt: '2024-01-15', status: 'ready' },
        { id: '2', name: 'Financial Year Report', type: 'Financial', generatedAt: '2024-01-14', status: 'ready' },
        { id: '3', name: 'Student Attendance Report', type: 'Attendance', generatedAt: '2024-01-13', status: 'generating' },
        { id: '4', name: 'Teacher Performance Review', type: 'HR', generatedAt: '2024-01-12', status: 'ready' },
        { id: '5', name: 'Parent Engagement Summary', type: 'Engagement', generatedAt: '2024-01-11', status: 'failed' },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return '#22c55e';
      case 'generating': return '#f59e0b';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const renderItem = ({ item }: { item: Report }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Type:</Text>
          <Text style={styles.value}>{item.type}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Generated:</Text>
          <Text style={styles.value}>{item.generatedAt}</Text>
        </View>
      </View>
    </View>
  );

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
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
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
  listContent: {
    paddingBottom: 16,
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
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  cardBody: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default ReportsScreen;
