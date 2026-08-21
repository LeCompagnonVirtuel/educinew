import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function ComplianceScreen() {
  const [reports, setReports] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadCompliance();
  }, []);

  const loadCompliance = async () => {
    try {
      const [reportsResponse, statsResponse] = await Promise.all([
        fetch('/api/integration/compliance/reports'),
        fetch('/api/integration/compliance/stats')
      ]);
      const reportsJson = await reportsResponse.json();
      const statsJson = await statsResponse.json();
      setReports(reportsJson.data || []);
      setStats(statsJson.data || {});
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Compliance Reports</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.overallScore || 0}%</Text>
          <Text style={styles.statLabel}>Overall Score</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.passedChecks || 0}</Text>
          <Text style={styles.statLabel}>Passed Checks</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.failedChecks || 0}</Text>
          <Text style={styles.statLabel}>Failed Checks</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.lastScanDate || 'Never'}</Text>
          <Text style={styles.statLabel}>Last Scan</Text>
        </View>
      </View>

      {reports.map((report) => (
        <TouchableOpacity 
          key={report.id} 
          style={styles.card} 
          onPress={() => router.push(`/integration/compliance/${report.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{report.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: report.status === 'compliant' ? '#4CAF50' : report.status === 'non-compliant' ? '#FF3B30' : '#FF9800' }]}>
              <Text style={styles.statusText}>{report.status}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{report.description}</Text>
          <Text style={styles.cardFramework}>Framework: {report.framework}</Text>
          <Text style={styles.cardScore}>Score: {report.score}%</Text>
          <Text style={styles.cardDate}>Generated: {report.generatedAt}</Text>
        </TouchableOpacity>
      ))}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/integration/compliance/scan')}>
          <Text style={styles.actionButtonText}>Run Compliance Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => router.push('/integration/compliance/export')}>
          <Text style={styles.actionButtonText}>Export Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  statCard: { backgroundColor: '#fff', width: '48%', margin: '1%', padding: 16, borderRadius: 8, elevation: 2, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 4, textAlign: 'center' },
  card: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardDescription: { fontSize: 14, color: '#666', marginTop: 8 },
  cardFramework: { fontSize: 14, color: '#888', marginTop: 4 },
  cardScore: { fontSize: 14, color: '#333', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#999', marginTop: 4 },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  secondaryButton: { backgroundColor: '#666' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});