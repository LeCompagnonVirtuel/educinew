import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ProgressData {
  coursesEnrolled: number;
  coursesCompleted: number;
  totalHours: number;
  currentStreak: number;
  weeklyProgress: { day: string; hours: number; }[];
}

export const LxpProgressScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/lxp/progress');
      const json = await response.json();
      setProgress(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!progress) return <View style={styles.container}><Text>No data</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{progress.coursesEnrolled}</Text>
          <Text style={styles.statLabel}>Enrolled</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{progress.coursesCompleted}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{progress.totalHours}</Text>
          <Text style={styles.statLabel}>Hours</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{progress.currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Activity</Text>
        <View style={styles.chartContainer}>
          {progress.weeklyProgress.map((day, index) => (
            <View key={index} style={styles.chartColumn}>
              <View style={[styles.chartBar, { height: `${(day.hours / 8) * 100}%` }]} />
              <Text style={styles.chartLabel}>{day.day}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8 },
  statCard: { width: '45%', backgroundColor: '#fff', padding: 16, margin: 8, borderRadius: 8, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700', color: '#2196F3' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  section: { backgroundColor: '#fff', padding: 16, margin: 16, borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 16 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-around', height: 150, alignItems: 'flex-end' },
  chartColumn: { alignItems: 'center', flex: 1 },
  chartBar: { width: 20, backgroundColor: '#2196F3', borderRadius: 4 },
  chartLabel: { fontSize: 10, color: '#666', marginTop: 4 },
});
