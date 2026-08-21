import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { SUBJECT_ICONS } from '../../constants/grades';
import { api } from '../../services/api';
import { useLanguage } from '../context/LanguageContext';
import { Card, Badge, Button, EmptyState, SkeletonCard } from '../../components/ui';

const DAYS_KEYS = ['common.dayNames.1', 'common.dayNames.2', 'common.dayNames.3', 'common.dayNames.4', 'common.dayNames.5', 'common.dayNames.6'];

export default function CoursesScreen({ navigation }: any) {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDay();
    return today >= 1 && today <= 6 ? DAYS_KEYS[today - 1] : DAYS_KEYS[0];
  });

  const loadCourses = useCallback(async () => {
    try {
      const data = await api.getCourses();
      setCourses(data || []);
    } catch (error) {
      console.error('[Courses]', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadCourses(); }, [loadCourses]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadCourses();
  }, [loadCourses]);

  const dayCourses = courses
    .filter((c: any) => c.dayOfWeek === selectedDay)
    .sort((a: any, b: any) => (a.startTime || '').localeCompare(b.startTime || ''));

  const subjects = Array.from(new Set(courses.map((c: any) => c.subject))).filter(Boolean);

  const getSubjectColor = (subject: string) => {
    const colors = [COLORS.primary, COLORS.secondary, COLORS.success, COLORS.warning, '#8B5CF6', COLORS.error, '#EC4899'];
    let hash = 0;
    for (let i = 0; i < subject.length; i++) hash = subject.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  const isCurrentCourse = (course: any) => {
    const now = new Date();
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    if (dayNames[now.getDay()] !== selectedDay) return false;
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return course.startTime <= currentTime && course.endTime > currentTime;
  };

  const getDayLabel = (dayKey: string) => {
    const labels: Record<string, string> = {
      'common.dayNames.1': 'Lun',
      'common.dayNames.2': 'Mar',
      'common.dayNames.3': 'Mer',
      'common.dayNames.4': 'Jeu',
      'common.dayNames.5': 'Ven',
      'common.dayNames.6': 'Sam',
    };
    return labels[dayKey] || dayKey;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: 24 }} />
          <Text style={styles.headerTitle}>{t('courses.title')}</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        <View style={styles.header}>
          <Button
            title=""
            variant="ghost"
            size="sm"
            onPress={() => navigation.goBack()}
            iconLeft={<Ionicons name="arrow-back" size={FONT_SIZES.lg} color={COLORS.onSurface} />}
            style={styles.backBtn}
          />
          <Text style={styles.headerTitle}>{t('courses.title')}</Text>
          <View style={{ width: 24 }} />
        </View>

        <Card variant="default" padding="md" style={styles.statsSummary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{subjects.length}</Text>
            <Text style={styles.summaryLabel}>{t('courses.subjects')}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{dayCourses.length}</Text>
            <Text style={styles.summaryLabel}>{t('courses.today')}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{courses.length}</Text>
            <Text style={styles.summaryLabel}>{t('courses.totalWeek')}</Text>
          </View>
        </Card>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabs} contentContainerStyle={styles.dayTabsContent}>
          {DAYS_KEYS.map((day) => (
            <Button
              key={day}
              title={getDayLabel(day)}
              variant={selectedDay === day ? 'primary' : 'ghost'}
              size="sm"
              onPress={() => setSelectedDay(day)}
              style={[styles.dayTab, selectedDay === day && styles.dayTabActive]}
            />
          ))}
        </ScrollView>

        {dayCourses.length === 0 ? (
          <EmptyState
            icon={<Ionicons name="book-outline" size={40} color={COLORS.outlineVariant} />}
            title={t('courses.noCoursesForDay')}
            subtitle={t('courses.noCoursesForDay')}
          />
        ) : (
          dayCourses.map((course: any) => {
            const color = getSubjectColor(course.subject);
            const isCurrent = isCurrentCourse(course);
            const icon = SUBJECT_ICONS[course.subject] || '📚';
            return (
              <Card
                key={course.id}
                variant="default"
                padding="md"
                style={[styles.courseCard, isCurrent && styles.courseCardCurrent]}
              >
                <View style={styles.courseTimeCol}>
                  <Text style={styles.courseStart}>{course.startTime}</Text>
                  <View style={[styles.courseTimeLine, { backgroundColor: color }]} />
                  <Text style={styles.courseEnd}>{course.endTime}</Text>
                </View>
                <View style={styles.courseContent}>
                  <View style={styles.courseHeader}>
                    <Text style={{ fontSize: FONT_SIZES.lg }}>{icon}</Text>
                    <Text style={styles.courseSubject}>{course.subject}</Text>
                    {isCurrent && (
                      <Badge
                        label={t('courses.ongoing')}
                        variant="success"
                        size="sm"
                        dot
                        pulse
                      />
                    )}
                  </View>
                  {course.teacherName ? (
                    <View style={styles.courseMeta}>
                      <Ionicons name="person-outline" size={12} color={COLORS.onSurfaceVariant} />
                      <Text style={styles.courseMetaText}>{course.teacherName}</Text>
                    </View>
                  ) : null}
                  {course.room ? (
                    <View style={styles.courseMeta}>
                      <Ionicons name="location-outline" size={12} color={COLORS.onSurfaceVariant} />
                      <Text style={styles.courseMetaText}>{t('courses.room')} {course.room}</Text>
                    </View>
                  ) : null}
                </View>
              </Card>
            );
          })
        )}

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  headerTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  backBtn: { width: 40, height: 40 },

  statsSummary: { marginHorizontal: SPACING.lg, marginBottom: SPACING.lg },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryValue: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.primary },
  summaryLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },

  dayTabs: { maxHeight: 50, marginBottom: SPACING.lg },
  dayTabsContent: { paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  dayTab: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm },
  dayTabActive: {},

  loadingContainer: { paddingHorizontal: SPACING.lg, gap: SPACING.md },

  courseCard: { marginHorizontal: SPACING.lg, marginBottom: SPACING.md },
  courseCardCurrent: { borderWidth: 1, borderColor: withAlpha(COLORS.primary, 0.3) },
  courseTimeCol: { width: 56, alignItems: 'center', paddingVertical: 14, justifyContent: 'space-between' },
  courseStart: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  courseEnd: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  courseTimeLine: { width: 2, flex: 1, marginVertical: SPACING.xs, borderRadius: BORDER_RADIUS.sm },
  courseContent: { flex: 1, padding: 14 },
  courseHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  courseSubject: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface, flex: 1 },
  courseMeta: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs, marginTop: SPACING.sm },
  courseMetaText: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant },
});
