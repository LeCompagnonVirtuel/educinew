import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AssignmentDetail {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  instructions: string;
  attachments: { id: string; name: string; url: string; }[];
}

export const LxpAssignmentDetailScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState<AssignmentDetail | null>(null);

  useEffect(() => {
    fetchAssignmentDetail();
  }, []);

  const fetchAssignmentDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/assignments/${route.params.id}`);
      const json = await response.json();
      setAssignment(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!assignment) return <View style={styles.container}><Text>Assignment not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{assignment.title}</Text>
        <Text style={styles.meta}>Due: {assignment.dueDate} • Max Score: {assignment.maxScore}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{assignment.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{assignment.instructions}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Attachments</Text>
        {assignment.attachments.map((attachment) => (
          <TouchableOpacity key={attachment.id} style={styles.attachmentCard}>
            <Text style={styles.attachmentName}>{attachment.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('Submission', { assignmentId: assignment.id })}>
        <Text style={styles.submitButtonText}>Submit Assignment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  meta: { fontSize: 14, color: '#666', marginTop: 4 },
  section: { backgroundColor: '#fff', padding: 16, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  description: { fontSize: 14, color: '#333', lineHeight: 20 },
  instructions: { fontSize: 14, color: '#333', lineHeight: 20 },
  attachmentCard: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, marginBottom: 8 },
  attachmentName: { fontSize: 14, fontWeight: '500' },
  submitButton: { backgroundColor: '#2196F3', margin: 16, padding: 16, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
