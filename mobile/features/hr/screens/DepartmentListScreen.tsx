import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  employee_count: number;
  budget: number;
  status: string;
}

export default function DepartmentListScreen({ navigation }: any) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDepartments = useCallback(async () => {
    try {
      // Replace with actual API call
      // const data = await api.getDepartments();
      // setDepartments(data);
      setDepartments([]);
    } catch (error) {
      console.error('[DepartmentListScreen] Error loading departments:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadDepartments(); }, [loadDepartments]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDepartments();
    setRefreshing(false);
  }, [loadDepartments]);

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'INACTIVE': return 'error';
      default: return 'neutral';
    }
  };

  const renderDepartmentItem = ({ item }: { item: Department }) => (
    <TouchableOpacity
      style={styles.departmentCard}
      onPress={() => navigation.navigate('DepartmentDetail', { departmentId: item.id })}
    >
      <Card variant="default" padding="lg">
        <View style={styles.departmentHeader}>
          <View style={styles.departmentIcon}>
            <Ionicons name="business" size={FONT_SIZES.xl} color={COLORS.primary} />
          </View>
          <View style={styles.departmentInfo}>
            <Text style={styles.departmentName}>{item.name}</Text>
            <Text style={styles.departmentDescription} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          <Badge
            label={item.status}
            variant={getStatusVariant(item.status)}
            size="sm"
          />
        </View>
        
        <View style={styles.departmentStats}>
          <View style={styles.statItem}>
            <Ionicons name="people" size={FONT_SIZES.sm} color={COLORS.primary} />
            <Text style={styles.statValue}>{item.employee_count}</Text>
            <Text style={styles.statLabel}>Employees</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="person" size={FONT_SIZES.sm} color={COLORS.primary} />
            <Text style={styles.statValue}>{item.manager || 'N/A'}</Text>
            <Text style={styles.statLabel}>Manager</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="cash" size={FONT_SIZES.sm} color={COLORS.primary} />
            <Text style={styles.statValue}>${item.budget.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Budget</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Departments</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('DepartmentForm')}
        >
          <Ionicons name="add" size={FONT_SIZES.lg} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading departments...</Text>
        </View>
      ) : (
        <FlatList
          data={departments}
          keyExtractor={(item) => item.id}
          renderItem={renderDepartmentItem}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="business" size={FONT_SIZES.xxxl} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No departments found</Text>
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
  departmentCard: {
    marginBottom: SPACING.md,
  },
  departmentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  departmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  departmentInfo: {
    flex: 1,
  },
  departmentName: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  departmentDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.xs,
    lineHeight: 18,
  },
  departmentStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginTop: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: SPACING.xxxl,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.md,
  },
});