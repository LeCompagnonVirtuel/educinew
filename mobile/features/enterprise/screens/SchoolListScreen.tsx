import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface School {
  id: string;
  name: string;
  location: string;
  student_count: number;
  status: 'active' | 'inactive' | 'pending';
  subscription_type: string;
}

export default function SchoolListScreen({ navigation }: any) {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const loadSchools = useCallback(async () => {
    try {
      setSchools([
        { id: '1', name: 'Lincoln Academy', location: 'New York, NY', student_count: 450, status: 'active', subscription_type: 'Enterprise' },
        { id: '2', name: 'Washington High', location: 'Los Angeles, CA', student_count: 320, status: 'active', subscription_type: 'Premium' },
        { id: '3', name: 'Jefferson Middle', location: 'Chicago, IL', student_count: 180, status: 'pending', subscription_type: 'Basic' },
        { id: '4', name: 'Roosevelt Elementary', location: 'Houston, TX', student_count: 210, status: 'active', subscription_type: 'Enterprise' },
        { id: '5', name: 'Adams Preparatory', location: 'Phoenix, AZ', student_count: 150, status: 'inactive', subscription_type: 'Premium' },
      ]);
    } catch (error) {
      console.error('[SchoolListScreen] Error loading schools:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadSchools(); }, [loadSchools]);

  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      school.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || school.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return SEMANTIC_COLORS.success.main;
      case 'inactive': return SEMANTIC_COLORS.error.main;
      case 'pending': return SEMANTIC_COLORS.warning.main;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const renderSchool = ({ item }: { item: School }) => (
    <TouchableOpacity onPress={() => navigation.navigate('SchoolDetail', { schoolId: item.id })}>
      <Card variant="elevated" padding="md" style={styles.schoolCard}>
        <View style={styles.schoolHeader}>
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>{item.name}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color={COLORS.onSurfaceVariant} />
              <Text style={styles.schoolLocation}>{item.location}</Text>
            </View>
          </View>
          <Badge variant="dot" color={getStatusColor(item.status)}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        </View>
        <View style={styles.schoolStats}>
          <View style={styles.statItem}>
            <Ionicons name="people-outline" size={16} color={COLORS.onSurfaceVariant} />
            <Text style={styles.statText}>{item.student_count} students</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="card-outline" size={16} color={COLORS.onSurfaceVariant} />
            <Text style={styles.statText}>{item.subscription_type}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.title}>Schools</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color={COLORS.onSurfaceVariant} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search schools..."
            placeholderTextColor={COLORS.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        {['all', 'active', 'pending', 'inactive'].map((status) => (
          <TouchableOpacity
            key={status}
            style={[styles.filterChip, filterStatus === status && styles.filterChipActive]}
            onPress={() => setFilterStatus(status)}
          >
            <Text style={[styles.filterText, filterStatus === status && styles.filterTextActive]}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading schools...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredSchools}
          renderItem={renderSchool}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="school-outline" size={48} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No schools found</Text>
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
  searchContainer: {
    padding: SPACING.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
    gap: SPACING.sm,
  },
  filterChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.surfaceVariant,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  filterTextActive: {
    color: COLORS.onPrimary,
  },
  listContent: {
    padding: SPACING.md,
  },
  schoolCard: {
    marginBottom: SPACING.md,
  },
  schoolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  schoolLocation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginLeft: 4,
  },
  schoolStats: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
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
