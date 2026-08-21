import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface SystemMetrics {
  uptime: number;
  response_time: number;
  error_rate: number;
  active_users: number;
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  requests_per_minute: number;
}

export default function MonitoringScreen({ navigation }: any) {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadMetrics = useCallback(async () => {
    try {
      setMetrics({
        uptime: 99.95,
        response_time: 142,
        error_rate: 0.02,
        active_users: 342,
        cpu_usage: 45,
        memory_usage: 62,
        disk_usage: 38,
        requests_per_minute: 1250,
      });
    } catch (error) {
      console.error('[MonitoringScreen] Error loading metrics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMetrics(); }, [loadMetrics]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadMetrics();
    setRefreshing(false);
  }, [loadMetrics]);

  const getStatusColor = (value: number, thresholds: { warning: number; critical: number }) => {
    if (value >= thresholds.critical) return SEMANTIC_COLORS.error.main;
    if (value >= thresholds.warning) return SEMANTIC_COLORS.warning.main;
    return SEMANTIC_COLORS.success.main;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading system metrics...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.title}>System Monitoring</Text>
        <TouchableOpacity>
          <Ionicons name="refresh" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Card variant="elevated" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>System Health</Text>
          <View style={styles.healthGrid}>
            <View style={styles.healthItem}>
              <View style={[styles.healthDot, { backgroundColor: SEMANTIC_COLORS.success.main }]} />
              <Text style={styles.healthLabel}>Uptime</Text>
              <Text style={styles.healthValue}>{metrics?.uptime}%</Text>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthDot, { backgroundColor: getStatusColor(metrics?.response_time || 0, { warning: 200, critical: 500 }) }]} />
              <Text style={styles.healthLabel}>Response Time</Text>
              <Text style={styles.healthValue}>{metrics?.response_time}ms</Text>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthDot, { backgroundColor: getStatusColor(metrics?.error_rate || 0, { warning: 1, critical: 5 }) }]} />
              <Text style={styles.healthLabel}>Error Rate</Text>
              <Text style={styles.healthValue}>{metrics?.error_rate}%</Text>
            </View>
            <View style={styles.healthItem}>
              <View style={[styles.healthDot, { backgroundColor: SEMANTIC_COLORS.info.main }]} />
              <Text style={styles.healthLabel}>Active Users</Text>
              <Text style={styles.healthValue}>{metrics?.active_users}</Text>
            </View>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Resource Usage</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricLabel}>CPU Usage</Text>
                <Text style={[styles.metricValue, { color: getStatusColor(metrics?.cpu_usage || 0, { warning: 70, critical: 90 }) }]}>
                  {metrics?.cpu_usage}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${metrics?.cpu_usage || 0}%`,
                      backgroundColor: getStatusColor(metrics?.cpu_usage || 0, { warning: 70, critical: 90 }),
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricLabel}>Memory Usage</Text>
                <Text style={[styles.metricValue, { color: getStatusColor(metrics?.memory_usage || 0, { warning: 70, critical: 90 }) }]}>
                  {metrics?.memory_usage}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${metrics?.memory_usage || 0}%`,
                      backgroundColor: getStatusColor(metrics?.memory_usage || 0, { warning: 70, critical: 90 }),
                    },
                  ]}
                />
              </View>
            </View>

            <View style={styles.metricItem}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricLabel}>Disk Usage</Text>
                <Text style={[styles.metricValue, { color: getStatusColor(metrics?.disk_usage || 0, { warning: 80, critical: 95 }) }]}>
                  {metrics?.disk_usage}%
                </Text>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${metrics?.disk_usage || 0}%`,
                      backgroundColor: getStatusColor(metrics?.disk_usage || 0, { warning: 80, critical: 95 }),
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Traffic</Text>
          <View style={styles.trafficGrid}>
            <View style={styles.trafficItem}>
              <Ionicons name="pulse" size={24} color={COLORS.primary} />
              <Text style={styles.trafficValue}>{metrics?.requests_per_minute.toLocaleString()}</Text>
              <Text style={styles.trafficLabel}>Requests/min</Text>
            </View>
            <View style={styles.trafficItem}>
              <Ionicons name="people" size={24} color={SEMANTIC_COLORS.info.main} />
              <Text style={styles.trafficValue}>{metrics?.active_users}</Text>
              <Text style={styles.trafficLabel}>Active Users</Text>
            </View>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <View style={styles.alertList}>
            <View style={styles.alertItem}>
              <View style={[styles.alertDot, { backgroundColor: SEMANTIC_COLORS.warning.main }]} />
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>High Memory Usage</Text>
                <Text style={styles.alertTime}>10 minutes ago</Text>
              </View>
            </View>
            <View style={styles.alertItem}>
              <View style={[styles.alertDot, { backgroundColor: SEMANTIC_COLORS.success.main }]} />
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>System Recovered</Text>
                <Text style={styles.alertTime}>1 hour ago</Text>
              </View>
            </View>
            <View style={styles.alertItem}>
              <View style={[styles.alertDot, { backgroundColor: SEMANTIC_COLORS.error.main }]} />
              <View style={styles.alertInfo}>
                <Text style={styles.alertTitle}>Database Connection Timeout</Text>
                <Text style={styles.alertTime}>3 hours ago</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceVariant,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
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
  sectionCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginBottom: SPACING.lg,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  healthItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  healthDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  healthLabel: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  healthValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  metricsGrid: {
    gap: SPACING.lg,
  },
  metricItem: {
    gap: SPACING.xs,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  metricValue: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.bold,
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
  trafficGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trafficItem: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  trafficValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  trafficLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  alertList: {
    gap: SPACING.md,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.md,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.onSurface,
  },
  alertTime: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
});
