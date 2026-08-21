import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface CourseDetail {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  progress: number;
  modules: { id: string; title: string; }[];
}

export const LxpCourseDetailScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseDetail | null>(null);

  useEffect(() => {
    fetchCourseDetail();
  }, []);

  const fetchCourseDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/courses/${route.params.id}`);
      const json = await response.json();
      setCourse(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!course) return <View style={styles.container}><Text>Course not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.instructor}>by {course.instructor}</Text>
        <Text style={styles.duration}>{course.duration}</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
        </View>
      </View>
      <Text style={styles.description}>{course.description}</Text>
      <Text style={styles.sectionTitle}>Modules</Text>
      {course.modules.map((mod) => (
        <TouchableOpacity key={mod.id} style={styles.moduleCard} onPress={() => navigation.navigate('ModuleDetail', { id: mod.id })}>
          <Text style={styles.moduleTitle}>{mod.title}</Text>
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
  instructor: { fontSize: 14, color: '#666', marginTop: 4 },
  duration: { fontSize: 14, color: '#999', marginTop: 4 },
  description: { fontSize: 14, color: '#333', padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', padding: 16 },
  moduleCard: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 4, borderRadius: 8 },
  moduleTitle: { fontSize: 14, fontWeight: '500' },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#4CAF50', borderRadius: 2 },
});
