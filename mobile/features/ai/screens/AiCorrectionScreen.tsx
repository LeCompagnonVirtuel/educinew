import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Correction {
  id: string;
  studentName: string;
  assignmentTitle: string;
  subject: string;
  score: number;
  maxScore: number;
  status: string;
  date: string;
}

export const AiCorrectionScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [corrections, setCorrections] = useState<Correction[]>([]);

  useEffect(() => {
    fetchCorrections();
  }, []);

  const fetchCorrections = async () => {
    try {
      const response = await fetch('/api/ai/corrections');
      const json = await response.json();
      setCorrections(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'corrigé': return '#28a745';
      case 'en attente': return '#ffc107';
      case 'à réviser': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Correction</Text>
      <Text style={styles.subtitle}>Corrections automatisées par IA</Text>

      {corrections.map((correction) => (
        <View key={correction.id} style={styles.correctionCard}>
          <View style={styles.correctionHeader}>
            <Text style={styles.studentName}>{correction.studentName}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(correction.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(correction.status) }]}>{correction.status}</Text>
            </View>
          </View>
          <Text style={styles.assignmentTitle}>{correction.assignmentTitle}</Text>
          <Text style={styles.subject}>{correction.subject}</Text>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Note :</Text>
            <Text style={styles.scoreValue}>{correction.score}/{correction.maxScore}</Text>
            <View style={styles.scoreBar}>
              <View style={[styles.scoreFill, { width: `${(correction.score / correction.maxScore) * 100}%` }]} />
            </View>
          </View>

          <Text style={styles.date}>{correction.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  correctionCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  correctionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  studentName: { fontSize: 16, fontWeight: '600', color: '#333' },
  assignmentTitle: { fontSize: 14, color: '#666', marginBottom: 4 },
  subject: { fontSize: 13, color: '#999', marginBottom: 12 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  scoreContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  scoreLabel: { fontSize: 14, color: '#333', marginRight: 8 },
  scoreValue: { fontSize: 16, fontWeight: 'bold', color: '#1565c0', marginRight: 12 },
  scoreBar: { flex: 1, height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden' },
  scoreFill: { height: '100%', backgroundColor: '#1565c0', borderRadius: 4 },
  date: { fontSize: 12, color: '#999', textAlign: 'right' },
});
