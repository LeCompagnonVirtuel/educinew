import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ModuleDetail {
  id: string;
  title: string;
  description: string;
  lessons: { id: string; title: string; type: string; duration: string; }[];
}

export const LxpModuleDetailScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [moduleDetail, setModuleDetail] = useState<ModuleDetail | null>(null);

  useEffect(() => {
    fetchModuleDetail();
  }, []);

  const fetchModuleDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/modules/${route.params.id}`);
      const json = await response.json();
      setModuleDetail(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!moduleDetail) return <View style={styles.container}><Text>Module not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{moduleDetail.title}</Text>
        <Text style={styles.description}>{moduleDetail.description}</Text>
      </View>
      <Text style={styles.sectionTitle}>Lessons</Text>
      {moduleDetail.lessons.map((lesson) => (
        <TouchableOpacity key={lesson.id} style={styles.lessonCard} onPress={() => navigation.navigate('LessonDetail', { id: lesson.id })}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonMeta}>{lesson.type} • {lesson.duration}</Text>
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
  lessonCard: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 4, borderRadius: 8 },
  lessonTitle: { fontSize: 14, fontWeight: '500' },
  lessonMeta: { fontSize: 12, color: '#999', marginTop: 4 },
});
