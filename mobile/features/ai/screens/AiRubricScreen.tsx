import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Rubric {
  id: string;
  title: string;
  subject: string;
  criteriaCount: number;
  levelsCount: number;
  createdAt: string;
}

export const AiRubricScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [rubrics, setRubrics] = useState<Rubric[]>([]);

  useEffect(() => {
    fetchRubrics();
  }, []);

  const fetchRubrics = async () => {
    try {
      const response = await fetch('/api/ai/rubrics');
      const json = await response.json();
      setRubrics(json.data);
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
      <Text style={styles.title}>Grilles d'Évaluation</Text>
      <Text style={styles.subtitle}>Grilles de critères pour l'évaluation</Text>

      {rubrics.map((rubric) => (
        <TouchableOpacity
          key={rubric.id}
          style={styles.rubricCard}
          onPress={() => navigation.navigate('AiRubricDetail', { id: rubric.id })}
        >
          <Text style={styles.rubricTitle}>{rubric.title}</Text>
          <Text style={styles.rubricSubject}>{rubric.subject}</Text>
          <View style={styles.rubricMeta}>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{rubric.criteriaCount}</Text>
              <Text style={styles.metaLabel}>Critères</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{rubric.levelsCount}</Text>
              <Text style={styles.metaLabel}>Niveaux</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{rubric.createdAt}</Text>
              <Text style={styles.metaLabel}>Créée le</Text>
            </View>
          </View>
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
  rubricCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  rubricTitle: { fontSize: 16, fontWeight: '600', marginBottom: 4, color: '#333' },
  rubricSubject: { fontSize: 14, color: '#666', marginBottom: 12 },
  rubricMeta: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 12 },
  metaItem: { alignItems: 'center' },
  metaValue: { fontSize: 16, fontWeight: '600', color: '#1565c0' },
  metaLabel: { fontSize: 12, color: '#666', marginTop: 2 },
});
