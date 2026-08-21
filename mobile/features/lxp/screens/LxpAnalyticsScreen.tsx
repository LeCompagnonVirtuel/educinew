import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AnalyticsData {
  completionRate: number;
  averageScore: number;
  timeSpent: number;
  skillsGained: number;
  monthlyStats: { month: string; courses: number; hours: number; }[];
}

export const LxpAnalyticsScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/lxp/analytics');
      const json = await response.json();
      setAnalytics(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!analytics) return <View style={styles.container}><Text>No data</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.completionRate}%</Text>
          <Text style={styles.statLabel}>Completion Rate</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.averageScore}%</Text>
          <Text style={styles.statLabel}>Avg Score</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.timeSpent}h</Text>
          <Text style={styles.statLabel}>Time Spent</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.skillsGained}</Text>
          <Text style={styles.statLabel}>Skills Gained</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Monthly Overview</Text>
        {analytics.monthlyStats.map((stat, index) => (
          <View key={index} style={styles.statRow}>
            <Text style={styles.statMonth}>{stat.month}</Text>
            <Text style={styles.statCourses}>{stat.courses} courses</Text>
            <Text style={styles.statHours}>{stat.hours}h</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  statCard: { width: '45%', backgroundColor: '#fff', padding: 16, margin: 8, borderRadius: 8, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700', color: '#3F51B5' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  section: { backgroundColor: '#fff', padding: 16, margin: 16, marginTop: 0, borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  statRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  statMonth: { fontSize: 14, fontWeight: '500', flex: 1 },
  statCourses: { fontSize: 14, color: '#666', flex: 1, textAlign: 'center' },
  statHours: { fontSize: 14, color: '#666', flex: 1, textAlign: 'right' },
});
