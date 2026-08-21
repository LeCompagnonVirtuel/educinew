import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScEnvironmentalReportScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/smart-campus/environment/reports');
      const data = await response.json();
      setReports(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      {reports.map((report) => (
        <TouchableOpacity
          key={report.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScEnvironmentalReportDetail', { id: report.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{report.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) }]}>
              <Text style={styles.statusText}>{report.status}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Period: {report.period}</Text>
          <Text style={styles.info}>Generated: {report.generatedAt}</Text>
          <Text style={styles.info}>Energy Score: {report.energyScore}/100</Text>
          <Text style={styles.info}>Waste Reduction: {report.wasteReduction}%</Text>
          <Text style={styles.info}>Carbon Footprint: {report.carbonFootprint} tons</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'final':
      return '#4CAF50';
    case 'draft':
      return '#FF9800';
    case 'pending review':
      return '#2196F3';
    default:
      return '#9E9E9E';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  info: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
});
