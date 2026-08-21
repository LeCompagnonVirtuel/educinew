import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface CompetencyItem {
  id: string;
  name: string;
  level: string;
  progress: number;
  skillCount: number;
}

export const LxpCompetencyListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [competencies, setCompetencies] = useState<CompetencyItem[]>([]);

  useEffect(() => {
    fetchCompetencies();
  }, []);

  const fetchCompetencies = async () => {
    try {
      const response = await fetch('/api/lxp/competencies');
      const json = await response.json();
      setCompetencies(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {competencies.map((comp) => (
        <TouchableOpacity key={comp.id} style={styles.card} onPress={() => navigation.navigate('CompetencyDetail', { id: comp.id })}>
          <View style={styles.header}>
            <Text style={styles.name}>{comp.name}</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{comp.level}</Text>
            </View>
          </View>
          <Text style={styles.meta}>{comp.skillCount} skills</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${comp.progress}%` }]} />
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600' },
  levelBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  levelText: { fontSize: 12, color: '#4CAF50', fontWeight: '500' },
  meta: { fontSize: 14, color: '#666', marginTop: 4 },
  progressBar: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#4CAF50', borderRadius: 2 },
});
