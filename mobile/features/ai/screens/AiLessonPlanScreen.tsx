import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number;
  objectives: string[];
  activities: string[];
  status: string;
}

export const AiLessonPlanScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<LessonPlan[]>([]);

  useEffect(() => {
    fetchLessonPlans();
  }, []);

  const fetchLessonPlans = async () => {
    try {
      const response = await fetch('/api/ai/lesson-plans');
      const json = await response.json();
      setPlans(json.data);
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
      <Text style={styles.title}>Plan de Cours</Text>
      <Text style={styles.subtitle}>Plans de cours générés par IA</Text>

      {plans.map((plan) => (
        <TouchableOpacity
          key={plan.id}
          style={styles.planCard}
          onPress={() => navigation.navigate('AiLessonPlanDetail', { id: plan.id })}
        >
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>{plan.title}</Text>
            <View style={[styles.statusBadge, plan.status === 'brouillon' ? styles.draftBadge : styles.publishedBadge]}>
              <Text style={[styles.statusText, plan.status === 'brouillon' ? styles.draftText : styles.publishedText]}>{plan.status}</Text>
            </View>
          </View>
          <Text style={styles.planSubject}>{plan.subject} - {plan.grade}</Text>
          <Text style={styles.planDuration}>{plan.duration} minutes</Text>

          <View style={styles.objectivesSection}>
            <Text style={styles.sectionLabel}>Objectifs :</Text>
            {plan.objectives.slice(0, 2).map((objective, index) => (
              <Text key={index} style={styles.objectiveText}>• {objective}</Text>
            ))}
            {plan.objectives.length > 2 && (
              <Text style={styles.moreText}>+{plan.objectives.length - 2} autres objectifs</Text>
            )}
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
  planCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  planTitle: { fontSize: 16, fontWeight: '600', flex: 1, color: '#333' },
  planSubject: { fontSize: 14, color: '#666', marginBottom: 4 },
  planDuration: { fontSize: 13, color: '#999', marginBottom: 12 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  draftBadge: { backgroundColor: '#fff3cd' },
  publishedBadge: { backgroundColor: '#d4edda' },
  statusText: { fontSize: 12, fontWeight: '600' },
  draftText: { color: '#856404' },
  publishedText: { color: '#155724' },
  objectivesSection: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12 },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 6 },
  objectiveText: { fontSize: 13, color: '#666', marginBottom: 4, lineHeight: 18 },
  moreText: { fontSize: 12, color: '#1565c0', marginTop: 4 },
});
