import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useChild } from '../context/ChildContext';
import { useLanguage } from '../context/LanguageContext';
import { COLORS } from '../../constants/colors';
import {
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
} from '../../constants/theme';
import { api } from '../../services/api';
import ChildSelector from '../../components/ChildSelector';
import { BottomTabBar } from '../../components/BottomTabBar';
import { Card, Badge, EmptyState, SkeletonCard } from '../../components/ui';

interface DashboardData {
  attendance: { present: boolean; time?: string } | null;
  recentGrades: { subject: string; grade: number; max: number; date: string }[];
  average: number;
  pendingPayments: number;
  unreadMessages: number;
  upcomingEvents: { title: string; date: string }[];
  announcements: { title: string; date: string }[];
  nextAssignments: { subject: string; title: string; dueDate: string }[];
}

export default function ParentDashboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const { selectedChild, children, loading: childrenLoading } = useChild();
  const { t } = useLanguage();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = useCallback(async () => {
    if (!selectedChild) return;
    try {
      const result = await api.getParentDashboard(selectedChild.id);
      setData(result);
    } catch (err) {
      console.error('[ParentDashboard]', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedChild?.id]);

  useEffect(() => {
    setLoading(true);
    loadDashboard();
  }, [loadDashboard]);

  const onRefresh = () => {
    setRefreshing(true);
    loadDashboard();
  };

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return t('common.goodMorning');
    if (hour < 18) return t('common.goodAfternoon');
    return t('common.goodEvening');
  };

  if (childrenLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        >
          <SkeletonCard />
          <View style={{ height: SPACING.lg }} />
          <SkeletonCard />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (children.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyState
          icon={<Ionicons name="people-outline" size={40} color={COLORS.outlineVariant} />}
          title={t('parentDashboard.noChild')}
          subtitle={t('parentDashboard.noChildSubtitle')}
        />
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        >
          <SkeletonCard />
          <View style={{ height: SPACING.lg }} />
          <SkeletonCard />
          <View style={{ height: SPACING.xxxl }} />
        </ScrollView>
        <BottomTabBar
          activeTab="home"
          onTabPress={(tab) => {
            const routes: Record<string, string> = {
              home: 'ParentDashboard',
              learning: 'ParentGrades',
              payments: 'Payments',
              messages: 'Messages',
              profile: 'Profile',
            };
            navigation.navigate(routes[tab] || 'ParentDashboard');
          }}
        />
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
          <View style={styles.headerLeft}>
            {user?.photoUrl ? (
              <Image source={{ uri: user.photoUrl }} style={styles.parentAvatar} />
            ) : (
              <View style={styles.parentAvatarPlaceholder}>
                <Text style={styles.parentAvatarText}>{user?.name?.[0] || 'P'}</Text>
              </View>
            )}
            <View>
              <Text style={styles.greeting}>{getGreeting()},</Text>
              <Text style={styles.parentName}>{user?.name?.split(' ')[0] || 'Parent'}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={FONT_SIZES.lg} color={COLORS.onSurface} />
            {(data?.unreadMessages || 0) > 0 && <View style={styles.notifDot} />}
          </TouchableOpacity>
        </View>

        {/* Child Selector */}
        <ChildSelector />

        {/* Child Hero Card */}
        {selectedChild && (
          <Card variant="elevated" padding="lg" style={styles.heroCard}>
            <View style={styles.heroTop}>
              {selectedChild.photoUrl ? (
                <Image source={{ uri: selectedChild.photoUrl }} style={styles.childAvatar} />
              ) : (
                <View style={styles.childAvatarPlaceholder}>
                  <Text style={styles.childAvatarText}>{selectedChild.firstName?.[0] || '?'}</Text>
                </View>
              )}
              <View style={styles.heroInfo}>
                <Text style={styles.childName}>{selectedChild.fullName}</Text>
                <Text style={styles.childClass}>{selectedChild.className || t('parentDashboard.noClass')}</Text>
              </View>
            </View>
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>{data?.average?.toFixed(1) || '--'}</Text>
                <Text style={styles.heroStatLabel}>{t('grades.average')}</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                {data?.attendance?.present ? (
                  <Badge label={t('attendance_mark.present')} variant="success" dot size="sm" />
                ) : data?.attendance === null ? (
                  <Text style={styles.heroStatValue}>--</Text>
                ) : (
                  <Badge label={t('attendance_mark.absent')} variant="error" dot size="sm" />
                )}
                <Text style={styles.heroStatLabel}>{t('parentDashboard.today')}</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>{data?.pendingPayments || 0}</Text>
                <Text style={styles.heroStatLabel}>{t('parentDashboard.unpaid')}</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {[
            { icon: 'school-outline', label: t('grades.title'), screen: 'ParentGrades', color: '#4F46E5' },
            { icon: 'calendar-outline', label: t('studentSchedule.title'), screen: 'ParentSchedule', color: '#06B6D4' },
            { icon: 'time-outline', label: t('parentDashboard.attendance'), screen: 'ParentAttendance', color: '#10B981' },
            { icon: 'card-outline', label: t('payments.title'), screen: 'Payments', color: '#F59E0B' },
            { icon: 'chatbubbles-outline', label: t('messages.title'), screen: 'Messages', color: '#8B5CF6' },
            { icon: 'document-text-outline', label: t('home.documents'), screen: 'ParentDocuments', color: '#EF4444' },
          ].map((action, i) => (
            <TouchableOpacity
              key={i}
              style={styles.quickAction}
              onPress={() => navigation.navigate(action.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                <Ionicons name={action.icon as any} size={FONT_SIZES.lg} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Grades */}
        {data?.recentGrades && data.recentGrades.length > 0 && (
          <Card variant="default" padding="md" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('parentDashboard.recentGrades')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ParentGrades')}>
                <Text style={styles.seeAll}>{t('common.seeAll')}</Text>
              </TouchableOpacity>
            </View>
            {data.recentGrades.slice(0, 4).map((g, i) => (
              <View key={i} style={styles.gradeRow}>
                <View style={styles.gradeSubject}>
                  <Ionicons name="book-outline" size={FONT_SIZES.sm} color={COLORS.primary} />
                  <Text style={styles.gradeSubjectText}>{g.subject}</Text>
                </View>
                <View style={styles.gradeValue}>
                  <Text style={[styles.gradeNumber, { color: g.grade >= g.max / 2 ? COLORS.success : COLORS.error }]}>
                    {g.grade}/{g.max}
                  </Text>
                </View>
              </View>
            ))}
          </Card>
        )}

        {/* Next Assignments */}
        {data?.nextAssignments && data.nextAssignments.length > 0 && (
          <Card variant="default" padding="md" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('parentDashboard.upcomingAssignments')}</Text>
            </View>
            {data.nextAssignments.slice(0, 3).map((a, i) => (
              <View key={i} style={styles.assignmentRow}>
                <View style={styles.assignmentIcon}>
                  <Ionicons name="clipboard-outline" size={FONT_SIZES.sm} color="#8B5CF6" />
                </View>
                <View style={styles.assignmentInfo}>
                  <Text style={styles.assignmentTitle}>{a.title}</Text>
                  <Text style={styles.assignmentSubject}>{a.subject}</Text>
                </View>
                <Text style={styles.assignmentDate}>
                  {new Date(a.dueDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </Text>
              </View>
            ))}
          </Card>
        )}

        {/* Announcements */}
        {data?.announcements && data.announcements.length > 0 && (
          <Card variant="default" padding="md" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('home.announcements')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Announcements')}>
                <Text style={styles.seeAll}>{t('common.seeAll')}</Text>
              </TouchableOpacity>
            </View>
            {data.announcements.slice(0, 3).map((a, i) => (
              <View key={i} style={styles.announcementRow}>
                <Ionicons name="megaphone-outline" size={FONT_SIZES.sm} color={COLORS.primary} />
                <Text style={styles.announcementText} numberOfLines={1}>{a.title}</Text>
                <Text style={styles.announcementDate}>
                  {new Date(a.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                </Text>
              </View>
            ))}
          </Card>
        )}

        {/* Upcoming Events */}
        {data?.upcomingEvents && data.upcomingEvents.length > 0 && (
          <Card variant="default" padding="md" style={[styles.section, { marginBottom: 100 }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('parentDashboard.upcomingEvents')}</Text>
            </View>
            {data.upcomingEvents.slice(0, 3).map((e, i) => (
              <View key={i} style={styles.eventRow}>
                <View style={styles.eventDate}>
                  <Text style={styles.eventDay}>
                    {new Date(e.date).getDate()}
                  </Text>
                  <Text style={styles.eventMonth}>
                    {new Date(e.date).toLocaleDateString('fr-FR', { month: 'short' })}
                  </Text>
                </View>
                <Text style={styles.eventTitle}>{e.title}</Text>
              </View>
            ))}
          </Card>
        )}

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>

      <BottomTabBar
        activeTab="home"
        onTabPress={(tab) => {
          const routes: Record<string, string> = {
            home: 'ParentDashboard',
            learning: 'ParentGrades',
            payments: 'Payments',
            messages: 'Messages',
            profile: 'Profile',
          };
          navigation.navigate(routes[tab] || 'ParentDashboard');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  parentAvatar: { width: 44, height: 44, borderRadius: 22 },
  parentAvatarPlaceholder: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center',
  },
  parentAvatarText: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary },
  greeting: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant },
  parentName: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  notifBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.surfaceContainerLow, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  notifDot: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.error },
  heroCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.lg },
  childAvatar: { width: 48, height: 48, borderRadius: 24 },
  childAvatarPlaceholder: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center',
  },
  childAvatarText: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary },
  heroInfo: { flex: 1 },
  childName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  childClass: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },
  heroStats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  heroStat: { alignItems: 'center', gap: SPACING.xs },
  heroStatValue: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  heroStatLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  heroStatDivider: { width: 1, height: 32, backgroundColor: COLORS.outlineVariant },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  quickAction: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.md + 2,
    paddingHorizontal: SPACING.sm,
    ...SHADOWS.sm,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  quickActionLabel: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface, textAlign: 'center' },
  section: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  sectionTitle: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  seeAll: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.primary },
  gradeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.surfaceContainerLow },
  gradeSubject: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  gradeSubjectText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.medium, color: COLORS.onSurface },
  gradeValue: {},
  gradeNumber: { fontSize: FONT_SIZES.sm + 1, fontWeight: FONT_WEIGHTS.bold },
  assignmentRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm + 2, paddingVertical: SPACING.sm },
  assignmentIcon: { width: 32, height: 32, borderRadius: BORDER_RADIUS.md, backgroundColor: '#8B5CF615', justifyContent: 'center', alignItems: 'center' },
  assignmentInfo: { flex: 1 },
  assignmentTitle: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  assignmentSubject: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  assignmentDate: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant },
  announcementRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, paddingVertical: SPACING.sm },
  announcementText: { flex: 1, fontSize: FONT_SIZES.sm, color: COLORS.onSurface },
  announcementDate: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  eventRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, paddingVertical: SPACING.sm },
  eventDate: {
    width: 44, height: 44, borderRadius: BORDER_RADIUS.lg, backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center', alignItems: 'center',
  },
  eventDay: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.primary },
  eventMonth: { fontSize: FONT_SIZES.xs - 2, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.primary, textTransform: 'uppercase' },
  eventTitle: { flex: 1, fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.medium, color: COLORS.onSurface },
});
