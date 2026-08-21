import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface FeatureFlag {
  id: string;
  name: string;
  key: string;
  description: string;
  enabled: boolean;
  target_audience: 'all' | 'enterprise' | 'premium' | 'basic';
  created_at: string;
  last_updated: string;
}

export default function FeatureFlagListScreen({ navigation }: any) {
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFlags = useCallback(async () => {
    try {
      setFlags([
        { id: '1', name: 'Dark Mode', key: 'dark_mode', description: 'Enable dark mode theme for the application', enabled: true, target_audience: 'all', created_at: '2026-01-15', last_updated: '2026-06-20' },
        { id: '2', name: 'AI Grading', key: 'ai_grading', description: 'Use AI to automatically grade assignments', enabled: false, target_audience: 'enterprise', created_at: '2026-03-01', last_updated: '2026-07-10' },
        { id: '3', name: 'Video Lessons', key: 'video_lessons', description: 'Allow teachers to upload video lessons', enabled: true, target_audience: 'premium', created_at: '2026-02-10', last_updated: '2026-05-15' },
        { id: '4', name: 'Parent Portal', key: 'parent_portal', description: 'Allow parents to view student progress', enabled: true, target_audience: 'all', created_at: '2026-01-01', last_updated: '2026-04-20' },
        { id: '5', name: 'Advanced Analytics', key: 'advanced_analytics', description: 'Detailed analytics and reporting dashboard', enabled: false, target_audience: 'enterprise', created_at: '2026-04-05', last_updated: '2026-07-01' },
      ]);
    } catch (error) {
      console.error('[FeatureFlagListScreen] Error loading flags:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadFlags(); }, [loadFlags]);

  const toggleFlag = (id: string) => {
    setFlags(flags.map(flag => 
      flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
    ));
  };

  const getTargetColor = (target: string) => {
    switch (target) {
      case 'enterprise': return COLORS.primary;
      case 'premium': return SEMANTIC_COLORS.info.main;
      case 'basic': return COLORS.onSurfaceVariant;
      case 'all': return SEMANTIC_COLORS.success.main;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const renderFlag = ({ item }: { item: FeatureFlag }) => (
    <Card variant="elevated" padding="md" style={styles.flagCard}>
      <View style={styles.flagHeader}>
        <View style={styles.flagInfo}>
          <Text style={styles.flagName}>{item.name}</Text>
          <Text style={styles.flagKey}>{item.key}</Text>
        </View>
        <Switch
          value={item.enabled}
          onValueChange={() => toggleFlag(item.id)}
          trackColor={{ false: COLORS.surfaceVariant, true: COLORS.primaryContainer }}
          thumbColor={item.enabled ? COLORS.primary : COLORS.onSurfaceVariant}
        />
      </View>

      <Text style={styles.flagDescription}>{item.description}</Text>

      <View style={styles.flagMeta}>
        <Badge variant="outline" color={getTargetColor(item.target_audience)}>
          {item.target_audience.charAt(0).toUpperCase() + item.target_audience.slice(1)}
        </Badge>
        <Text style={styles.updateText}>Updated: {item.last_updated}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={18} color={COLORS.primary} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="analytics-outline" size={18} color={COLORS.onSurfaceVariant} />
          <Text style={styles.actionText}>Analytics</Text>
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
        <Text style={styles.title}>Feature Flags</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading feature flags...</Text>
        </View>
      ) : (
        <FlatList
          data={flags}
          renderItem={renderFlag}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="flag-outline" size={48} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No feature flags found</Text>
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
  flagCard: {
    marginBottom: SPACING.md,
  },
  flagHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  flagInfo: {
    flex: 1,
  },
  flagName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  flagKey: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  flagDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginBottom: SPACING.md,
    lineHeight: 18,
  },
  flagMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  updateText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.onSurfaceVariant,
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
