import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LessonDetail {
  id: string;
  title: string;
  type: string;
  duration: string;
  content: string;
  objectives: string[];
  resources: { id: string; title: string; url: string; }[];
}

export const LxpLessonDetailScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<LessonDetail | null>(null);

  useEffect(() => {
    fetchLessonDetail();
  }, []);

  const fetchLessonDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/lessons/${route.params.id}`);
      const json = await response.json();
      setLesson(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!lesson) return <View style={styles.container}><Text>Lesson not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.meta}>{lesson.type} • {lesson.duration}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Objectives</Text>
        {lesson.objectives.map((obj, index) => (
          <Text key={index} style={styles.objective}>• {obj}</Text>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content</Text>
        <Text style={styles.content}>{lesson.content}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Resources</Text>
        {lesson.resources.map((resource) => (
          <TouchableOpacity key={resource.id} style={styles.resourceCard}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  objective: { fontSize: 14, color: '#333', marginBottom: 4 },
  content: { fontSize: 14, color: '#333', lineHeight: 20 },
  resourceCard: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, marginBottom: 8 },
  resourceTitle: { fontSize: 14, fontWeight: '500' },
});
