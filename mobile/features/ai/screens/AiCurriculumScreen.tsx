import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface CurriculumItem {
  id: string;
  title: string;
  level: string;
  subjects: string[];
  modulesCount: number;
  status: string;
}

export const AiCurriculumScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [curriculum, setCurriculum] = useState<CurriculumItem[]>([]);

  useEffect(() => {
    fetchCurriculum();
  }, []);

  const fetchCurriculum = async () => {
    try {
      const response = await fetch('/api/ai/curriculum');
      const json = await response.json();
      setCurriculum(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Programme</Text>
      <Text style={styles.subtitle}>Programme scolaire et curricula</Text>

      {curriculum.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.curriculumCard}
          onPress={() => navigation.navigate('AiCurriculumDetail', { id: item.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <Text style={styles.cardLevel}>Niveau : {item.level}</Text>
          <View style={styles.subjectsContainer}>
            {item.subjects.map((subject, index) => (
              <View key={index} style={styles.subjectBadge}>
                <Text style={styles.subjectText}>{subject}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.modulesCount}>{item.modulesCount} modules</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  curriculumCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600', flex: 1, color: '#333' },
  cardLevel: { fontSize: 14, color: '#666', marginBottom: 12 },
  statusBadge: { backgroundColor: '#e8eaf6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600', color: '#3f51b5' },
  subjectsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  subjectBadge: { backgroundColor: '#e3f2fd', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  subjectText: { fontSize: 11, color: '#1565c0' },
  modulesCount: { fontSize: 13, color: '#999' },
});
