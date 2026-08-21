import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface EnterpriseStats {
  total_schools: number;
  active_schools: number;
  total_users: number;
  active_subscriptions: number;
  active_licenses: number;
  open_tickets: number;
  critical_alerts: number;
  uptime_percentage: number;
}

export default function EnterpriseDashboardScreen({ navigation }: any) {
  const [stats, setStats] = useState<EnterpriseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      setStats({
        total_schools: 24,
        active_schools: 22,
        total_users: 15600,
        active_subscriptions: 18,
        active_licenses: 156,
        open_tickets: 7,
        critical_alerts: 2,
        uptime_percentage: 99.9,
      });
    } catch (error) {
      console.error('[EnterpriseDashboardScreen] Error loading dashboard:', error);
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
    { icon: 'school', label: 'Schools', screen: 'SchoolList', color: COLORS.primary },
    { icon: 'card', label: 'Subscriptions', screen: 'SubscriptionList', color: COLORS.secondary },
    { icon: 'key', label: 'Licenses', screen: 'LicenseList', color: SEMANTIC_COLORS.warning.main },
    { icon: 'people', label: 'Users', screen: 'EnterpriseUserList', color: SEMANTIC_COLORS.success.main },
    { icon: 'chatbubbles', label: 'Tickets', screen: 'TicketList', color: SEMANTIC_COLORS.info.main },
    { icon: 'flag', label: 'Feature Flags', screen: 'FeatureFlagList', color: SEMANTIC_COLORS.error.main },
    { icon: 'pulse', label: 'Monitoring', screen: 'Monitoring', color: COLORS.primary },
    { icon: 'settings', label: 'Settings', screen: 'EnterpriseSettings', color: COLORS.onSurfaceVariant },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading enterprise dashboard...</Text>
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
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Enterprise Dashboard</Text>
            <Text style={styles.subtitle}>Platform Overview</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={FONT_SIZES.xxxl} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsGrid}>
          <Card variant="elevated" padding="md" style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: COLORS.primaryContainer }]}>
              <Ionicons name="school" size={FONT_SIZES.lg} color={COLORS.primary} />
            </View>
            <Text style={styles.statValue}>{stats?.total_schools || 0}</Text>
            <Text style={styles.statLabel}>Total Schools</Text>
          </Card>

          <Card variant="elevated" padding="md" style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: SEMANTIC_COLORS.success.surface }]}>
              <Ionicons name="checkmark-circle" size={FONT_SIZES.lg} color={SEMANTIC_COLORS.success.main} />
            </View>
            <Text style={styles.statValue}>{stats?.active_schools || 0}</Text>
            <Text style={styles.statLabel}>Active Schools</Text>
          </Card>

          <Card variant="elevated" padding="md" style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: SEMANTIC_COLORS.warning.surface }]}>
              <Ionicons name="people" size={FONT_SIZES.lg} color={SEMANTIC_COLORS.warning.main} />
            </View>
            <Text style={styles.statValue}>{(stats?.total_users || 0).toLocaleString()}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </Card>

          <Card variant="elevated" padding="md" style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: SEMANTIC_COLORS.error.surface }]}>
              <Ionicons name="chatbubbles" size={FONT_SIZES.lg} color={SEMANTIC_COLORS.error.main} />
            </View>
            <Text style={styles.statValue}>{stats?.open_tickets || 0}</Text>
            <Text style={styles.statLabel}>Open Tickets</Text>
          </Card>
        </View>

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

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Platform Health</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{stats?.uptime_percentage || 0}%</Text>
              <Text style={styles.metricLabel}>Uptime</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${stats?.uptime_percentage || 0}%`,
                      backgroundColor: SEMANTIC_COLORS.success.main,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{stats?.active_subscriptions || 0}</Text>
              <Text style={styles.metricLabel}>Active Subscriptions</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${((stats?.active_subscriptions || 0) / 30) * 100}%`,
                      backgroundColor: COLORS.primary,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricValue}>{stats?.active_licenses || 0}</Text>
              <Text style={styles.metricLabel}>Active Licenses</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${((stats?.active_licenses || 0) / 200) * 100}%`,
                      backgroundColor: SEMANTIC_COLORS.info.main,
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: SEMANTIC_COLORS.error.main }]} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>License Expiry Warning</Text>
                <Text style={styles.activityTime}>3 licenses expiring in 7 days</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: SEMANTIC_COLORS.warning.main }]} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>High Ticket Volume</Text>
                <Text style={styles.activityTime}>7 open tickets require attention</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={[styles.activityDot, { backgroundColor: COLORS.primary }]} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>New School Onboarded</Text>
                <Text style={styles.activityTime}>Lincoln Academy joined today</Text>
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
    width: '22%',
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
