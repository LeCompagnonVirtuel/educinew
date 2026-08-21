import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  status: string;
  summary: string;
}

export const AiAdminReportsScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/ai/admin/reports');
      const json = await response.json();
      setReports(json.data);
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
      <Text style={styles.title}>Rapports Admin</Text>
      <Text style={styles.subtitle}>Rapports générés par IA</Text>

      {reports.map((report) => (
        <TouchableOpacity
          key={report.id}
          style={styles.reportCard}
          onPress={() => navigation.navigate('AiReportDetail', { id: report.id })}
        >
          <View style={styles.reportHeader}>
            <Text style={styles.reportTitle}>{report.title}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{report.status}</Text>
            </View>
          </View>
          <Text style={styles.reportType}>{report.type}</Text>
          <Text style={styles.reportSummary}>{report.summary}</Text>
          <Text style={styles.reportDate}>{report.date}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  reportCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  reportHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  reportTitle: { fontSize: 16, fontWeight: '600', flex: 1, color: '#333' },
  reportType: { fontSize: 13, color: '#1565c0', marginBottom: 8 },
  reportSummary: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 8 },
  reportDate: { fontSize: 12, color: '#999' },
  statusBadge: { backgroundColor: '#d4edda', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600', color: '#155724' },
});
