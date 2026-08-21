import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge, Button } from '../../../components/ui';

interface Leave {
  id: string;
  employee_name: string;
  leave_type: string;
  start_date: string;
  end_date: string;
  days: number;
  status: string;
  reason: string;
  approved_by: string;
}

export default function LeaveListScreen({ navigation }: any) {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const loadLeaves = useCallback(async () => {
    try {
      // Replace with actual API call
      // const data = await api.getLeaves();
      // setLeaves(data);
      setLeaves([]);
    } catch (error) {
      console.error('[LeaveListScreen] Error loading leaves:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadLeaves(); }, [loadLeaves]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadLeaves();
    setRefreshing(false);
  }, [loadLeaves]);

  const filteredLeaves = activeFilter === 'ALL' 
    ? leaves 
    : leaves.filter((leave) => leave.status === activeFilter);

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

  const renderLeaveItem = ({ item }: { item: Leave }) => (
    <TouchableOpacity
      style={styles.leaveCard}
      onPress={() => navigation.navigate('LeaveDetail', { leaveId: item.id })}
    >
      <Card variant="default" padding="md">
        <View style={styles.leaveHeader}>
          <View style={[styles.leaveTypeIcon, { backgroundColor: COLORS.primaryContainer }]}>
            <Ionicons name={getLeaveTypeIcon(item.leave_type) as any} size={FONT_SIZES.lg} color={COLORS.primary} />
          </View>
          <View style={styles.leaveInfo}>
            <Text style={styles.employeeName}>{item.employee_name}</Text>
            <Text style={styles.leaveType}>{item.leave_type.replace('_', ' ')}</Text>
          </View>
          <Badge
            label={item.status}
            variant={getStatusVariant(item.status)}
            size="sm"
          />
        </View>
        
        <View style={styles.leaveDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>
              {new Date(item.start_date).toLocaleDateString()} - {new Date(item.end_date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>{item.days} day(s)</Text>
          </View>
        </View>

        {item.status === 'PENDING' && (
          <View style={styles.leaveActions}>
            <Button
              title="Approve"
              variant="primary"
              size="sm"
              onPress={() => navigation.navigate('LeaveDetail', { leaveId: item.id, action: 'approve' })}
              iconLeft={<Ionicons name="checkmark" size={FONT_SIZES.sm} color={COLORS.white} />}
            />
            <Button
              title="Reject"
              variant="danger"
              size="sm"
              onPress={() => navigation.navigate('LeaveDetail', { leaveId: item.id, action: 'reject' })}
              iconLeft={<Ionicons name="close" size={FONT_SIZES.sm} color={COLORS.white} />}
            />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Leave Requests</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('LeaveForm')}
        >
          <Ionicons name="add" size={FONT_SIZES.lg} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterTab, activeFilter === filter && styles.filterTabActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading leave requests...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredLeaves}
          keyExtractor={(item) => item.id}
          renderItem={renderLeaveItem}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar" size={FONT_SIZES.xxxl} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No leave requests found</Text>
              <Button
                title="Request Leave"
                variant="primary"
                onPress={() => navigation.navigate('LeaveForm')}
                iconLeft={<Ionicons name="add" size={FONT_SIZES.md} color={COLORS.white} />}
              />
            </View>
          }
        />
      )}
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
    borderBottomColor: COLORS.outline,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  filterTab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.outline,
  },
  filterTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurface,
  },
  filterTextActive: {
    color: COLORS.white,
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
  listContent: {
    padding: SPACING.lg,
  },
  leaveCard: {
    marginBottom: SPACING.md,
  },
  leaveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leaveTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  leaveInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  leaveType: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  leaveDetails: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginLeft: SPACING.sm,
  },
  leaveActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: SPACING.xxxl,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
});