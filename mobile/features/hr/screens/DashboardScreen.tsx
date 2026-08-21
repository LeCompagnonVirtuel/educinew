import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface DashboardStats {
  total_employees: number;
  active_employees: number;
  on_leave: number;
  pending_leaves: number;
  upcoming_trainings: number;
  pending_reviews: number;
  attendance_rate: number;
  turnover_rate: number;
}

export default function DashboardScreen({ navigation }: any) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      // Replace with actual API call
      // const data = await api.getHrDashboard();
      // setStats(data);
      setStats({
        total_employees: 150,
        active_employees: 142,
        on_leave: 8,
        pending_leaves: 12,
        upcoming_trainings: 5,
        pending_reviews: 8,
        attendance_rate: 94.5,
        turnover_rate: 3.2,
      });
    } catch (error) {
      console.error('[DashboardScreen] Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
  }, [loadDashboard]);

  const quickActions = [
    { icon: 'people', label: 'Employees', screen: 'EmployeeList', color: COLORS.primary },
    { icon: 'business', label: 'Departments', screen: 'DepartmentList', color: COLORS.secondary },
    { icon: 'calendar', label: 'Leave', screen: 'LeaveList', color: SEMANTIC_COLORS.warning.main },
    { icon: 'time', label: 'Attendance', screen: 'Attendance', color: SEMANTIC_COLORS.success.main },
    { icon: 'school', label: 'Training', screen: 'TrainingList', color: SEMANTIC_COLORS.info.main },
    { icon: 'trophy', label: 'Performance', screen: 'PerformanceList', color: SEMANTIC_COLORS.error.main },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading HR dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>HR Dashboard</Text>
            <Text style={styles.subtitle}>Human Resources Management</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={FONT_SIZES.xxxl} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsGrid}>
          <Card variant="elevated" padding="md" style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.primaryContainer }]}>
              <Ionicons name="people" size={FONT_SIZES.lg} color={COLORS.primary} />
            </View>
            <Text style={styles.statValue}>{stats?.total_employees || 0}</Text>
            <Text style={styles.statLabel}>Total Employees</Text>
          </Card>

          <Card variant="elevated" padding="md" style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: SEMANTIC_COLORS.success.surface }]}>
              <Ionicons name="checkmark-circle" size={FONT_SIZES.lg} color={SEMANTIC_COLORS.success.main} />
            </View>
            <Text style={styles.statValue}>{stats?.active_employees || 0}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </Card>

          <Card variant="elevated" padding="md" style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: SEMANTIC_COLORS.warning.surface }]}>
              <Ionicons name="calendar" size={FONT_SIZES.lg} color={SEMANTIC_COLORS.warning.main} />
            </View>
            <Text style={styles.statValue}>{stats?.on_leave || 0}</Text>
            <Text style={styles.statLabel}>On Leave</Text>
          </Card>

          <Card variant="elevated" padding="md" style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: SEMANTIC_COLORS.error.surface }]}>
              <Ionicons name="time" size={FONT_SIZES.lg} color={SEMANTIC_COLORS.error.main} />
            </View>
            <Text style={styles.statValue}>{stats?.pending_leaves || 0}</Text>
            <Text style={styles.statLabel}>Pending Leaves</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.screen}
                style={styles.actionItem}
                onPress={() => navigation.navigate(action.screen)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon as any} size={FONT_SIZES.xl} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {/* Performance Metrics */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Performance Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{stats?.attendance_rate || 0}%</Text>
              <Text style={styles.metricLabel}>Attendance Rate</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${stats?.attendance_rate || 0}%`,
                      backgroundColor: SEMANTIC_COLORS.success.main,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{stats?.turnover_rate || 0}%</Text>
              <Text style={styles.metricLabel}>Turnover Rate</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${stats?.turnover_rate || 0}%`,
                      backgroundColor: SEMANTIC_COLORS.error.main,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </Card>

        {/* Upcoming Activities */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Upcoming Activities</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: COLORS.primary }]} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Team Meeting</Text>
                <Text style={styles.activityTime}>Today, 2:00 PM</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: SEMANTIC_COLORS.warning.main }]} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>Performance Review Deadline</Text>
                <Text style={styles.activityTime}>Tomorrow</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: SEMANTIC_COLORS.success.main }]} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>New Employee Orientation</Text>
                <Text style={styles.activityTime}>Friday, 10:00 AM</Text>
              </View>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  greeting: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.xs,
  },
  profileButton: {
    padding: SPACING.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  statCard: {
    width: '48%',
    marginBottom: SPACING.sm,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  sectionCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginBottom: SPACING.lg,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  actionItem: {
    width: '30%',
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  actionLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurface,
    textAlign: 'center',
  },
  metricsGrid: {
    gap: SPACING.lg,
  },
  metricItem: {
    gap: SPACING.xs,
  },
  metricValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  metricLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  activityList: {
    gap: SPACING.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.onSurface,
  },
  activityTime: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
});