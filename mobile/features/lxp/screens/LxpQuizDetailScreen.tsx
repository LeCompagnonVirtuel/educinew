import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface QuizDetail {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  timeLimit: number;
  passingScore: number;
  instructions: string;
}

export const LxpQuizDetailScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<QuizDetail | null>(null);

  useEffect(() => {
    fetchQuizDetail();
  }, []);

  const fetchQuizDetail = async () => {
    try {
      const response = await fetch(`/api/lxp/quizzes/${route.params.id}`);
      const json = await response.json();
      setQuiz(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;
  if (!quiz) return <View style={styles.container}><Text>Quiz not found</Text></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{quiz.title}</Text>
        <Text style={styles.description}>{quiz.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quiz Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Questions:</Text>
          <Text style={styles.infoValue}>{quiz.questionCount}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Time Limit:</Text>
          <Text style={styles.infoValue}>{quiz.timeLimit} minutes</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Passing Score:</Text>
          <Text style={styles.infoValue}>{quiz.passingScore}%</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{quiz.instructions}</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('QuizAttempt', { id: quiz.id })}>
        <Text style={styles.startButtonText}>Start Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#fff', padding: 16 },
  title: { fontSize: 20, fontWeight: '700' },
  description: { fontSize: 14, color: '#666', marginTop: 8 },
  section: { backgroundColor: '#fff', padding: 16, marginTop: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  infoLabel: { fontSize: 14, color: '#666' },
  infoValue: { fontSize: 14, fontWeight: '500' },
  instructions: { fontSize: 14, color: '#333', lineHeight: 20 },
  startButton: { backgroundColor: '#FF9800', margin: 16, padding: 16, borderRadius: 8, alignItems: 'center' },
  startButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
