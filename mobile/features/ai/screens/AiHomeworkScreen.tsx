import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Homework {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  estimatedTime: number;
}

export const AiHomeworkScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);

  useEffect(() => {
    fetchHomeworks();
  }, []);

  const fetchHomeworks = async () => {
    try {
      const response = await fetch('/api/ai/homework');
      const json = await response.json();
      setHomeworks(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'haute': return '#dc3545';
      case 'moyenne': return '#ffc107';
      case 'basse': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Devoirs</Text>
      <Text style={styles.subtitle}>Gestion des devoirs avec assistance IA</Text>

      <Text style={styles.sectionTitle}>À faire</Text>
      {homeworks.filter((h) => !h.completed).map((homework) => (
        <View key={homework.id} style={styles.homeworkCard}>
          <View style={styles.homeworkHeader}>
            <Text style={styles.homeworkTitle}>{homework.title}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(homework.priority) + '20' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(homework.priority) }]}>{homework.priority}</Text>
            </View>
          </View>
          <Text style={styles.homeworkSubject}>{homework.subject}</Text>
          <View style={styles.homeworkFooter}>
            <Text style={styles.footerText}>📅 {homework.dueDate}</Text>
            <Text style={styles.footerText}>⏱️ {homework.estimatedTime} min</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Terminés</Text>
      {homeworks.filter((h) => h.completed).map((homework) => (
        <View key={homework.id} style={[styles.homeworkCard, styles.completedHomework]}>
          <View style={styles.homeworkHeader}>
            <Text style={styles.homeworkTitle}>{homework.title}</Text>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.homeworkSubject}>{homework.subject}</Text>
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
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  homeworkCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  completedHomework: { opacity: 0.6 },
  homeworkHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  homeworkTitle: { fontSize: 16, fontWeight: '600', flex: 1, color: '#333' },
  homeworkSubject: { fontSize: 14, color: '#666', marginBottom: 8 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  priorityText: { fontSize: 12, fontWeight: '600' },
  homeworkFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 12, color: '#999' },
  checkmark: { fontSize: 18, color: '#28a745', fontWeight: 'bold' },
});
