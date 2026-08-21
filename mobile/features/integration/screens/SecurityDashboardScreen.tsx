import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function SecurityDashboardScreen() {
  const [stats, setStats] = useState<any>({});
  const [recentEvents, setRecentEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsResponse, eventsResponse] = await Promise.all([
        fetch('/api/integration/security/stats'),
        fetch('/api/integration/security/events')
      ]);
      const statsJson = await statsResponse.json();
      const eventsJson = await eventsResponse.json();
      setStats(statsJson.data || {});
      setRecentEvents(eventsJson.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Security Dashboard</Text>
      
      <View style={styles.statsGrid}>
        <TouchableOpacity style={styles.statCard} onPress={() => router.push('/integration/security/threats')}>
          <Text style={styles.statValue}>{stats.activeThreats || 0}</Text>
          <Text style={styles.statLabel}>Active Threats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => router.push('/integration/security/firewall')}>
          <Text style={styles.statValue}>{stats.firewallRules || 0}</Text>
          <Text style={styles.statLabel}>Firewall Rules</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => router.push('/integration/security/audit')}>
          <Text style={styles.statValue}>{stats.auditEvents || 0}</Text>
          <Text style={styles.statLabel}>Audit Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => router.push('/integration/security/compliance')}>
          <Text style={[styles.statValue, { color: stats.complianceScore >= 80 ? '#4CAF50' : '#FF9800' }]}>{stats.complianceScore || 0}%</Text>
          <Text style={styles.statLabel}>Compliance Score</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Security Events</Text>
        {recentEvents.map((event, index) => (
          <View key={index} style={styles.eventItem}>
            <View style={[styles.eventDot, { backgroundColor: event.severity === 'critical' ? '#FF3B30' : event.severity === 'warning' ? '#FF9800' : '#4CAF50' }]} />
            <View style={styles.eventDetails}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDescription}>{event.description}</Text>
              <Text style={styles.eventTime}>{event.timestamp}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/integration/security/scan')}>
          <Text style={styles.actionButtonText}>Run Security Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => router.push('/integration/security/report')}>
          <Text style={styles.actionButtonText}>Generate Report</Text>
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
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 4, textAlign: 'center' },
  section: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  eventItem: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  eventDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12, marginTop: 4 },
  eventDetails: { flex: 1 },
  eventTitle: { fontSize: 16, fontWeight: '600' },
  eventDescription: { fontSize: 14, color: '#666', marginTop: 4 },
  eventTime: { fontSize: 12, color: '#999', marginTop: 4 },
  actions: { padding: 16 },
  actionButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  secondaryButton: { backgroundColor: '#666' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});