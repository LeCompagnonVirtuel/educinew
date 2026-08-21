import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LessonItem {
  id: string;
  title: string;
  type: string;
  duration: string;
  completed: boolean;
}

export const LxpLessonListScreen: React.FC<{ navigation: unknown; route: { params: { moduleId: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<LessonItem[]>([]);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await fetch(`/api/lxp/modules/${route.params.moduleId}/lessons`);
      const json = await response.json();
      setLessons(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {lessons.map((lesson) => (
        <TouchableOpacity key={lesson.id} style={styles.card} onPress={() => navigation.navigate('LessonDetail', { id: lesson.id })}>
          <View style={styles.lessonInfo}>
            <Text style={styles.title}>{lesson.title}</Text>
            <Text style={styles.meta}>{lesson.type} • {lesson.duration}</Text>
          </View>
          <View style={[styles.statusBadge, lesson.completed && styles.statusCompleted]}>
            <Text style={[styles.statusText, lesson.completed && styles.statusTextCompleted]}>
              {lesson.completed ? '✓' : '○'}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  lessonInfo: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 14, color: '#666', marginTop: 4 },
  statusBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  statusCompleted: { backgroundColor: '#4CAF50' },
  statusText: { fontSize: 14, color: '#999' },
  statusTextCompleted: { color: '#fff' },
});
