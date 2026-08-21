import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const AiQuizScreen: React.FC<{ route: { params: { subject: string } } }> = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`/api/ai/quiz?subject=${route.params.subject}`);
      const json = await response.json();
      setQuestions(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <View style={styles.container}>
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Quiz Terminé !</Text>
          <Text style={styles.resultScore}>{score}/{questions.length}</Text>
          <Text style={styles.resultPercentage}>{percentage}%</Text>
          <Text style={styles.resultMessage}>
            {percentage >= 80 ? 'Excellent travail !' : percentage >= 60 ? 'Bon travail !' : 'Continuez à réviser !'}
          </Text>
        </View>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>Question {currentQuestionIndex + 1}/{questions.length}</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }]} />
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedAnswer === index && index === currentQuestion.correctAnswer && styles.correctOption,
            selectedAnswer === index && index !== currentQuestion.correctAnswer && styles.incorrectOption,
            selectedAnswer !== null && index === currentQuestion.correctAnswer && styles.correctOption,
          ]}
          onPress={() => handleAnswerSelect(index)}
          disabled={selectedAnswer !== null}
        >
          <Text style={[
            styles.optionText,
            selectedAnswer === index && index === currentQuestion.correctAnswer && styles.correctOptionText,
            selectedAnswer === index && index !== currentQuestion.correctAnswer && styles.incorrectOptionText,
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      {showExplanation && (
        <View style={styles.explanationCard}>
          <Text style={styles.explanationTitle}>Explication</Text>
          <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
        </View>
      )}

      {selectedAnswer !== null && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressText: { fontSize: 14, fontWeight: '600', color: '#333' },
  scoreText: { fontSize: 14, fontWeight: '600', color: '#1565c0' },
  progressBar: { height: 6, backgroundColor: '#e0e0e0', borderRadius: 3, marginBottom: 20 },
  progressFill: { height: '100%', backgroundColor: '#1565c0', borderRadius: 3 },
  questionCard: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  questionText: { fontSize: 16, lineHeight: 24, color: '#333' },
  optionButton: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#ddd', borderRadius: 12, padding: 16, marginBottom: 12 },
  optionText: { fontSize: 14, color: '#333' },
  correctOption: { borderColor: '#28a745', backgroundColor: '#d4edda' },
  incorrectOption: { borderColor: '#dc3545', backgroundColor: '#f8d7da' },
  correctOptionText: { color: '#155724', fontWeight: '600' },
  incorrectOptionText: { color: '#721c24', fontWeight: '600' },
  explanationCard: { backgroundColor: '#e3f2fd', borderRadius: 12, padding: 16, marginBottom: 16 },
  explanationTitle: { fontSize: 14, fontWeight: '600', color: '#1565c0', marginBottom: 8 },
  explanationText: { fontSize: 14, color: '#333', lineHeight: 20 },
  nextButton: { backgroundColor: '#1565c0', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginBottom: 16 },
  nextButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  resultCard: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 32 },
  resultTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 16 },
  resultScore: { fontSize: 48, fontWeight: 'bold', color: '#1565c0', marginBottom: 8 },
  resultPercentage: { fontSize: 24, color: '#666', marginBottom: 16 },
  resultMessage: { fontSize: 16, color: '#28a745', fontWeight: '600' },
});
