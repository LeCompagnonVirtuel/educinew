import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

interface Prediction {
  id: string;
  model: string;
  accuracy: number;
  lastUpdated: string;
  status: 'active' | 'training' | 'deprecated';
}

const PredictiveAIScreen: React.FC = () => {
  const [data, setData] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      const mockData: Prediction[] = [
        { id: '1', model: 'Student Performance Predictor', accuracy: 87.3, lastUpdated: '2 hours ago', status: 'active' },
        { id: '2', model: 'Dropout Risk Analyzer', accuracy: 82.1, lastUpdated: '1 day ago', status: 'active' },
        { id: '3', model: 'Revenue Forecasting', accuracy: 91.5, lastUpdated: '3 hours ago', status: 'active' },
        { id: '4', model: 'Staff Retention Model', accuracy: 78.9, lastUpdated: '5 days ago', status: 'training' },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch predictions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#22c55e';
      case 'training': return '#f59e0b';
      case 'deprecated': return '#ef4444';
      default: return '#6b7280';
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
      <Text style={styles.title}>Predictive AI Models</Text>
      {data.map((prediction) => (
        <View key={prediction.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.model}>{prediction.model}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(prediction.status) }]}>
              <Text style={styles.statusText}>{prediction.status}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.accuracyContainer}>
              <Text style={styles.accuracyLabel}>Accuracy</Text>
              <Text style={styles.accuracyValue}>{prediction.accuracy}%</Text>
            </View>
            <View style={styles.updateContainer}>
              <Text style={styles.updateLabel}>Last Updated</Text>
              <Text style={styles.updateValue}>{prediction.lastUpdated}</Text>
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
  model: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accuracyContainer: {
    alignItems: 'center',
  },
  accuracyLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  accuracyValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  updateContainer: {
    alignItems: 'center',
  },
  updateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  updateValue: {
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 16,
  },
});

export default PredictiveAIScreen;
