import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface CourseItem {
  id: string;
  title: string;
  thumbnail: string;
  instructor: string;
  progress: number;
}

export const LxpCourseListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<CourseItem[]>([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/lxp/courses');
      const json = await response.json();
      setCourses(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {courses.map((course) => (
        <TouchableOpacity key={course.id} style={styles.card} onPress={() => navigation.navigate('CourseDetail', { id: course.id })}>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.subtitle}>{course.instructor}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${course.progress}%` }]} />
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
  subtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#4CAF50', borderRadius: 2 },
});
