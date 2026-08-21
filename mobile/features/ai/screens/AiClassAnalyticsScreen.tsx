import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface ClassAnalytics {
  totalStudents: number;
  averageScore: number;
  attendanceRate: number;
  topPerformers: { name: string; score: number }[];
  strugglingStudents: { name: string; score: number }[];
  subjectAverages: { subject: string; average: number }[];
}

export const AiClassAnalyticsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<ClassAnalytics | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/ai/class-analytics');
      const json = await response.json();
      setAnalytics(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!analytics) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Données non disponibles</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analytiques de Classe</Text>
      <Text style={styles.subtitle}>Vue d'ensemble de votre classe</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.totalStudents}</Text>
          <Text style={styles.statLabel}>Élèves</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.averageScore}%</Text>
          <Text style={styles.statLabel}>Moyenne</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{analytics.attendanceRate}%</Text>
          <Text style={styles.statLabel}>Présence</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Meilleurs résultats</Text>
      {analytics.topPerformers.map((student, index) => (
        <View key={index} style={styles.studentRow}>
          <Text style={styles.rank}>#{index + 1}</Text>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentScore}>{student.score}%</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Élèves en difficulté</Text>
      {analytics.strugglingStudents.map((student, index) => (
        <View key={index} style={[styles.studentRow, styles.strugglingRow]}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={[styles.studentScore, styles.strugglingScore]}>{student.score}%</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Moyennes par matière</Text>
      {analytics.subjectAverages.map((subject, index) => (
        <View key={index} style={styles.subjectRow}>
          <Text style={styles.subjectName}>{subject.subject}</Text>
          <View style={styles.subjectBar}>
            <View style={[styles.subjectFill, { width: `${subject.average}%` }]} />
          </View>
          <Text style={styles.subjectAverage}>{subject.average}%</Text>
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
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, marginHorizontal: 4, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#1565c0' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333', marginTop: 8 },
  studentRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8 },
  strugglingRow: { borderLeftWidth: 3, borderLeftColor: '#dc3545' },
  rank: { fontSize: 14, fontWeight: '600', color: '#1565c0', width: 40 },
  studentName: { flex: 1, fontSize: 14, color: '#333' },
  studentScore: { fontSize: 14, fontWeight: '600', color: '#28a745' },
  strugglingScore: { color: '#dc3545' },
  subjectRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8 },
  subjectName: { width: 100, fontSize: 13, color: '#333' },
  subjectBar: { flex: 1, height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden', marginHorizontal: 12 },
  subjectFill: { height: '100%', backgroundColor: '#1565c0', borderRadius: 4 },
  subjectAverage: { fontSize: 13, fontWeight: '600', color: '#1565c0', width: 40, textAlign: 'right' },
});
