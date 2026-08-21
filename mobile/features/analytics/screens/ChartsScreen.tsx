import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

interface ChartData {
  id: string;
  title: string;
  type: string;
  dataPoints: number;
  lastUpdated: string;
}

const ChartsScreen: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCharts();
  }, []);

  const fetchCharts = async () => {
    try {
      setLoading(true);
      const mockData: ChartData[] = [
        { id: '1', title: 'Student Enrollment Trends', type: 'Line Chart', dataPoints: 12, lastUpdated: '1 hour ago' },
        { id: '2', title: 'Revenue Distribution', type: 'Pie Chart', dataPoints: 6, lastUpdated: '3 hours ago' },
        { id: '3', title: 'Department Performance', type: 'Bar Chart', dataPoints: 8, lastUpdated: '2 hours ago' },
        { id: '4', title: 'Attendance Heatmap', type: 'Heatmap', dataPoints: 30, lastUpdated: '30 minutes ago' },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch charts');
    } finally {
      setLoading(false);
    }
  };

  const getChartIcon = (type: string) => {
    switch (type) {
      case 'Line Chart': return '📈';
      case 'Pie Chart': return '🥧';
      case 'Bar Chart': return '📊';
      case 'Heatmap': return '🗓️';
      default: return '📋';
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
      <Text style={styles.title}>Charts</Text>
      {data.map((chart) => (
        <View key={chart.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.icon}>{getChartIcon(chart.type)}</Text>
            <View style={styles.headerText}>
              <Text style={styles.chartTitle}>{chart.title}</Text>
              <Text style={styles.chartType}>{chart.type}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Chart Preview</Text>
              <Text style={styles.dataPoints}>{chart.dataPoints} data points</Text>
            </View>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.lastUpdated}>Last updated: {chart.lastUpdated}</Text>
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
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartType: {
    fontSize: 12,
    color: '#666',
  },
  cardBody: {
    marginBottom: 12,
  },
  placeholder: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dataPoints: {
    fontSize: 12,
    color: '#999',
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default ChartsScreen;
