import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { TeacherTabBar } from '../../components/TeacherTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useRealtimeNotifications, useRealtimeSubscription } from '../hooks/useRealtime';
import { api } from '../../services/api';
import { supabase } from '../../services/supabase';
import { Card, Badge, Button, EmptyState, SkeletonCard, SkeletonList } from '../../components/ui';

export default function TeacherDashboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { unreadCount } = useRealtimeNotifications();

  // Realtime: auto-refresh when attendance or grades change
  useRealtimeSubscription([
    { table: 'attendance', event: 'INSERT', onData: () => loadData() },
    { table: 'grades', event: 'INSERT', onData: () => loadData() },
    { table: 'attendance_events', event: 'INSERT', onData: () => loadData() },
  ]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [teacher, setTeacher] = useState<any>(null);
  const [todaySchedule, setTodaySchedule] = useState<any[]>([]);
  const [stats, setStats] = useState({ classCount: 0, studentCount: 0, pendingAssignments: 0 });
  const [checkinStatus, setCheckinStatus] = useState<'none' | 'present' | 'late'>('none');
  const [checkinTime, setCheckinTime] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => { loadData(); }, [user?.id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [user?.id]);

  async function loadData() {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data: teacherRow } = await supabase
        .from('teachers').select('id, first_name, last_name, matricule, school_id, subject_id, subject:subjects(name)')
        .eq('user_id', user.id).single();

      if (teacherRow) {
        setTeacher(teacherRow);
        const teacherId = teacherRow.id;
        const today = new Date().toISOString().split('T')[0];
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const todayName = dayNames[new Date().getDay()];

        const [scheduleData, classesData, checkinData, announcementsData, assignmentsData] = await Promise.all([
          supabase.from('timetable_slots')
            .select('*, subject:subjects(name), class:classes(name)')
            .eq('teacher_id', teacherId)
            .eq('day_of_week', todayName)
            .order('start_time'),
          api.getTeacherClasses(teacherId).catch(() => []),
          supabase.from('teacher_attendance').select('status, check_in_time').eq('teacher_id', teacherId).eq('date', today).maybeSingle(),
          supabase.from('announcements').select('id, title, created_at').order('created_at', { ascending: false }).limit(3),
          supabase.from('assignments').select('id', { count: 'exact', head: true }).eq('teacher_id', teacherId).is('graded_at', null),
        ]);

        setTodaySchedule((scheduleData.data || []).map((s: any) => ({
          id: s.id,
          startTime: s.start_time,
          endTime: s.end_time,
          subject: s.subject?.name || t('common.course'),
          className: s.class?.name || '',
          room: s.room,
        })));

        const classArr = Array.isArray(classesData) ? classesData : [];
        let studentTotal = 0;
        if (classArr.length > 0) {
          const { count } = await supabase.from('students').select('id', { count: 'exact', head: true })
            .in('class_id', classArr.map((c: any) => c.id));
          studentTotal = count || 0;
        }

        setStats({
          classCount: classArr.length,
          studentCount: studentTotal,
          pendingAssignments: assignmentsData.count || 0,
        });

        if (checkinData.data) {
          setCheckinStatus(checkinData.data.status === 'LATE' ? 'late' : 'present');
          setCheckinTime(checkinData.data.check_in_time
            ? new Date(checkinData.data.check_in_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
            : null);
        } else {
          setCheckinStatus('none');
          setCheckinTime(null);
        }

        setAnnouncements((announcementsData.data || []).map((a: any) => ({
          id: a.id, title: a.title, date: a.created_at,
        })));
      }
    } catch (err) {
      console.error('[TeacherDashboard]', err);
    } finally {
      setLoading(false);
    }
  }

  const getNextCourse = () => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return todaySchedule.find(s => s.startTime > currentTime) || todaySchedule.find(s => s.endTime > currentTime);
  };

  const quickActions = [
    { icon: 'finger-print-outline', label: t('attendance_mark.title'), color: withAlpha('#059669', 0.1), iconColor: '#059669', screen: 'TeacherCheckin' },
    { icon: 'checkmark-done-outline', label: t('teacherDashboard.attendance'), color: withAlpha(COLORS.primary, 0.1), iconColor: COLORS.primary, screen: 'TeacherAttendance' },
    { icon: 'create-outline', label: t('teacherDashboard.enterGrades'), color: withAlpha(COLORS.tertiary, 0.1), iconColor: COLORS.tertiary, screen: 'TeacherGrades' },
    { icon: 'document-text-outline', label: t('studentAssignments.title'), color: withAlpha(COLORS.secondary, 0.1), iconColor: COLORS.secondary, screen: 'TeacherAssignments' },
    { icon: 'calendar-outline', label: t('teacherDashboard.schedule'), color: withAlpha('#8B5CF6', 0.1), iconColor: '#8B5CF6', screen: 'TeacherSchedule' },
    { icon: 'sparkles-outline', label: t('ai.title'), color: withAlpha(COLORS.primary, 0.1), iconColor: COLORS.primary, screen: 'AI' },
  ];

  if (loading && !teacher) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={{ width: 48, height: 48, borderRadius: BORDER_RADIUS.xl, backgroundColor: COLORS.surfaceContainerHigh }} />
              <View>
                <View style={{ width: 80, height: FONT_SIZES.xs, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: BORDER_RADIUS.sm }} />
                <View style={{ width: 140, height: SPACING.xl, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: BORDER_RADIUS.sm, marginTop: SPACING.xs }} />
              </View>
            </View>
          </View>
          <SkeletonList count={3} />
          <View style={{ height: SPACING.lg }} />
          <SkeletonCard />
          <View style={{ height: SPACING.md }} />
          <SkeletonCard />
          <View style={{ height: 100 }} />
        </ScrollView>
        <TeacherTabBar activeTab="dashboard" onTabPress={(tab) => {
          const routes: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
          navigation.navigate(routes[tab] || 'TeacherDashboard');
        }} />
      </SafeAreaView>
    );
  }

  const nextCourse = getNextCourse();
  const teacherName = teacher ? `${teacher.first_name || ''} ${teacher.last_name || ''}`.trim() : (user?.name || t('common.teacher'));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{teacherName.split(' ').map(n => n[0]).join('').slice(0, 2)}</Text>
            </View>
            <View>
              <Text style={styles.welcome}>{t('common.goodMorning')},</Text>
              <Text style={styles.name}>{teacherName}</Text>
              {teacher?.matricule && <Text style={styles.teacherCode}>Code: {teacher.matricule}</Text>}
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={FONT_SIZES.xl} color={COLORS.onSurface} />
            {unreadCount > 0 && (
              <Badge label={unreadCount > 9 ? '9+' : `${unreadCount}`} variant="error" size="sm" style={styles.notifBadge} />
            )}
          </TouchableOpacity>
        </View>

        {/* Check-in Status Banner */}
        {checkinStatus === 'none' ? (
          <TouchableOpacity style={styles.checkinBanner} onPress={() => navigation.navigate('TeacherCheckin')}>
            <Ionicons name="alert-circle" size={FONT_SIZES.lg} color={COLORS.error} />
            <Text style={styles.checkinBannerText}>{t('teacherDashboard.checkinMissing')}</Text>
            <View style={styles.checkinBannerBtn}>
              <Text style={styles.checkinBannerBtnText}>{t('teacherDashboard.checkIn')}</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.checkinSuccess}>
            <Ionicons name="checkmark-circle" size={FONT_SIZES.lg} color={COLORS.success} />
            <Text style={styles.checkinSuccessText}>
              {checkinStatus === 'late' ? t('attendance_mark.late') : t('attendance_mark.present')} {checkinTime ? `depuis ${checkinTime}` : ''}
            </Text>
          </View>
        )}

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <Card variant="elevated" padding="lg" style={[styles.statCard, { backgroundColor: withAlpha(COLORS.primary, 0.08) }]}>
            <Ionicons name="school-outline" size={FONT_SIZES.lg} color={COLORS.primary} />
            <Text style={[styles.statValue, { color: COLORS.primary }]}>{stats.classCount}</Text>
            <Text style={styles.statLabel}>{t('teacherDashboard.classes')}</Text>
          </Card>
          <Card variant="elevated" padding="lg" style={[styles.statCard, { backgroundColor: withAlpha('#06B6D4', 0.08) }]}>
            <Ionicons name="people-outline" size={FONT_SIZES.lg} color="#06B6D4" />
            <Text style={[styles.statValue, { color: '#06B6D4' }]}>{stats.studentCount}</Text>
            <Text style={styles.statLabel}>{t('teacherDashboard.students')}</Text>
          </Card>
          <Card variant="elevated" padding="lg" style={[styles.statCard, { backgroundColor: withAlpha(COLORS.warning, 0.08) }]}>
            <Ionicons name="document-text-outline" size={FONT_SIZES.lg} color={COLORS.warning} />
            <Text style={[styles.statValue, { color: COLORS.warning }]}>{stats.pendingAssignments}</Text>
            <Text style={styles.statLabel}>{t('teacherDashboard.toGrade')}</Text>
          </Card>
        </View>

        {/* Next Course */}
        {nextCourse && (
          <Card variant="default" padding="md" onPress={() => navigation.navigate('TeacherSchedule')} style={styles.nextCourseCard}>
            <View style={styles.nextCourseIcon}>
              <Ionicons name="time-outline" size={FONT_SIZES.lg} color={COLORS.primary} />
            </View>
            <View style={styles.nextCourseInfo}>
              <Text style={styles.nextCourseLabel}>{t('home.nextCourse')}</Text>
              <Text style={styles.nextCourseName}>{nextCourse.subject} — {nextCourse.className}</Text>
            </View>
            <View style={styles.nextCourseTimeBlock}>
              <Text style={styles.nextCourseTime}>{nextCourse.startTime}</Text>
              {nextCourse.room && <Text style={styles.nextCourseRoom}>{nextCourse.room}</Text>}
            </View>
          </Card>
        )}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
        <View style={styles.grid}>
          {quickActions.map((action, i) => (
            <Card key={i} variant="glass" padding="sm" onPress={() => navigation.navigate(action.screen)} style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon as any} size={FONT_SIZES.xl} color={action.iconColor} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Card>
          ))}
        </View>

        {/* Today's Schedule */}
        {todaySchedule.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('teacherDashboard.schedule')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('TeacherSchedule')}>
                <Text style={styles.seeAll}>{t('common.seeAll')}</Text>
              </TouchableOpacity>
            </View>
            {todaySchedule.slice(0, 4).map((slot) => (
              <Card key={slot.id} variant="default" padding="md" style={styles.scheduleItem}>
                <View style={styles.scheduleTime}>
                  <Text style={styles.scheduleTimeText}>{slot.startTime}</Text>
                  <Text style={styles.scheduleTimeEnd}>{slot.endTime}</Text>
                </View>
                <View style={styles.scheduleBar} />
                <View style={styles.scheduleContent}>
                  <Text style={styles.scheduleSubject}>{slot.subject}</Text>
                  <Text style={styles.scheduleMeta}>{slot.className}{slot.room ? ` • ${slot.room}` : ''}</Text>
                </View>
              </Card>
            ))}
          </>
        )}

        {/* Announcements */}
        {announcements.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('home.announcements')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Announcements')}>
                <Text style={styles.seeAll}>{t('common.seeAll')}</Text>
              </TouchableOpacity>
            </View>
            {announcements.map((a) => (
              <Card key={a.id} variant="default" padding="md" onPress={() => navigation.navigate('Announcements')} style={styles.announcementCard}>
                <Ionicons name="megaphone-outline" size={FONT_SIZES.lg} color={COLORS.primary} />
                <Text style={styles.announcementText} numberOfLines={1}>{a.title}</Text>
                <Text style={styles.announcementDate}>{new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</Text>
              </Card>
            ))}
          </>
        )}

        {stats.classCount === 0 && stats.studentCount === 0 && !loading && (
          <EmptyState
            icon="school-outline"
            title={t('teacherDashboard.noClasses')}
            subtitle={t('teacherDashboard.noClassesSubtitle')}
          />
        )}

        <View style={{ height: 100 }} />
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: SPACING.sm + SPACING.xs },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  avatar: { width: 48, height: 48, borderRadius: BORDER_RADIUS.xl, backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary },
  welcome: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant },
  name: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  teacherCode: { fontSize: FONT_SIZES.xs, color: COLORS.primary, fontWeight: FONT_WEIGHTS.semibold, marginTop: 1 },
  notifBtn: { width: 44, height: 44, borderRadius: BORDER_RADIUS.lg, backgroundColor: COLORS.surfaceContainerLowest, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  notifBadge: { position: 'absolute', top: 6, right: 6 },

  checkinBanner: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm + SPACING.xs, marginHorizontal: SPACING.xl, marginBottom: SPACING.md, backgroundColor: withAlpha(COLORS.error, 0.08), borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: withAlpha(COLORS.error, 0.2) },
  checkinBannerText: { flex: 1, fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.error },
  checkinBannerBtn: { backgroundColor: COLORS.error, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md },
  checkinBannerBtnText: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.bold, color: '#fff' },
  checkinSuccess: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginHorizontal: SPACING.xl, marginBottom: SPACING.md, backgroundColor: withAlpha(COLORS.success, 0.08), borderRadius: BORDER_RADIUS.lg, padding: SPACING.md },
  checkinSuccessText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.success },

  statsRow: { flexDirection: 'row', gap: SPACING.sm + SPACING.xs, paddingHorizontal: SPACING.xl, marginBottom: SPACING.lg },
  statCard: { flex: 1, borderRadius: BORDER_RADIUS.lg, alignItems: 'center', gap: SPACING.xs },
  statValue: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.extrabold },
  statLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, fontWeight: FONT_WEIGHTS.semibold },

  nextCourseCard: { marginHorizontal: SPACING.xl, marginBottom: SPACING.lg, gap: SPACING.md, borderWidth: 1, borderColor: withAlpha(COLORS.primary, 0.15) },
  nextCourseIcon: { width: 36, height: 36, borderRadius: BORDER_RADIUS.sm + 2, backgroundColor: withAlpha(COLORS.primary, 0.1), justifyContent: 'center', alignItems: 'center' },
  nextCourseInfo: { flex: 1 },
  nextCourseLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, fontWeight: FONT_WEIGHTS.semibold },
  nextCourseName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface, marginTop: 2 },
  nextCourseTimeBlock: { alignItems: 'flex-end' },
  nextCourseTime: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary },
  nextCourseRoom: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.xl, marginTop: SPACING.sm, marginBottom: SPACING.sm + SPACING.xs },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface, paddingHorizontal: SPACING.xl, marginBottom: SPACING.sm + SPACING.xs },
  seeAll: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.primary },

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SPACING.lg, gap: SPACING.sm + SPACING.xs, marginBottom: SPACING.lg },
  actionCard: { width: '30%', alignItems: 'center', gap: SPACING.sm, ...SHADOWS.sm },
  actionIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.lg, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface, textAlign: 'center' },

  scheduleItem: { marginHorizontal: SPACING.xl, marginBottom: SPACING.sm, gap: SPACING.sm + SPACING.xs },
  scheduleTime: { width: 50, justifyContent: 'center' },
  scheduleTimeText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  scheduleTimeEnd: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  scheduleBar: { width: 3, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.primary },
  scheduleContent: { flex: 1, justifyContent: 'center' },
  scheduleSubject: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  scheduleMeta: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },

  announcementCard: { marginHorizontal: SPACING.xl, marginBottom: SPACING.sm, gap: SPACING.sm + SPACING.xs },
  announcementText: { flex: 1, fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  announcementDate: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
});
