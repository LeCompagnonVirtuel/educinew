import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface DashboardData {
  summary: { label: string; value: string; icon: string }[];
  recentActivity: { title: string; description: string; time: string }[];
  quickActions: { label: string; screen: string; icon: string }[];
}

export const AiDashboardScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch('/api/ai/dashboard');
      const json = await response.json();
      setDashboard(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!dashboard) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Données non disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tableau de Bord</Text>
      <Text style={styles.subtitle}>Vue d'ensemble de votre activité IA</Text>

      <View style={styles.summaryGrid}>
        {dashboard.summary.map((item, index) => (
          <View key={index} style={styles.summaryCard}>
            <Text style={styles.summaryIcon}>{item.icon}</Text>
            <Text style={styles.summaryValue}>{item.value}</Text>
            <Text style={styles.summaryLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Actions rapides</Text>
      <View style={styles.actionsGrid}>
        {dashboard.quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionCard}
            onPress={() => navigation.navigate(action.screen)}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Activité récente</Text>
      {dashboard.recentActivity.map((activity, index) => (
        <View key={index} style={styles.activityCard}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <Text style={styles.activityDescription}>{activity.description}</Text>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  summaryCard: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  summaryIcon: { fontSize: 24, marginBottom: 8 },
  summaryValue: { fontSize: 22, fontWeight: 'bold', color: '#1565c0', marginBottom: 4 },
  summaryLabel: { fontSize: 12, color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  actionCard: { width: '30%', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  actionIcon: { fontSize: 28, marginBottom: 8 },
  actionLabel: { fontSize: 12, color: '#333', textAlign: 'center' },
  activityCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8 },
  activityTitle: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 4 },
  activityDescription: { fontSize: 13, color: '#666', marginBottom: 4 },
  activityTime: { fontSize: 11, color: '#999' },
});
