import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LearningPathDetail {
  id: string;
  title: string;
  description: string;
  progress: number;
  courses: { id: string; title: string; completed: boolean; }[];
}

export const LxpLearningPathDetailScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState<LearningPathDetail | null>(null);

  useEffect(() => {
    fetchPathDetail();
  }, []);

  const fetchPathDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/learning-paths/${route.params.id}`);
      const json = await response.json();
      setPath(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!path) return <View style={styles.container}><Text>Learning path not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{path.title}</Text>
        <Text style={styles.description}>{path.description}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${path.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{path.progress}% complete</Text>
      </View>
      <Text style={styles.sectionTitle}>Courses</Text>
      {path.courses.map((course) => (
        <TouchableOpacity key={course.id} style={styles.courseCard} onPress={() => navigation.navigate('CourseDetail', { id: course.id })}>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <View style={[styles.statusBadge, course.completed && styles.statusCompleted]}>
              <Text style={[styles.statusText, course.completed && styles.statusTextCompleted]}>
                {course.completed ? '✓' : '○'}
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
  header: { backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', padding: 16 },
  courseCard: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 4, borderRadius: 8 },
  courseInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  courseTitle: { fontSize: 14, fontWeight: '500', flex: 1 },
  statusBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' },
  statusCompleted: { backgroundColor: '#4CAF50' },
  statusText: { fontSize: 14, color: '#999' },
  statusTextCompleted: { color: '#fff' },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#9C27B0', borderRadius: 2 },
  progressText: { fontSize: 12, color: '#666', marginTop: 4 },
});
