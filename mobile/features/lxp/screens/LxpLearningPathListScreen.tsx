import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface LearningPathItem {
  id: string;
  title: string;
  description: string;
  courseCount: number;
  progress: number;
}

export const LxpLearningPathListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [paths, setPaths] = useState<LearningPathItem[]>([]);

  useEffect(() => {
    fetchPaths();
  }, []);

  const fetchPaths = async () => {
    try {
      const response = await fetch('/api/lxp/learning-paths');
      const json = await response.json();
      setPaths(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {paths.map((path) => (
        <TouchableOpacity key={path.id} style={styles.card} onPress={() => navigation.navigate('LearningPathDetail', { id: path.id })}>
          <Text style={styles.title}>{path.title}</Text>
          <Text style={styles.description}>{path.description}</Text>
          <Text style={styles.meta}>{path.courseCount} courses</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${path.progress}%` }]} />
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
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  meta: { fontSize: 12, color: '#999', marginTop: 8 },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#9C27B0', borderRadius: 2 },
});
