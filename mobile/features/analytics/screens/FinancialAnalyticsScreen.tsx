import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';

interface FinancialMetric {
  id: string;
  category: string;
  amount: number;
  budget: number;
  variance: number;
}

const FinancialAnalyticsScreen: React.FC = () => {
  const [data, setData] = useState<FinancialMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      const mockData: FinancialMetric[] = [
        { id: '1', category: 'Tuition Fees', amount: 1250000, budget: 1200000, variance: 4.2 },
        { id: '2', category: 'Staff Salaries', amount: 850000, budget: 900000, variance: -5.6 },
        { id: '3', category: 'Infrastructure', amount: 320000, budget: 350000, variance: -8.6 },
        { id: '4', category: 'Learning Materials', amount: 180000, budget: 200000, variance: -10.0 },
      ];
      setData(mockData);
    } catch (err) {
      setError('Failed to fetch financial data');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
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
      <Text style={styles.title}>Financial Analytics</Text>
      {data.map((metric) => (
        <View key={metric.id} style={styles.card}>
          <Text style={styles.category}>{metric.category}</Text>
          <View style={styles.amountsRow}>
            <View style={styles.amountCol}>
              <Text style={styles.amountLabel}>Actual</Text>
              <Text style={styles.amountValue}>{formatCurrency(metric.amount)}</Text>
            </View>
            <View style={styles.amountCol}>
              <Text style={styles.amountLabel}>Budget</Text>
              <Text style={styles.amountValue}>{formatCurrency(metric.budget)}</Text>
            </View>
            <View style={styles.amountCol}>
              <Text style={styles.amountLabel}>Variance</Text>
              <Text
                style={[
                  styles.amountValue,
                  metric.variance >= 0 ? styles.positive : styles.negative,
                ]}
              >
                {metric.variance > 0 ? '+' : ''}{metric.variance}%
              </Text>
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
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  amountsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountCol: {
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 14,
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

export default FinancialAnalyticsScreen;
