import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AssignmentItem {
  id: string;
  title: string;
  dueDate: string;
  status: string;
  maxScore: number;
}

export const LxpAssignmentListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await fetch('/api/lxp/assignments');
      const json = await response.json();
      setAssignments(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {assignments.map((assignment) => (
        <TouchableOpacity key={assignment.id} style={styles.card} onPress={() => navigation.navigate('AssignmentDetail', { id: assignment.id })}>
          <Text style={styles.title}>{assignment.title}</Text>
          <Text style={styles.meta}>Due: {assignment.dueDate}</Text>
          <View style={styles.footer}>
            <Text style={styles.score}>Max: {assignment.maxScore}</Text>
            <View style={[styles.statusBadge, assignment.status === 'completed' && styles.statusCompleted]}>
              <Text style={[styles.statusText, assignment.status === 'completed' && styles.statusTextCompleted]}>
                {assignment.status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 14, color: '#666', marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  score: { fontSize: 12, color: '#999' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, backgroundColor: '#e0e0e0' },
  statusCompleted: { backgroundColor: '#4CAF50' },
  statusText: { fontSize: 12, color: '#666' },
  statusTextCompleted: { color: '#fff' },
});
