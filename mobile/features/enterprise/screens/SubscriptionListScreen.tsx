import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface Subscription {
  id: string;
  school_name: string;
  plan: 'Basic' | 'Premium' | 'Enterprise';
  status: 'active' | 'expired' | 'cancelled';
  start_date: string;
  end_date: string;
  monthly_price: number;
  user_count: number;
}

export default function SubscriptionListScreen({ navigation }: any) {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubscriptions = useCallback(async () => {
    try {
      setSubscriptions([
        { id: '1', school_name: 'Lincoln Academy', plan: 'Enterprise', status: 'active', start_date: '2026-01-01', end_date: '2027-01-01', monthly_price: 2500, user_count: 450 },
        { id: '2', school_name: 'Washington High', plan: 'Premium', status: 'active', start_date: '2026-03-15', end_date: '2027-03-15', monthly_price: 1500, user_count: 320 },
        { id: '3', school_name: 'Jefferson Middle', plan: 'Basic', status: 'pending', start_date: '2026-06-01', end_date: '2027-06-01', monthly_price: 500, user_count: 180 },
        { id: '4', school_name: 'Roosevelt Elementary', plan: 'Enterprise', status: 'active', start_date: '2025-12-01', end_date: '2026-12-01', monthly_price: 2200, user_count: 210 },
        { id: '5', school_name: 'Adams Preparatory', plan: 'Premium', status: 'expired', start_date: '2025-06-01', end_date: '2026-06-01', monthly_price: 1200, user_count: 150 },
      ]);
    } catch (error) {
      console.error('[SubscriptionListScreen] Error loading subscriptions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadSubscriptions(); }, [loadSubscriptions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return SEMANTIC_COLORS.success.main;
      case 'expired': return SEMANTIC_COLORS.error.main;
      case 'pending': return SEMANTIC_COLORS.warning.main;
      case 'cancelled': return COLORS.onSurfaceVariant;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return COLORS.primary;
      case 'Premium': return SEMANTIC_COLORS.info.main;
      case 'Basic': return COLORS.onSurfaceVariant;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const renderSubscription = ({ item }: { item: Subscription }) => (
    <Card variant="elevated" padding="md" style={styles.subscriptionCard}>
      <View style={styles.subscriptionHeader}>
        <View style={styles.subscriptionInfo}>
          <Text style={styles.schoolName}>{item.school_name}</Text>
          <Badge variant="dot" color={getPlanColor(item.plan)}>
            {item.plan}
          </Badge>
        </View>
        <Badge variant="dot" color={getStatusColor(item.status)}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      </View>

      <View style={styles.detailsGrid}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Start Date</Text>
          <Text style={styles.detailValue}>{item.start_date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>End Date</Text>
          <Text style={styles.detailValue}>{item.end_date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Monthly Price</Text>
          <Text style={styles.detailValue}>${item.monthly_price.toLocaleString()}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Users</Text>
          <Text style={styles.detailValue}>{item.user_count}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={18} color={COLORS.primary} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="receipt-outline" size={18} color={COLORS.onSurfaceVariant} />
          <Text style={styles.actionText}>Invoice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chevron-forward" size={18} color={COLORS.onSurfaceVariant} />
          <Text style={styles.actionText}>Details</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.title}>Subscriptions</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading subscriptions...</Text>
        </View>
      ) : (
        <FlatList
          data={subscriptions}
          renderItem={renderSubscription}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="card-outline" size={48} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No subscriptions found</Text>
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
    borderBottomColor: COLORS.surfaceVariant,
  },
  title: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  listContent: {
    padding: SPACING.md,
  },
  subscriptionCard: {
    marginBottom: SPACING.md,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  subscriptionInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  detailItem: {
    width: '48%',
  },
  detailLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  detailValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.onSurface,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceVariant,
    paddingTop: SPACING.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.md,
  },
});
