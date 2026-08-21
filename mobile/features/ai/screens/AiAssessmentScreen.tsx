import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Assessment {
  id: string;
  title: string;
  subject: string;
  type: string;
  totalPoints: number;
  averageScore: number;
  submissionCount: number;
  dueDate: string;
}

export const AiAssessmentScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const response = await fetch('/api/ai/assessments');
      const json = await response.json();
      setAssessments(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Évaluations</Text>
      <Text style={styles.subtitle}>Évaluations et examens générés par IA</Text>

      {assessments.map((assessment) => (
        <TouchableOpacity
          key={assessment.id}
          style={styles.assessmentCard}
          onPress={() => navigation.navigate('AiAssessmentDetail', { id: assessment.id })}
        >
          <View style={styles.assessmentHeader}>
            <Text style={styles.assessmentTitle}>{assessment.title}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{assessment.type}</Text>
            </View>
          </View>
          <Text style={styles.assessmentSubject}>{assessment.subject}</Text>

          <View style={styles.assessmentStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{assessment.totalPoints}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{assessment.averageScore}%</Text>
              <Text style={styles.statLabel}>Moyenne</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{assessment.submissionCount}</Text>
              <Text style={styles.statLabel}>Soumissions</Text>
            </View>
          </View>

          <View style={styles.assessmentFooter}>
            <Text style={styles.footerLabel}>Échéance :</Text>
            <Text style={styles.footerValue}>{assessment.dueDate}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  assessmentCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  assessmentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  assessmentTitle: { fontSize: 16, fontWeight: '600', flex: 1, color: '#333' },
  typeBadge: { backgroundColor: '#e8eaf6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  typeText: { fontSize: 12, fontWeight: '600', color: '#3f51b5' },
  assessmentSubject: { fontSize: 14, color: '#666', marginBottom: 12 },
  assessmentStats: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#eee', borderBottomWidth: 1, borderBottomColor: '#eee', marginBottom: 12 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#1565c0' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  assessmentFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerLabel: { fontSize: 13, color: '#333' },
  footerValue: { fontSize: 13, color: '#666' },
});
