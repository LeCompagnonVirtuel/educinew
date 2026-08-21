import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface ProgressData {
  overall: number;
  subjects: { name: string; progress: number; trend: string }[];
  weeklyActivity: { day: string; hours: number }[];
  achievements: { name: string; date: string }[];
}

export const AiProgressScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/ai/progress');
      const json = await response.json();
      setProgress(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!progress) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Données de progression non disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Suivi des Progrès</Text>
      <Text style={styles.subtitle}>Visualisez votre progression globale</Text>

      <View style={styles.overallCard}>
        <Text style={styles.overallLabel}>Progression globale</Text>
        <Text style={styles.overallValue}>{progress.overall}%</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress.overall}%` }]} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Progression par matière</Text>
      {progress.subjects.map((subject, index) => (
        <View key={index} style={styles.subjectCard}>
          <View style={styles.subjectHeader}>
            <Text style={styles.subjectName}>{subject.name}</Text>
            <Text style={styles.subjectTrend}>{subject.trend === 'up' ? '↑' : subject.trend === 'down' ? '↓' : '→'}</Text>
          </View>
          <View style={styles.subjectProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${subject.progress}%` }]} />
            </View>
            <Text style={styles.progressPercent}>{subject.progress}%</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Activité hebdomadaire</Text>
      <View style={styles.activityCard}>
        <View style={styles.activityChart}>
          {progress.weeklyActivity.map((day, index) => (
            <View key={index} style={styles.activityBar}>
              <View style={[styles.barFill, { height: `${(day.hours / 8) * 100}%` }]} />
              <Text style={styles.barLabel}>{day.day}</Text>
            </View>
          ))}
        </View>
      </View>

      <Text style={styles.sectionTitle}>Dernières réalisations</Text>
      {progress.achievements.map((achievement, index) => (
        <View key={index} style={styles.achievementCard}>
          <Text style={styles.achievementIcon}>🏆</Text>
          <View style={styles.achievementInfo}>
            <Text style={styles.achievementName}>{achievement.name}</Text>
            <Text style={styles.achievementDate}>{achievement.date}</Text>
          </View>
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
  overallCard: { backgroundColor: '#1565c0', borderRadius: 12, padding: 20, marginBottom: 20, alignItems: 'center' },
  overallLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  overallValue: { fontSize: 48, fontWeight: 'bold', color: '#fff', marginBottom: 12 },
  progressBar: { height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden', width: '100%' },
  progressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  subjectCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12 },
  subjectHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  subjectName: { fontSize: 16, fontWeight: '600', color: '#333' },
  subjectTrend: { fontSize: 16, color: '#28a745' },
  subjectProgress: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  progressPercent: { fontSize: 14, fontWeight: '600', color: '#1565c0', width: 40 },
  activityCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20 },
  activityChart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  activityBar: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginHorizontal: 4 },
  barFill: { width: 20, backgroundColor: '#1565c0', borderRadius: 4, minHeight: 4 },
  barLabel: { fontSize: 10, color: '#666', marginTop: 4 },
  achievementCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12 },
  achievementIcon: { fontSize: 24, marginRight: 12 },
  achievementInfo: { flex: 1 },
  achievementName: { fontSize: 14, fontWeight: '600', color: '#333' },
  achievementDate: { fontSize: 12, color: '#999', marginTop: 2 },
});
