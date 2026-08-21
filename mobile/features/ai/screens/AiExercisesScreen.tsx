import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Exercise {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  type: string;
  estimatedTime: number;
  completed: boolean;
}

export const AiExercisesScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('tous');

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch('/api/ai/exercises');
      const json = await response.json();
      setExercises(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return '#28a745';
      case 'moyen': return '#ffc107';
      case 'difficile': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const filteredExercises = selectedFilter === 'tous'
    ? exercises
    : exercises.filter((e) => e.difficulty === selectedFilter);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Exercices</Text>
      <Text style={styles.subtitle}>Exercices générés par IA pour votre pratique</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {['tous', 'facile', 'moyen', 'difficile'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === filter && styles.filterButtonActive]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredExercises.map((exercise) => (
        <TouchableOpacity
          key={exercise.id}
          style={[styles.exerciseCard, exercise.completed && styles.completedExercise]}
          onPress={() => navigation.navigate('AiQuiz', { exerciseId: exercise.id })}
        >
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseTitle}>{exercise.title}</Text>
            {exercise.completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.exerciseSubject}>{exercise.subject}</Text>
          <View style={styles.exerciseMeta}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }]}>
              <Text style={[styles.difficultyText, { color: getDifficultyColor(exercise.difficulty) }]}>{exercise.difficulty}</Text>
            </View>
            <Text style={styles.exerciseType}>{exercise.type}</Text>
            <Text style={styles.exerciseTime}>{exercise.estimatedTime} min</Text>
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
  filterContainer: { marginBottom: 16 },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 8, borderWidth: 1, borderColor: '#ddd' },
  filterButtonActive: { backgroundColor: '#1565c0', borderColor: '#1565c0' },
  filterText: { fontSize: 14, color: '#666' },
  filterTextActive: { color: '#fff', fontWeight: '600' },
  exerciseCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  completedExercise: { opacity: 0.7 },
  exerciseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  exerciseTitle: { fontSize: 16, fontWeight: '600', color: '#333', flex: 1 },
  checkmark: { fontSize: 18, color: '#28a745', fontWeight: 'bold' },
  exerciseSubject: { fontSize: 14, color: '#666', marginBottom: 12 },
  exerciseMeta: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  difficultyBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  difficultyText: { fontSize: 12, fontWeight: '600' },
  exerciseType: { fontSize: 12, color: '#999' },
  exerciseTime: { fontSize: 12, color: '#999' },
});
