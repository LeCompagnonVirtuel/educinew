import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  priority: string;
  completed: boolean;
  dueDate: string;
}

export const AiStudyPlanScreen: React.FC = ({ navigation }: { navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }) => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<StudyTask[]>([]);

  useEffect(() => {
    fetchStudyPlan();
  }, []);

  const fetchStudyPlan = async () => {
    try {
      const response = await fetch('/api/ai/study-plan');
      const json = await response.json();
      setTasks(json.data);
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
      <Text style={styles.title}>Plan d'Étude</Text>
      <Text style={styles.subtitle}>Votre programme d'étude personnalisé par IA</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{tasks.length}</Text>
          <Text style={styles.statLabel}>Tâches totales</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{tasks.filter((t) => t.completed).length}</Text>
          <Text style={styles.statLabel}>Terminées</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{tasks.filter((t) => !t.completed).length}</Text>
          <Text style={styles.statLabel}>En cours</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Tâches à venir</Text>
      {tasks.filter((t) => !t.completed).map((task) => (
        <TouchableOpacity key={task.id} style={styles.taskCard}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskSubject}>{task.subject}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) + '20' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>{task.priority}</Text>
            </View>
          </View>
          <Text style={styles.taskTopic}>{task.topic}</Text>
          <View style={styles.taskFooter}>
            <Text style={styles.taskDuration}>{task.duration} min</Text>
            <Text style={styles.taskDue}>{task.dueDate}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Tâches terminées</Text>
      {tasks.filter((t) => t.completed).map((task) => (
        <View key={task.id} style={[styles.taskCard, styles.completedTask]}>
          <View style={styles.taskHeader}>
            <Text style={styles.taskSubject}>{task.subject}</Text>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.taskTopic}>{task.topic}</Text>
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
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, marginHorizontal: 4, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#1565c0' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  taskCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  completedTask: { opacity: 0.6 },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  taskSubject: { fontSize: 16, fontWeight: '600', color: '#333' },
  taskTopic: { fontSize: 14, color: '#666', marginBottom: 8 },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  priorityText: { fontSize: 12, fontWeight: '600' },
  taskFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  taskDuration: { fontSize: 12, color: '#999' },
  taskDue: { fontSize: 12, color: '#999' },
  checkmark: { fontSize: 18, color: '#28a745', fontWeight: 'bold' },
});
