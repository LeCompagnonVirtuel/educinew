import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, ANIMATION } from '../../constants/theme';
import { Card, Badge, Button, EmptyState, SkeletonCard, SkeletonList } from '../../components/ui';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useRealtimeNotifications, useRealtimeSubscription } from '../hooks/useRealtime';
import { api } from '../../services/api';

function AnimatedStatValue({ value, style }: { value: string; style?: any }) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: ANIMATION.normal,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: ANIMATION.normal,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [value]);

  return (
    <Animated.Text
      style={[
        style,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      {value}
    </Animated.Text>
  );
}

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { unreadCount } = useRealtimeNotifications();

  // Realtime: auto-refresh when attendance or grades change
  useRealtimeSubscription([
    { table: 'attendance', event: 'INSERT', onData: () => loadData() },
    { table: 'grades', event: 'INSERT', onData: () => loadData() },
    { table: 'attendance_events', event: 'INSERT', onData: () => loadData() },
  ]);

  const [stats, setStats] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [nextCourse, setNextCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

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
      const [dashboardData, tasksData, coursesData] = await Promise.all([
        api.getDashboardStats(user.id).catch(() => null),
        api.getUserTasks(user.id).catch(() => []),
        api.getCourses().catch(() => []),
      ]);

      if (dashboardData) {
        setStats({
          average: dashboardData.average || 0,
          rank: dashboardData.rank || 0,
          attendance: dashboardData.attendance || 0,
          progress: dashboardData.progress || 0,
        });
      } else {
        setStats({ average: 0, rank: 0, attendance: 0, progress: 0 });
      }

      setTasks(tasksData || []);

      if (coursesData && coursesData.length > 0) {
        const now = new Date();
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = dayNames[now.getDay()];
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const todayCourses = coursesData
          .filter((c: any) => c.dayOfWeek === today)
          .sort((a: any, b: any) => (a.startTime || '').localeCompare(b.startTime || ''));
        const next = todayCourses.find((c: any) => c.startTime > currentTime) || todayCourses.find((c: any) => c.endTime > currentTime);
        setNextCourse(next || null);
      }
    } catch {
      setStats({ average: 0, rank: 0, attendance: 0, progress: 0 });
    } finally {
      setLoading(false);
    }
  }

  const quickActions = [
    { icon: 'school-outline', label: t('grades.title'), color: withAlpha(COLORS.primary, 0.1), iconColor: COLORS.primary, screen: 'Learning' },
    { icon: 'calendar-outline', label: t('studentSchedule.title'), color: withAlpha('#06B6D4', 0.1), iconColor: '#06B6D4', screen: 'StudentSchedule' },
    { icon: 'qr-code-outline', label: t('qrBadge.title'), color: withAlpha('#8B5CF6', 0.1), iconColor: '#8B5CF6', screen: 'QRBadge' },
    { icon: 'document-text-outline', label: t('studentAssignments.title'), color: withAlpha(COLORS.warning, 0.1), iconColor: COLORS.warning, screen: 'StudentAssignments' },
    { icon: 'chatbubble-outline', label: t('messages.title'), color: withAlpha(COLORS.secondary, 0.1), iconColor: COLORS.secondary, screen: 'Messages' },
    { icon: 'sparkles-outline', label: t('ai.title'), color: withAlpha(COLORS.primary, 0.1), iconColor: COLORS.primary, screen: 'AI' },
  ];

  if (loading && !stats) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        >
          <View style={styles.header}>
            <View>
              <View style={{ width: 120, height: 14, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: BORDER_RADIUS.sm }} />
              <View style={{ width: 180, height: 24, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: BORDER_RADIUS.sm, marginTop: SPACING.xs }} />
            </View>
          </View>
          <SkeletonCard />
          <View style={{ height: SPACING.lg }} />
          <SkeletonCard />
          <View style={{ height: SPACING.xl }} />
          <SkeletonList count={4} />
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>{t('home.welcome')},</Text>
            <Text style={styles.name}>{user?.name || t('home.student')}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.onSurface} />
            {unreadCount > 0 && (
              <Badge
                label={`${unreadCount > 99 ? '99+' : unreadCount}`}
                variant="error"
                size="sm"
                style={styles.notifBadge}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Hero Stats Card */}
        <Card variant="elevated" padding="lg" style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View style={styles.heroAverageBlock}>
              <AnimatedStatValue
                value={stats?.average > 0 ? stats.average.toFixed(1) : '—'}
                style={styles.heroAverageValue}
              />
              <Text style={styles.heroAverageLabel}>/20</Text>
            </View>
            <Text style={styles.heroAverageTitle}>{t('home.averageTitle')}</Text>
          </View>
          <View style={styles.heroStatsRow}>
            <View style={styles.heroStatItem}>
              <Ionicons name="trophy-outline" size={16} color="rgba(255,255,255,0.8)" />
              <AnimatedStatValue
                value={stats?.rank > 0 ? `${stats.rank}e` : '—'}
                style={styles.heroStatValue}
              />
              <Text style={styles.heroStatLabel}>{t('home.rank')}</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Ionicons name="checkmark-circle-outline" size={16} color="rgba(255,255,255,0.8)" />
              <AnimatedStatValue
                value={stats?.attendance > 0 ? `${stats.attendance}%` : '—'}
                style={styles.heroStatValue}
              />
              <Text style={styles.heroStatLabel}>{t('home.attendance')}</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Ionicons name="trending-up-outline" size={16} color="rgba(255,255,255,0.8)" />
              <AnimatedStatValue
                value={stats?.progress > 0 ? stats.progress.toFixed(0) : '—'}
                style={styles.heroStatValue}
              />
              <Text style={styles.heroStatLabel}>{t('home.progression')}</Text>
            </View>
          </View>
        </Card>

        {/* Next Course */}
        {nextCourse && (
          <Card variant="glass" padding="md" onPress={() => navigation.navigate('StudentSchedule')} style={styles.nextCourseCard}>
            <View style={styles.nextCourseContent}>
              <View style={styles.nextCourseIcon}>
                <Ionicons name="time-outline" size={18} color={COLORS.primary} />
              </View>
              <View style={styles.nextCourseInfo}>
                <Text style={styles.nextCourseLabel}>{t('home.nextCourse')}</Text>
                <Text style={styles.nextCourseName}>{nextCourse.subject}</Text>
              </View>
              <View style={styles.nextCourseTime}>
                <Text style={styles.nextCourseTimeText}>{nextCourse.startTime}</Text>
                {nextCourse.room && <Text style={styles.nextCourseRoom}>{nextCourse.room}</Text>}
              </View>
            </View>
          </Card>
        )}

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
        <View style={styles.grid}>
          {quickActions.map((action, i) => (
            <Card key={i} variant="glass" padding="sm" onPress={() => navigation.navigate(action.screen)} style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon as any} size={22} color={action.iconColor} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Card>
          ))}
        </View>

        {/* Tasks / Upcoming */}
        {tasks.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>{t('home.tasks')}</Text>
            {tasks.map((task, i) => (
              <Card key={i} variant="default" padding="md" onPress={() => navigation.navigate(task.screen || 'StudentAssignments')} style={styles.taskCard}>
                <View style={styles.taskContent}>
                  <View style={[styles.taskDot, task.urgent && { backgroundColor: COLORS.error }]} />
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskName}>{task.subject}</Text>
                    <Text style={styles.taskDue}>{task.due}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.outlineVariant} />
                </View>
              </Card>
            ))}
          </>
        )}

        {/* Empty state for tasks */}
        {tasks.length === 0 && !loading && (
          <EmptyState
            icon={<Text style={{ fontSize: 40 }}>📋</Text>}
            title={t('home.noTask')}
            subtitle={t('home.noTaskSubtitle')}
          />
        )}

        {/* More Actions */}
        <View style={styles.moreActionsRow}>
          <TouchableOpacity style={styles.moreActionBtn} onPress={() => navigation.navigate('AttendanceHistory')}>
            <Ionicons name="finger-print-outline" size={18} color={COLORS.success} />
            <Text style={styles.moreActionLabel}>{t('home.attendanceHistory')}</Text>
            <Badge label={t('home.present')} variant="success" dot size="sm" style={{ marginTop: SPACING.xs }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreActionBtn} onPress={() => navigation.navigate('Announcements')}>
            <Ionicons name="megaphone-outline" size={18} color={COLORS.warning} />
            <Text style={styles.moreActionLabel}>{t('home.announcements')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreActionBtn} onPress={() => navigation.navigate('StudentDocuments')}>
            <Ionicons name="folder-outline" size={18} color={COLORS.tertiary} />
            <Text style={styles.moreActionLabel}>{t('home.documents')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreActionBtn} onPress={() => navigation.navigate('Payments')}>
            <Ionicons name="card-outline" size={18} color={COLORS.secondary} />
            <Text style={styles.moreActionLabel}>{t('home.payments')}</Text>
          </TouchableOpacity>
        </View>

        {/* Empty state for announcements */}
        {announcements.length === 0 && !loading && (
          <EmptyState
            title={t('home.noAnnouncement')}
            subtitle={t('home.noAnnouncementSubtitle')}
          />
        )}

        {/* Recent Messages */}
        {recentMessages.length > 0 ? (
          <>
            <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>{t('home.recentMessages')}</Text>
            {recentMessages.slice(0, 3).map((msg: any, i: number) => (
              <Card key={i} variant="default" padding="md" onPress={() => navigation.navigate('Messages')} style={styles.messageCard}>
                <View style={styles.messageContent}>
                  <View style={styles.messageInfo}>
                    <Text style={styles.messageSender}>{msg.sender || t('home.unknown')}</Text>
                    <Text style={styles.messagePreview} numberOfLines={1}>{msg.text || msg.content || ''}</Text>
                  </View>
                  {!msg.read && <Badge label={t('home.newBadge')} variant="info" dot size="sm" />}
                </View>
              </Card>
            ))}
          </>
        ) : (
          <EmptyState
            icon={<Text style={{ fontSize: 40 }}>📭</Text>}
            title={t('home.noMessage')}
            subtitle={t('home.noMessageSubtitle')}
          />
        )}

        {/* EduCI AI Banner */}
        <Card variant="elevated" padding="md" onPress={() => navigation.navigate('AI')} style={styles.aiBanner}>
          <View style={styles.aiBannerContent}>
            <View style={styles.aiBannerLeft}>
              <View style={styles.aiIcon}>
                <Ionicons name="sparkles" size={20} color={COLORS.onPrimary} />
              </View>
              <View>
                <Text style={styles.aiTitle}>{t('ai.title')}</Text>
                <Text style={styles.aiSub}>{t('home.aiAssistant')}</Text>
              </View>
            </View>
            <Ionicons name="arrow-forward" size={20} color={COLORS.onPrimary} />
          </View>
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomTabBar activeTab="home" onTabPress={(tab) => {
        const routes: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
        navigation.navigate(routes[tab] || 'Home');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: SPACING.md },
  welcome: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant },
  name: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface, marginTop: 2 },
  notifBtn: { position: 'relative', padding: SPACING.xs },
  notifBadge: { position: 'absolute', top: -SPACING.xs, right: -SPACING.xs },

  heroCard: { marginHorizontal: SPACING.xl, backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.xxl, marginBottom: SPACING.lg },
  heroTop: { alignItems: 'center', marginBottom: SPACING.lg },
  heroAverageBlock: { flexDirection: 'row', alignItems: 'baseline' },
  heroAverageValue: { fontSize: 44, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onPrimary },
  heroAverageLabel: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.semibold, color: 'rgba(255,255,255,0.7)', marginLeft: 2 },
  heroAverageTitle: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.8)', marginTop: SPACING.sm, fontWeight: FONT_WEIGHTS.semibold },
  heroStatsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: BORDER_RADIUS.lg, padding: SPACING.md },
  heroStatItem: { alignItems: 'center', gap: 4 },
  heroStatValue: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onPrimary },
  heroStatLabel: { fontSize: FONT_SIZES.xs, color: 'rgba(255,255,255,0.7)' },
  heroStatDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },

  nextCourseCard: { marginHorizontal: SPACING.xl, marginBottom: SPACING.lg, borderWidth: 1, borderColor: withAlpha(COLORS.primary, 0.15) },
  nextCourseContent: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  nextCourseIcon: { width: 36, height: 36, borderRadius: BORDER_RADIUS.lg, backgroundColor: withAlpha(COLORS.primary, 0.1), justifyContent: 'center', alignItems: 'center' },
  nextCourseInfo: { flex: 1 },
  nextCourseLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, fontWeight: FONT_WEIGHTS.semibold },
  nextCourseName: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface, marginTop: 2 },
  nextCourseTime: { alignItems: 'flex-end' },
  nextCourseTimeText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary },
  nextCourseRoom: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },

  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface, paddingHorizontal: SPACING.xl, marginBottom: SPACING.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: SPACING.lg, gap: SPACING.sm },
  actionCard: { width: '30%', alignItems: 'center', gap: SPACING.sm },
  actionIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.lg, justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface, textAlign: 'center' },

  taskCard: { marginHorizontal: SPACING.xl, marginBottom: SPACING.xs },
  taskContent: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  taskDot: { width: 8, height: 8, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.primary },
  taskInfo: { flex: 1 },
  taskName: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  taskDue: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },

  moreActionsRow: { flexDirection: 'row', marginHorizontal: SPACING.xl, marginTop: SPACING.xl, gap: SPACING.sm },
  moreActionBtn: { flex: 1, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: BORDER_RADIUS.md, paddingVertical: SPACING.md, alignItems: 'center', gap: SPACING.xs, ...SHADOWS.sm },
  moreActionLabel: { fontSize: 10, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant },

  messageCard: { marginHorizontal: SPACING.xl, marginBottom: SPACING.xs },
  messageContent: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  messageInfo: { flex: 1 },
  messageSender: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  messagePreview: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },

  aiBanner: { marginHorizontal: SPACING.xl, marginTop: SPACING.xl, backgroundColor: COLORS.primary },
  aiBannerContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  aiBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  aiIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.lg, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  aiTitle: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onPrimary },
  aiSub: { fontSize: FONT_SIZES.sm, color: 'rgba(255,255,255,0.8)' },
});
