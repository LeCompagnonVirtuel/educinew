import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ModuleItem {
  id: string;
  title: string;
  lessonCount: number;
  progress: number;
}

export const LxpModuleListScreen: React.FC<{ navigation: unknown; route: { params: { courseId: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<ModuleItem[]>([]);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const response = await fetch(`/api/lxp/courses/${route.params.courseId}/modules`);
      const json = await response.json();
      setModules(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {modules.map((mod) => (
        <TouchableOpacity key={mod.id} style={styles.card} onPress={() => navigation.navigate('ModuleDetail', { id: mod.id })}>
          <Text style={styles.title}>{mod.title}</Text>
          <Text style={styles.meta}>{mod.lessonCount} lessons</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${mod.progress}%` }]} />
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
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#4CAF50', borderRadius: 2 },
});
