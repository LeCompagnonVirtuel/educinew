import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { useChild } from '../context/ChildContext';
import { api } from '../../services/api';
import ChildSelector from '../../components/ChildSelector';

interface Grade {
  id: string;
  subject: string;
  grade: number;
  maxGrade: number;
  coefficient: number;
  date: string;
  type: string;
  comment?: string;
  teacherName?: string;
}

interface SubjectSummary {
  subject: string;
  average: number;
  grades: Grade[];
  coefficient: number;
}

export default function ParentGradesScreen({ navigation }: any) {
  const { selectedChild } = useChild();
  const [subjects, setSubjects] = useState<SubjectSummary[]>([]);
  const [generalAverage, setGeneralAverage] = useState(0);
  const [period, setPeriod] = useState('trimester1');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  const periods = [
    { key: 'trimester1', label: '1er Trim.' },
    { key: 'trimester2', label: '2e Trim.' },
    { key: 'trimester3', label: '3e Trim.' },
  ];

  const loadGrades = useCallback(async () => {
    if (!selectedChild) return;
    try {
      const data = await api.getChildGrades(selectedChild.id, period);
      setSubjects(data?.subjects || []);
      setGeneralAverage(data?.average || 0);
    } catch (err) {
      console.error('[ParentGrades]', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedChild?.id, period]);

  useEffect(() => {
    setLoading(true);
    loadGrades();
  }, [loadGrades]);

  const onRefresh = () => { setRefreshing(true); loadGrades(); };

  const getGradeColor = (grade: number, max: number) => {
    const ratio = grade / max;
    if (ratio >= 0.7) return COLORS.success;
    if (ratio >= 0.5) return COLORS.warning;
    return COLORS.error;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notes & Moyennes</Text>
        <View style={{ width: 24 }} />
      </View>

      <ChildSelector />

      {/* Period Tabs */}
      <View style={styles.periodTabs}>
        {periods.map((p) => (
          <TouchableOpacity
            key={p.key}
            style={[styles.periodTab, period === p.key && styles.periodTabActive]}
            onPress={() => setPeriod(p.key)}
          >
            <Text style={[styles.periodTabText, period === p.key && styles.periodTabTextActive]}>
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* General Average Card */}
          <View style={styles.averageCard}>
            <Text style={styles.averageLabel}>Moyenne Générale</Text>
            <Text style={[styles.averageValue, { color: getGradeColor(generalAverage, 20) }]}>
              {generalAverage > 0 ? generalAverage.toFixed(2) : '--'}/20
            </Text>
          </View>

          {/* Subjects */}
          {subjects.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="school-outline" size={40} color={COLORS.outlineVariant} />
              <Text style={styles.emptyText}>Aucune note pour cette période</Text>
            </View>
          ) : (
            subjects.map((s) => (
              <View key={s.subject} style={styles.subjectCard}>
                <TouchableOpacity
                  style={styles.subjectHeader}
                  onPress={() => setExpandedSubject(expandedSubject === s.subject ? null : s.subject)}
                >
                  <View style={styles.subjectLeft}>
                    <View style={styles.subjectIcon}>
                      <Ionicons name="book-outline" size={16} color={COLORS.primary} />
                    </View>
                    <View>
                      <Text style={styles.subjectName}>{s.subject}</Text>
                      <Text style={styles.subjectCoef}>Coef. {s.coefficient}</Text>
                    </View>
                  </View>
                  <View style={styles.subjectRight}>
                    <Text style={[styles.subjectAverage, { color: getGradeColor(s.average, 20) }]}>
                      {s.average.toFixed(1)}/20
                    </Text>
                    <Ionicons
                      name={expandedSubject === s.subject ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={COLORS.onSurfaceVariant}
                    />
                  </View>
                </TouchableOpacity>

                {expandedSubject === s.subject && (
                  <View style={styles.gradesDetails}>
                    {s.grades.map((g, i) => (
                      <View key={i} style={styles.gradeDetail}>
                        <View style={styles.gradeDetailLeft}>
                          <Text style={styles.gradeType}>{g.type}</Text>
                          <Text style={styles.gradeDate}>
                            {new Date(g.date).toLocaleDateString('fr-FR')}
                          </Text>
                          {g.comment && <Text style={styles.gradeComment}>{g.comment}</Text>}
                        </View>
                        <Text style={[styles.gradeDetailValue, { color: getGradeColor(g.grade, g.maxGrade) }]}>
                          {g.grade}/{g.maxGrade}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.onSurface },
  periodTabs: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 12, gap: 8 },
  periodTab: { flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: COLORS.surfaceContainerLow, alignItems: 'center' },
  periodTabActive: { backgroundColor: COLORS.primary },
  periodTabText: { fontSize: 13, fontWeight: '600', color: COLORS.onSurfaceVariant },
  periodTabTextActive: { color: COLORS.onPrimary },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  averageCard: {
    backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 20,
    alignItems: 'center', marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  averageLabel: { fontSize: 13, color: COLORS.onSurfaceVariant, marginBottom: 4 },
  averageValue: { fontSize: 28, fontWeight: '900' },
  emptyBox: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.onSurfaceVariant },
  subjectCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 14, marginBottom: 10, overflow: 'hidden' },
  subjectHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  subjectLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  subjectIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: withAlpha(COLORS.primary, 0.1), justifyContent: 'center', alignItems: 'center' },
  subjectName: { fontSize: 14, fontWeight: '600', color: COLORS.onSurface },
  subjectCoef: { fontSize: 11, color: COLORS.onSurfaceVariant },
  subjectRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  subjectAverage: { fontSize: 15, fontWeight: '700' },
  gradesDetails: { paddingHorizontal: 14, paddingBottom: 14, borderTopWidth: 1, borderTopColor: COLORS.surfaceContainerLow },
  gradeDetail: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  gradeDetailLeft: { flex: 1 },
  gradeType: { fontSize: 12, fontWeight: '600', color: COLORS.onSurface },
  gradeDate: { fontSize: 11, color: COLORS.onSurfaceVariant },
  gradeComment: { fontSize: 11, color: COLORS.onSurfaceVariant, fontStyle: 'italic', marginTop: 2 },
  gradeDetailValue: { fontSize: 14, fontWeight: '700' },
});
