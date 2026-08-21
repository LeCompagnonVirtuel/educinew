import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AdminStats {
  totalStudents: number;
  totalTeachers: number;
  activeCourses: number;
  completionRate: number;
  recentActivity: { type: string; description: string; time: string }[];
}

export const AiAdminDashboardScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/ai/admin/dashboard');
      const json = await response.json();
      setStats(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Données non disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Tableau de Bord Admin</Text>
      <Text style={styles.subtitle}>Vue d'ensemble de la plateforme</Text>

      <View style={styles.statsGrid}>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('AiAdminStudents')}>
          <Text style={styles.statValue}>{stats.totalStudents}</Text>
          <Text style={styles.statLabel}>Élèves</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('AiAdminTeachers')}>
          <Text style={styles.statValue}>{stats.totalTeachers}</Text>
          <Text style={styles.statLabel}>Enseignants</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('AiAdminCourses')}>
          <Text style={styles.statValue}>{stats.activeCourses}</Text>
          <Text style={styles.statLabel}>Cours actifs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statCard}>
          <Text style={styles.statValue}>{stats.completionRate}%</Text>
          <Text style={styles.statLabel}>Taux complétion</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Activité récente</Text>
      {stats.recentActivity.map((activity, index) => (
        <View key={index} style={styles.activityCard}>
          <Text style={styles.activityType}>{activity.type}</Text>
          <Text style={styles.activityDescription}>{activity.description}</Text>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Accès rapides</Text>
      <View style={styles.quickLinks}>
        <TouchableOpacity style={styles.quickLink} onPress={() => navigation.navigate('AiAdminReports')}>
          <Text style={styles.quickLinkText}>Rapports</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickLink} onPress={() => navigation.navigate('AiCurriculum')}>
          <Text style={styles.quickLinkText}>Programme</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickLink} onPress={() => navigation.navigate('AiAdminSettings')}>
          <Text style={styles.quickLinkText}>Paramètres</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  statValue: { fontSize: 28, fontWeight: 'bold', color: '#1565c0', marginBottom: 4 },
  statLabel: { fontSize: 13, color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333', marginTop: 8 },
  activityCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8 },
  activityType: { fontSize: 12, fontWeight: '600', color: '#1565c0', marginBottom: 4, textTransform: 'uppercase' },
  activityDescription: { fontSize: 14, color: '#333', marginBottom: 4 },
  activityTime: { fontSize: 12, color: '#999' },
  quickLinks: { flexDirection: 'row', justifyContent: 'space-between' },
  quickLink: { flex: 1, backgroundColor: '#1565c0', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginHorizontal: 4 },
  quickLinkText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
