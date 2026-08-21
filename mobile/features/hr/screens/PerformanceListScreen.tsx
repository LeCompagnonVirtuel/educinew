import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge, Button } from '../../../components/ui';

interface PerformanceReview {
  id: string;
  employee_name: string;
  employee_id: string;
  reviewer_name: string;
  review_period: string;
  overall_score: number;
  status: string;
  review_date: string;
  next_review_date: string;
}

export default function PerformanceListScreen({ navigation }: any) {
  const [reviews, setReviews] = useState<PerformanceReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const loadReviews = useCallback(async () => {
    try {
      // Replace with actual API call
      // const data = await api.getPerformanceReviews();
      // setReviews(data);
      setReviews([]);
    } catch (error) {
      console.error('[PerformanceListScreen] Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadReviews();
    setRefreshing(false);
  }, [loadReviews]);

  const filteredReviews = activeFilter === 'ALL'
    ? reviews
    : reviews.filter((review) => review.status === activeFilter);

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'warning';
      case 'PENDING': return 'info';
      case 'CANCELLED': return 'error';
      default: return 'neutral';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 4) return SEMANTIC_COLORS.success.main;
    if (score >= 3) return SEMANTIC_COLORS.warning.main;
    if (score >= 2) return COLORS.onSurfaceVariant;
    return SEMANTIC_COLORS.error.main;
  };

  const renderReviewItem = ({ item }: { item: PerformanceReview }) => (
    <TouchableOpacity
      style={styles.reviewCard}
      onPress={() => navigation.navigate('PerformanceDetail', { reviewId: item.id })}
    >
      <Card variant="default" padding="lg">
        <View style={styles.reviewHeader}>
          <View style={styles.employeeInfo}>
            <View style={styles.employeeAvatar}>
              <Text style={styles.avatarText}>
                {item.employee_name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View style={styles.employeeDetails}>
              <Text style={styles.employeeName}>{item.employee_name}</Text>
              <Text style={styles.reviewPeriod}>{item.review_period}</Text>
            </View>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={[styles.score, { color: getScoreColor(item.overall_score) }]}>
              {item.overall_score.toFixed(1)}
            </Text>
            <Text style={styles.scoreLabel}>/5.0</Text>
          </View>
        </View>

        <View style={styles.reviewDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="person" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>Reviewer: {item.reviewer_name}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>Review Date: {new Date(item.review_date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>Next Review: {new Date(item.next_review_date).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.reviewFooter}>
          <Badge
            label={item.status.replace('_', ' ')}
            variant={getStatusVariant(item.status)}
            size="sm"
          />
          {item.status === 'PENDING' && (
            <Button
              title="Start Review"
              variant="primary"
              size="sm"
              onPress={() => navigation.navigate('PerformanceDetail', { reviewId: item.id, action: 'start' })}
              iconLeft={<Ionicons name="play" size={FONT_SIZES.sm} color={COLORS.white} />}
            />
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Reviews</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('PerformanceForm')}
        >
          <Ionicons name="add" size={FONT_SIZES.lg} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterTab, activeFilter === filter && styles.filterTabActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
              {filter.replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading performance reviews...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredReviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReviewItem}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="trophy" size={FONT_SIZES.xxxl} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No performance reviews found</Text>
              <Button
                title="Create Review"
                variant="primary"
                onPress={() => navigation.navigate('PerformanceForm')}
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
  reviewCard: {
    marginBottom: SPACING.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  employeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  employeeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  avatarText: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  employeeDetails: {
    flex: 1,
  },
  employeeName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  reviewPeriod: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  score: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
  },
  scoreLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.onSurfaceVariant,
  },
  reviewDetails: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline,
    gap: SPACING.xs,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginLeft: SPACING.sm,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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