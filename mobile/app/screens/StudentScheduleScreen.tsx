import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { api } from '../../services/api';
import { useLanguage } from '../context/LanguageContext';
import { Card, Badge, Button, EmptyState, SkeletonCard } from '../../components/ui';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../constants/theme';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default function StudentScheduleScreen({ navigation }: any) {
  const { t } = useLanguage();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDay();
    return today >= 1 && today <= 6 ? DAYS[today - 1] : DAYS[0];
  });

  useEffect(() => { loadSchedule(); }, []);

  async function loadSchedule() {
    try {
      const data = await api.getCourses();
      setCourses(data || []);
    } catch (error) {
      console.error('[Schedule]', error);
    } finally {
      setLoading(false);
    }
  }

  const dayCourses = useMemo(() => {
    return courses
      .filter((c: any) => c.dayOfWeek === selectedDay)
      .sort((a: any, b: any) => (a.startTime || '').localeCompare(b.startTime || ''));
  }, [courses, selectedDay]);

  const getSubjectColor = (subject: string) => {
    const colors = [COLORS.primaryContainer, '#06B6D4', COLORS.success, COLORS.warning, COLORS.secondary, COLORS.error, '#EC4899'];
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        <Text style={styles.headerTitle}>{t('studentSchedule.title')}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Day Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabs} contentContainerStyle={styles.dayTabsContent}>
        {DAYS.map((day) => (
          <Button
            key={day}
            title={day.slice(0, 3)}
            variant={selectedDay === day ? 'primary' : 'outline'}
            size="sm"
            onPress={() => setSelectedDay(day)}
            style={styles.dayTab}
          />
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingCenter}>
          <SkeletonCard />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {dayCourses.length === 0 ? (
            <EmptyState
              title={`${t('courses.noCoursesForDay')} ${selectedDay.toLowerCase()}`}
              icon={<Ionicons name="calendar-clear-outline" size={40} color={COLORS.outlineVariant} />}
            />
          ) : (
            dayCourses.map((course: any) => {
              const color = getSubjectColor(course.subject);
              const isCurrent = isCurrentCourse(course);
              return (
                <Card
                  key={course.id}
                  variant="default"
                  padding="md"
                  style={[styles.slotCard, isCurrent && styles.slotCardCurrent]}
                >
                  <View style={styles.slotRow}>
                    <View style={[styles.slotBar, { backgroundColor: color }]} />
                    <View style={styles.slotTime}>
                      <Text style={styles.slotStart}>{course.startTime}</Text>
                      <Text style={styles.slotEnd}>{course.endTime}</Text>
                    </View>
                    <View style={styles.slotInfo}>
                      <View style={styles.slotTitleRow}>
                        <Text style={styles.slotSubject}>{course.subject}</Text>
                        {isCurrent && (
                          <Badge label={t('courses.ongoing')} variant="success" size="sm" dot pulse />
                        )}
                      </View>
                      <View style={styles.slotMeta}>
                        <Ionicons name="person-outline" size={12} color={COLORS.onSurfaceVariant} />
                        <Text style={styles.slotTeacher}>{course.teacherName}</Text>
                      </View>
                      {course.room && (
                        <View style={styles.slotMeta}>
                          <Ionicons name="location-outline" size={12} color={COLORS.onSurfaceVariant} />
                          <Text style={styles.slotRoom}>{course.room}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </Card>
              );
            })
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md },
  headerTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  dayTabs: { maxHeight: 50, marginBottom: SPACING.md },
  dayTabsContent: { paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  dayTab: { minWidth: 60 },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: SPACING.lg, paddingBottom: 40 },
  slotCard: { marginBottom: SPACING.md - 2, overflow: 'hidden' },
  slotCardCurrent: { borderWidth: 1, borderColor: withAlpha(COLORS.primary, 0.3) },
  slotRow: { flexDirection: 'row', alignItems: 'stretch' },
  slotBar: { width: 4 },
  slotTime: { padding: SPACING.md, justifyContent: 'center', alignItems: 'center', width: 65 },
  slotStart: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  slotEnd: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
  slotInfo: { flex: 1, padding: SPACING.md, justifyContent: 'center' },
  slotTitleRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  slotSubject: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  slotMeta: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs, marginTop: SPACING.xs },
  slotTeacher: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  slotRoom: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
});
