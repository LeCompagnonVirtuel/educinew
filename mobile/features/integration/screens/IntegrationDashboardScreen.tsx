import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function IntegrationDashboardScreen() {
  const [stats, setStats] = useState<any>({});
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        fetch('/api/integration/dashboard/stats'),
        fetch('/api/integration/dashboard/activity')
      ]);
      const statsJson = await statsResponse.json();
      const activityJson = await activityResponse.json();
      setStats(statsJson.data || {});
      setRecentActivity(activityJson.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Integration Dashboard</Text>
      
      <View style={styles.statsGrid}>
        <TouchableOpacity style={styles.statCard} onPress={() => router.push('/integration/list')}>
          <Text style={styles.statValue}>{stats.totalIntegrations || 0}</Text>
          <Text style={styles.statLabel}>Total Integrations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => router.push('/integration/webhooks')}>
          <Text style={styles.statValue}>{stats.activeWebhooks || 0}</Text>
          <Text style={styles.statLabel}>Active Webhooks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => router.push('/integration/connectors')}>
          <Text style={styles.statValue}>{stats.activeConnectors || 0}</Text>
          <Text style={styles.statLabel}>Active Connectors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => router.push('/integration/ai-agents')}>
          <Text style={styles.statValue}>{stats.aiAgents || 0}</Text>
          <Text style={styles.statLabel}>AI Agents</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Activity</Text>
      {recentActivity.map((activity, index) => (
        <View key={index} style={styles.activityCard}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <Text style={styles.activityDescription}>{activity.description}</Text>
          <Text style={styles.activityTime}>{activity.timestamp}</Text>
        </View>
      ))}
      
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/integration/connectors/new')}>
          <Text style={styles.actionButtonText}>Add New Connector</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/integration/webhooks/new')}>
          <Text style={styles.actionButtonText}>Create Webhook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/integration/ai-agents/new')}>
          <Text style={styles.actionButtonText}>Deploy AI Agent</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', padding: 16, paddingBottom: 8 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  statCard: { backgroundColor: '#fff', width: '48%', margin: '1%', padding: 16, borderRadius: 8, elevation: 2, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 4, textAlign: 'center' },
  activityCard: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 1 },
  activityTitle: { fontSize: 16, fontWeight: '600' },
  activityDescription: { fontSize: 14, color: '#666', marginTop: 4 },
  activityTime: { fontSize: 12, color: '#999', marginTop: 8 },
  quickActions: { padding: 8 },
  actionButton: { backgroundColor: '#007AFF', margin: 8, padding: 16, borderRadius: 8, alignItems: 'center' },
  actionButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});