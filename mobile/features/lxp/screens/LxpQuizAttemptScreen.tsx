import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Question {
  id: string;
  text: string;
  options: { id: string; text: string; }[];
}

export const LxpQuizAttemptScreen: React.FC<{ navigation: unknown; route: { params: { id: string } } }> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/lxp/quizzes/${route.params.id}/questions`);
      const json = await response.json();
      setQuestions(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch(`/api/lxp/quizzes/${route.params.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  const question = questions[currentQuestion];
  if (!question) return <View style={styles.container}><Text>No questions available</Text></View>;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <Text style={styles.progressText}>Question {currentQuestion + 1} of {questions.length}</Text>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${((currentQuestion + 1) / questions.length) * 100}%` }]} />
        </View>
      </View>
      <ScrollView style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.optionCard, answers[question.id] === option.id && styles.optionSelected]}
            onPress={() => handleAnswer(question.id, option.id)}
          >
            <Text style={[styles.optionText, answers[question.id] === option.id && styles.optionTextSelected]}>
              {option.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        {currentQuestion < questions.length - 1 ? (
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentQuestion(currentQuestion + 1)}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={submitting}>
            {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Submit</Text>}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  progressBar: { backgroundColor: '#fff', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  progressText: { fontSize: 14, color: '#666', marginBottom: 8 },
  progressTrack: { height: 4, backgroundColor: '#e0e0e0', borderRadius: 2 },
  progressFill: { height: 4, backgroundColor: '#FF9800', borderRadius: 2 },
  questionContainer: { flex: 1, padding: 16 },
  questionText: { fontSize: 16, fontWeight: '500', marginBottom: 16 },
  optionCard: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#e0e0e0' },
  optionSelected: { borderColor: '#FF9800', backgroundColor: '#FFF3E0' },
  optionText: { fontSize: 14, color: '#333' },
  optionTextSelected: { color: '#FF9800', fontWeight: '500' },
  navigation: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#fff' },
  navButton: { backgroundColor: '#e0e0e0', padding: 12, borderRadius: 8, minWidth: 100, alignItems: 'center' },
  navButtonText: { fontSize: 14, fontWeight: '600' },
  submitButton: { backgroundColor: '#4CAF50', padding: 12, borderRadius: 8, minWidth: 100, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
