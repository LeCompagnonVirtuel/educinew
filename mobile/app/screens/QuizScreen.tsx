import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';
import { supabase } from '../../services/supabase';

interface Quiz {
  id: string;
  title: string;
  description?: string;
  time_limit_minutes: number;
  questions: QuizQuestion[];
  subject?: { id: string; name: string };
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
}

export default function QuizScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadQuizzes = useCallback(async () => {
    if (!user?.schoolId) return;
    try {
      const { data } = await supabase
        .from('quizzes')
        .select('*, subject:subjects(*)')
        .eq('school_id', user.schoolId);
      setQuizzes(data || []);
    } catch (err) {
      console.error('[QuizScreen]', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.schoolId]);

  useEffect(() => { loadQuizzes(); }, [loadQuizzes]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadQuizzes();
  }, [loadQuizzes]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setQuizFinished(false);
    setQuizScore(0);
    const totalSeconds = (quiz.time_limit_minutes || 15) * 60;
    setTimeLeft(totalSeconds);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    if (quizFinished) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const goNext = () => {
    if (!activeQuiz) return;
    if (currentIndex < activeQuiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const finishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!activeQuiz) return;
    let score = 0;
    activeQuiz.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct_answer) score++;
    });
    setQuizScore(score);
    setQuizFinished(true);
  };

  const exitQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveQuiz(null);
    setQuizFinished(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 30) return COLORS.error;
    if (timeLeft <= 120) return COLORS.warning;
    return COLORS.primary;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (activeQuiz) {
    const currentQuestion = activeQuiz.questions[currentIndex];
    const totalQuestions = activeQuiz.questions.length;
    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    if (quizFinished) {
      const percentage = totalQuestions > 0 ? Math.round((quizScore / totalQuestions) * 100) : 0;
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.quizContainer}>
            <TouchableOpacity style={styles.exitBtn} onPress={exitQuiz}>
              <Ionicons name="close" size={24} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>

            <View style={styles.resultContainer}>
              <View style={[styles.resultCircle, { borderColor: percentage >= 50 ? COLORS.success : COLORS.error }]}>
                <Text style={[styles.resultPercent, { color: percentage >= 50 ? COLORS.success : COLORS.error }]}>
                  {percentage}%
                </Text>
              </View>
              <Text style={styles.resultTitle}>
                {percentage >= 80 ? 'Excellent !' : percentage >= 50 ? 'Bien joué !' : 'Continuez à réviser'}
              </Text>
              <Text style={styles.resultSubtitle}>
                {quizScore}/{totalQuestions} bonnes réponses
              </Text>

              <View style={styles.resultStats}>
                <View style={styles.resultStat}>
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                  <Text style={styles.resultStatText}>{quizScore} correct{quizScore > 1 ? 'es' : ''}</Text>
                </View>
                <View style={styles.resultStat}>
                  <Ionicons name="close-circle" size={20} color={COLORS.error} />
                  <Text style={styles.resultStatText}>{totalQuestions - quizScore} incorrect{totalQuestions - quizScore > 1 ? 'es' : ''}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.primaryBtn} onPress={exitQuiz}>
                <Text style={styles.primaryBtnText}>Retour aux quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.quizContainer}>
          <View style={styles.quizHeader}>
            <TouchableOpacity onPress={exitQuiz} style={styles.backBtn}>
              <Ionicons name="close" size={24} color={COLORS.onSurface} />
            </TouchableOpacity>
            <Text style={styles.quizTimer} testID="timer">{formatTime(timeLeft)}</Text>
            <View style={styles.timerBadge}>
              <Ionicons name="time-outline" size={14} color={getTimerColor()} />
            </View>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>Question {currentIndex + 1} sur {totalQuestions}</Text>

          {currentQuestion && (
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>

              <View style={styles.optionsContainer}>
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentIndex] === idx;
                  return (
                    <TouchableOpacity
                      key={idx}
                      style={[styles.optionBtn, isSelected && styles.optionBtnActive]}
                      onPress={() => selectAnswer(currentIndex, idx)}
                    >
                      <View style={[styles.optionRadio, isSelected && styles.optionRadioActive]}>
                        {isSelected && <View style={styles.optionRadioInner} />}
                      </View>
                      <Text style={[styles.optionText, isSelected && styles.optionTextActive]}>{option}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          <View style={styles.quizNav}>
            <TouchableOpacity
              style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]}
              onPress={goPrev}
              disabled={currentIndex === 0}
            >
              <Ionicons name="chevron-back" size={20} color={currentIndex === 0 ? COLORS.outline : COLORS.onSurface} />
              <Text style={[styles.navBtnText, currentIndex === 0 && { color: COLORS.outline }]}>Précédent</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.navBtnPrimary, selectedAnswers[currentIndex] == null && styles.navBtnPrimaryDisabled]}
              onPress={goNext}
              disabled={selectedAnswers[currentIndex] == null}
            >
              <Text style={styles.navBtnPrimaryText}>
                {currentIndex === totalQuestions - 1 ? 'Terminer' : 'Suivant'}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.onPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
        <View style={{ width: 32 }} />
      </View>

      <FlatList
        data={quizzes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="help-circle-outline" size={56} color={COLORS.outlineVariant} />
            <Text style={styles.emptyTitle}>Aucun quiz disponible</Text>
            <Text style={styles.emptySubtitle}>Les quiz apparaîtront ici une fois publiés</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.quizCard} onPress={() => startQuiz(item)} activeOpacity={0.7}>
            <View style={styles.quizCardTop}>
              <View style={styles.quizIcon}>
                <Ionicons name="help-circle" size={24} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.quizCardTitle} numberOfLines={1}>{item.title}</Text>
                {item.subject && <Text style={styles.quizCardSubject}>{item.subject.name}</Text>}
              </View>
            </View>
            {item.description && (
              <Text style={styles.quizCardDesc} numberOfLines={2}>{item.description}</Text>
            )}
            <View style={styles.quizCardFooter}>
              <View style={styles.quizCardMeta}>
                <Ionicons name="help-outline" size={14} color={COLORS.onSurfaceVariant} />
                <Text style={styles.quizCardMetaText}>{item.questions?.length || 0} questions</Text>
              </View>
              <View style={styles.quizCardMeta}>
                <Ionicons name="time-outline" size={14} color={COLORS.onSurfaceVariant} />
                <Text style={styles.quizCardMetaText}>{item.time_limit_minutes || 15} min</Text>
              </View>
              <TouchableOpacity style={styles.startQuizBtn} onPress={() => startQuiz(item)}>
                <Text style={styles.startQuizBtnText}>Commencer</Text>
                <Ionicons name="play" size={14} color={COLORS.onPrimary} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { color: COLORS.onSurfaceVariant, fontSize: 14 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.onSurface },

  list: { paddingHorizontal: 16, paddingBottom: 100 },

  quizCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  quizCardTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  quizIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center' },
  quizCardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.onSurface },
  quizCardSubject: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  quizCardDesc: { fontSize: 13, color: COLORS.onSurfaceVariant, marginBottom: 12, lineHeight: 18 },
  quizCardFooter: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  quizCardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  quizCardMetaText: { fontSize: 12, color: COLORS.onSurfaceVariant },
  startQuizBtn: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  startQuizBtnText: { fontSize: 13, fontWeight: '700', color: COLORS.onPrimary },

  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface, marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: COLORS.onSurfaceVariant, marginTop: 6, textAlign: 'center' },

  quizContainer: { flex: 1, paddingHorizontal: 20, paddingTop: 8 },
  quizHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  quizTimer: { fontSize: 28, fontWeight: '800', color: COLORS.onSurface, fontVariant: ['tabular-nums'] },
  timerBadge: { width: 32, height: 32, borderRadius: 10, backgroundColor: COLORS.surfaceContainer, justifyContent: 'center', alignItems: 'center' },

  progressBarBg: { height: 6, backgroundColor: COLORS.surfaceContainer, borderRadius: 3, marginBottom: 4 },
  progressBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 3 },
  progressText: { fontSize: 12, color: COLORS.onSurfaceVariant, marginBottom: 16 },

  questionContainer: { flex: 1 },
  questionText: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface, lineHeight: 26, marginBottom: 24 },

  optionsContainer: { gap: 10 },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORS.surfaceContainer,
    gap: 12,
  },
  optionBtnActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryFixed },
  optionRadio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionRadioActive: { borderColor: COLORS.primary },
  optionRadioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary },
  optionText: { fontSize: 15, color: COLORS.onSurface, flex: 1 },
  optionTextActive: { fontWeight: '600', color: COLORS.primary },

  quizNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderTopWidth: 1, borderTopColor: COLORS.surfaceContainer },
  navBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, padding: 8 },
  navBtnDisabled: { opacity: 0.4 },
  navBtnText: { fontSize: 14, fontWeight: '600', color: COLORS.onSurface },
  navBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  navBtnPrimaryDisabled: { opacity: 0.4 },
  navBtnPrimaryText: { fontSize: 14, fontWeight: '700', color: COLORS.onPrimary },

  exitBtn: { padding: 8 },

  resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  resultCircle: { width: 140, height: 140, borderRadius: 70, borderWidth: 6, justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  resultPercent: { fontSize: 36, fontWeight: '900' },
  resultTitle: { fontSize: 22, fontWeight: '800', color: COLORS.onSurface, marginBottom: 8 },
  resultSubtitle: { fontSize: 16, color: COLORS.onSurfaceVariant, marginBottom: 32 },
  resultStats: { flexDirection: 'row', gap: 24, marginBottom: 40 },
  resultStat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  resultStatText: { fontSize: 14, color: COLORS.onSurfaceVariant },

  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: COLORS.onPrimary },
});
