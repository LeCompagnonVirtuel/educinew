import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants/theme';
import { Card, Badge, Button, EmptyState, SkeletonList } from '../../components/ui';
import { TeacherTabBar } from '../../components/TeacherTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../../services/supabase';

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
  subject: string;
  className: string;
  room: string;
}

export default function TeacherScheduleScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [schedule, setSchedule] = useState<Record<string, Slot[]>>({});

  useEffect(() => {
    const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const todayName = dayNames[new Date().getDay()];
    setSelectedDay(DAYS.includes(todayName) ? todayName : 'Lundi');
    loadSchedule();
  }, [user?.id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSchedule();
    setRefreshing(false);
  }, [user?.id]);

  async function loadSchedule() {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data: teacher } = await supabase
        .from('teachers').select('id').eq('user_id', user.id).single();
      if (!teacher) { setLoading(false); return; }

      const { data: slots } = await supabase
        .from('timetable_slots')
        .select('id, day_of_week, start_time, end_time, room, subject:subjects(name), class:classes(name)')
        .eq('teacher_id', teacher.id)
        .order('start_time');

      const grouped: Record<string, Slot[]> = {};
      DAYS.forEach(d => { grouped[d] = []; });

      (slots || []).forEach((s: any) => {
        const day = s.day_of_week;
        if (grouped[day]) {
          grouped[day].push({
            id: s.id,
            startTime: s.start_time?.slice(0, 5) || '',
            endTime: s.end_time?.slice(0, 5) || '',
            subject: s.subject?.name || t('common.course'),
            className: s.class?.name || '',
            room: s.room || '',
          });
        }
      });

      setSchedule(grouped);
    } catch (err) {
      console.error('[TeacherSchedule]', err);
    } finally {
      setLoading(false);
    }
  }

  const daySlots = schedule[selectedDay] || [];
  const totalHours = daySlots.reduce((sum, s) => {
    const [sh, sm] = (s.startTime || '00:00').split(':').map(Number);
    const [eh, em] = (s.endTime || '00:00').split(':').map(Number);
    return sum + ((eh * 60 + em) - (sh * 60 + sm)) / 60;
  }, 0);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('studentSchedule.title')}</Text>
          <View style={{ width: 32 }} />
        </View>
        <SkeletonList count={5} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('studentSchedule.title')}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysRow}>
        {DAYS.map(day => {
          const isActive = day === selectedDay;
          const count = (schedule[day] || []).length;
          return (
            <Button
              key={day}
              title={day.slice(0, 3)}
              variant={isActive ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setSelectedDay(day)}
              iconRight={count > 0 ? <Badge label={`${count}`} variant="info" size="sm" style={styles.dayBadge} /> : undefined}
            />
          );
        })}
      </ScrollView>

      <View style={styles.summaryRow}>
        <Text style={styles.summaryText}>{daySlots.length} {t('common.course')}{daySlots.length > 1 ? 's' : ''}</Text>
        <Text style={styles.summaryDot}>•</Text>
        <Text style={styles.summaryText}>{totalHours.toFixed(1)}h</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        contentContainerStyle={styles.scrollContent}
      >
        {daySlots.length === 0 ? (
          <EmptyState
            icon={<Ionicons name="calendar-outline" size={32} color={COLORS.outlineVariant} />}
            title={t('courses.noCoursesForDay')}
            subtitle={`${t('teacherSchedule.noClassesForDay')} ${selectedDay}`}
          />
        ) : (
          daySlots.map((slot, i) => (
            <Card key={slot.id || i} variant="default" padding="md" style={styles.slotCard}>
              <View style={styles.slotTime}>
                <Text style={styles.slotTimeStart}>{slot.startTime}</Text>
                <View style={styles.slotTimeLine} />
                <Text style={styles.slotTimeEnd}>{slot.endTime}</Text>
              </View>
              <View style={styles.slotContent}>
                <Text style={styles.slotSubject}>{slot.subject}</Text>
                <View style={styles.slotMeta}>
                  <View style={styles.slotMetaItem}>
                    <Ionicons name="school-outline" size={12} color={COLORS.onSurfaceVariant} />
                    <Text style={styles.slotMetaText}>{slot.className}</Text>
                  </View>
                  {slot.room ? (
                    <View style={styles.slotMetaItem}>
                      <Ionicons name="location-outline" size={12} color={COLORS.onSurfaceVariant} />
                      <Text style={styles.slotMetaText}>{slot.room}</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      <TeacherTabBar activeTab="dashboard" onTabPress={(tab) => {
        const routes: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
        navigation.navigate(routes[tab] || 'TeacherDashboard');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm, paddingBottom: SPACING.md },
  backBtn: { padding: SPACING.xs },
  headerTitle: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  daysRow: { paddingHorizontal: SPACING.lg, gap: SPACING.sm, paddingBottom: SPACING.md },
  dayBadge: { marginLeft: SPACING.xs },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, paddingHorizontal: SPACING.lg, marginBottom: SPACING.md },
  summaryText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant },
  summaryDot: { color: COLORS.outlineVariant },
  scrollContent: { paddingBottom: SPACING.xxxl },
  slotCard: { marginHorizontal: SPACING.lg, marginBottom: SPACING.sm, flexDirection: 'row', gap: SPACING.md },
  slotTime: { width: 50, alignItems: 'center' },
  slotTimeStart: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary },
  slotTimeLine: { width: 2, flex: 1, backgroundColor: withAlpha(COLORS.primary, 0.2), borderRadius: 1, marginVertical: SPACING.xs },
  slotTimeEnd: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  slotContent: { flex: 1, justifyContent: 'center' },
  slotSubject: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  slotMeta: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.xs },
  slotMetaItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  slotMetaText: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
});
