import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge, Button } from '../../../components/ui';

interface Training {
  id: string;
  title: string;
  description: string;
  trainer: string;
  start_date: string;
  end_date: string;
  location: string;
  capacity: number;
  enrolled: number;
  status: string;
  type: string;
}

export default function TrainingListScreen({ navigation }: any) {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const loadTrainings = useCallback(async () => {
    try {
      // Replace with actual API call
      // const data = await api.getTrainings();
      // setTrainings(data);
      setTrainings([]);
    } catch (error) {
      console.error('[TrainingListScreen] Error loading trainings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTrainings(); }, [loadTrainings]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadTrainings();
    setRefreshing(false);
  }, [loadTrainings]);

  const filteredTrainings = activeFilter === 'ALL'
    ? trainings
    : trainings.filter((training) => training.status === activeFilter);

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
    switch (status) {
      case 'COMPLETED': return 'success';
      case 'IN_PROGRESS': return 'warning';
      case 'UPCOMING': return 'info';
      case 'CANCELLED': return 'error';
      default: return 'neutral';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'WORKSHOP': return 'people';
      case 'SEMINAR': return 'school';
      case 'ONLINE': return 'laptop';
      case 'CERTIFICATION': return 'ribbon';
      default: return 'train';
    }
  };

  const renderTrainingItem = ({ item }: { item: Training }) => (
    <TouchableOpacity
      style={styles.trainingCard}
      onPress={() => navigation.navigate('TrainingDetail', { trainingId: item.id })}
    >
      <Card variant="default" padding="lg">
        <View style={styles.trainingHeader}>
          <View style={[styles.typeIcon, { backgroundColor: COLORS.primaryContainer }]}>
            <Ionicons name={getTypeIcon(item.type) as any} size={FONT_SIZES.lg} color={COLORS.primary} />
          </View>
          <View style={styles.trainingInfo}>
            <Text style={styles.trainingTitle}>{item.title}</Text>
            <Text style={styles.trainingTrainer}>by {item.trainer}</Text>
          </View>
          <Badge
            label={item.status.replace('_', ' ')}
            variant={getStatusVariant(item.status)}
            size="sm"
          />
        </View>

        <Text style={styles.trainingDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.trainingDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>
              {new Date(item.start_date).toLocaleDateString()} - {new Date(item.end_date).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>{item.enrolled}/{item.capacity} enrolled</Text>
          </View>
        </View>

        {item.status === 'UPCOMING' && item.enrolled < item.capacity && (
          <Button
            title="Enroll"
            variant="primary"
            size="sm"
            onPress={() => navigation.navigate('TrainingDetail', { trainingId: item.id, action: 'enroll' })}
            iconLeft={<Ionicons name="add-circle" size={FONT_SIZES.sm} color={COLORS.white} />}
          />
        )}
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Training Programs</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('TrainingForm')}
        >
          <Ionicons name="add" size={FONT_SIZES.lg} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['ALL', 'UPCOMING', 'IN_PROGRESS', 'COMPLETED'].map((filter) => (
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
          <Text style={styles.loadingText}>Loading trainings...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTrainings}
          keyExtractor={(item) => item.id}
          renderItem={renderTrainingItem}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="school" size={FONT_SIZES.xxxl} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No training programs found</Text>
              <Button
                title="Create Training"
                variant="primary"
                onPress={() => navigation.navigate('TrainingForm')}
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
  trainingCard: {
    marginBottom: SPACING.md,
  },
  trainingHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  typeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  trainingInfo: {
    flex: 1,
  },
  trainingTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  trainingTrainer: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  trainingDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.md,
    lineHeight: 18,
  },
  trainingDetails: {
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