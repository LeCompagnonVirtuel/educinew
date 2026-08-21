import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge, Button } from '../../../components/ui';

interface Leave {
  id: string;
  employee_name: string;
  employee_id: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days: number;
  status: string;
  reason: string;
  approved_by: string;
  approved_at: string;
  created_at: string;
}

export default function LeaveDetailScreen({ navigation, route }: any) {
  const { leaveId, action } = route.params;
  const [leave, setLeave] = useState<Leave | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const loadLeave = useCallback(async () => {
    try {
      // Replace with actual API call
      // const data = await api.getLeave(leaveId);
      // setLeave(data);
      setLeave(null);
    } catch (error) {
      console.error('[LeaveDetailScreen] Error loading leave:', error);
    } finally {
      setLoading(false);
    }
  }, [leaveId]);

  useEffect(() => { loadLeave(); }, [loadLeave]);

  useEffect(() => {
    if (action && leave) {
      handleAction(action as 'approve' | 'reject');
    }
  }, [action]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadLeave();
    setRefreshing(false);
  }, [loadLeave]);

  const handleAction = async (actionType: 'approve' | 'reject') => {
    Alert.alert(
      `${actionType === 'approve' ? 'Approve' : 'Reject'} Leave`,
      `Are you sure you want to ${actionType} this leave request?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: actionType === 'approve' ? 'Approve' : 'Reject',
          style: actionType === 'approve' ? 'default' : 'destructive',
          onPress: async () => {
            setActionLoading(true);
            try {
              // Replace with actual API call
              // await api.updateLeaveStatus(leaveId, actionType.toUpperCase());
              Alert.alert('Success', `Leave request ${actionType}d successfully`);
              loadLeave();
            } catch (error) {
              Alert.alert('Error', `Failed to ${actionType} leave request`);
            } finally {
              setActionLoading(false);
            }
          },
        },
      ]
    );
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
    switch (status) {
      case 'APPROVED': return 'success';
      case 'PENDING': return 'warning';
      case 'REJECTED': return 'error';
      case 'CANCELLED': return 'neutral';
      default: return 'info';
    }
  };

  const getLeaveTypeIcon = (type: string) => {
    switch (type) {
      case 'ANNUAL': return 'sunny';
      case 'SICK': return 'medical';
      case 'PERSONAL': return 'person';
      case 'MATERNITY': return 'heart';
      case 'PATERNITY': return 'man';
      default: return 'calendar';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading leave details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!leave) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={FONT_SIZES.xxxl} color={COLORS.error} />
          <Text style={styles.errorText}>Leave request not found</Text>
          <Button title="Go Back" variant="primary" onPress={() => navigation.goBack()} />
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={FONT_SIZES.lg} color={COLORS.onSurface} />
          </TouchableOpacity>
          <Text style={styles.title}>Leave Details</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Status Card */}
        <Card variant="elevated" padding="lg" style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={[styles.leaveTypeIcon, { backgroundColor: COLORS.primaryContainer }]}>
              <Ionicons name={getLeaveTypeIcon(leave.leave_type) as any} size={FONT_SIZES.xl} color={COLORS.primary} />
            </View>
            <View style={styles.statusInfo}>
              <Text style={styles.leaveType}>{leave.leave_type.replace('_', ' ')}</Text>
              <Badge
                label={leave.status}
                variant={getStatusVariant(leave.status)}
                size="lg"
              />
            </View>
          </View>
        </Card>

        {/* Employee Info */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Employee Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Employee:</Text>
            <Text style={styles.infoValue}>{leave.employee_name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="id-card" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>ID:</Text>
            <Text style={styles.infoValue}>{leave.employee_id}</Text>
          </View>
        </Card>

        {/* Leave Details */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Leave Details</Text>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Start Date:</Text>
            <Text style={styles.infoValue}>{new Date(leave.start_date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>End Date:</Text>
            <Text style={styles.infoValue}>{new Date(leave.end_date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Duration:</Text>
            <Text style={styles.infoValue}>{leave.days} day(s)</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="document-text" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Reason:</Text>
            <Text style={styles.infoValue}>{leave.reason}</Text>
          </View>
        </Card>

        {/* Approval Info */}
        {leave.approved_by && (
          <Card variant="default" padding="lg" style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Approval Information</Text>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={FONT_SIZES.md} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Approved By:</Text>
              <Text style={styles.infoValue}>{leave.approved_by}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={FONT_SIZES.md} color={COLORS.primary} />
              <Text style={styles.infoLabel}>Approved At:</Text>
              <Text style={styles.infoValue}>{new Date(leave.approved_at).toLocaleString()}</Text>
            </View>
          </Card>
        )}

        {/* Action Buttons */}
        {leave.status === 'PENDING' && (
          <View style={styles.actions}>
            <Button
              title="Approve Leave"
              variant="primary"
              fullWidth
              loading={actionLoading}
              onPress={() => handleAction('approve')}
              iconLeft={<Ionicons name="checkmark" size={FONT_SIZES.md} color={COLORS.white} />}
            />
            <Button
              title="Reject Leave"
              variant="danger"
              fullWidth
              loading={actionLoading}
              onPress={() => handleAction('reject')}
              iconLeft={<Ionicons name="close" size={FONT_SIZES.md} color={COLORS.white} />}
            />
          </View>
        )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.error,
    marginVertical: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  backButton: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  statusCard: {
    marginBottom: SPACING.lg,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaveTypeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  statusInfo: {
    flex: 1,
  },
  leaveType: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
    marginBottom: SPACING.sm,
  },
  sectionCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  infoLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginLeft: SPACING.sm,
    width: 100,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
    flex: 1,
  },
  actions: {
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
});