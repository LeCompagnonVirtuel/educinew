import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const ScNightReportScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/smart-campus/night-reports');
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
          onPress={() => navigation.navigate('ScNightReportDetail', { id: report.id })}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{report.date}</Text>
            <View style={[styles.statusBadge, { backgroundColor: report.completed ? '#4CAF50' : '#FF9800' }]}>
              <Text style={styles.statusText}>{report.completed ? 'Completed' : 'Pending'}</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Shift: {report.shift}</Text>
          <Text style={styles.info}>Supervisor: {report.supervisorName}</Text>
          <Text style={styles.info}>Incidents: {report.incidentsCount}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
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
