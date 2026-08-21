import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface QuizItem {
  id: string;
  title: string;
  questionCount: number;
  timeLimit: number;
  attempts: number;
  maxAttempts: number;
}

export const LxpQuizListScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/lxp/quizzes');
      const json = await response.json();
      setQuizzes(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {quizzes.map((quiz) => (
        <TouchableOpacity key={quiz.id} style={styles.card} onPress={() => navigation.navigate('QuizDetail', { id: quiz.id })}>
          <Text style={styles.title}>{quiz.title}</Text>
          <Text style={styles.meta}>{quiz.questionCount} questions • {quiz.timeLimit} min</Text>
          <Text style={styles.attempts}>Attempts: {quiz.attempts}/{quiz.maxAttempts}</Text>
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
  attempts: { fontSize: 12, color: '#999', marginTop: 4 },
});
