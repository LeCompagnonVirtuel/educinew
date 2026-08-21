import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface SchoolDetail {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  principal: string;
  student_count: number;
  teacher_count: number;
  status: 'active' | 'inactive' | 'pending';
  subscription_type: string;
  subscription_expiry: string;
  created_at: string;
}

export default function SchoolDetailScreen({ route, navigation }: any) {
  const { schoolId } = route.params;
  const [school, setSchool] = useState<SchoolDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSchool = useCallback(async () => {
    try {
      setSchool({
        id: schoolId,
        name: 'Lincoln Academy',
        location: '123 Education Lane, New York, NY 10001',
        phone: '+1 (555) 123-4567',
        email: 'admin@lincolnacademy.edu',
        principal: 'Dr. Sarah Johnson',
        student_count: 450,
        teacher_count: 32,
        status: 'active',
        subscription_type: 'Enterprise',
        subscription_expiry: '2027-01-15',
        created_at: '2023-06-01',
      });
    } catch (error) {
      console.error('[SchoolDetailScreen] Error loading school:', error);
    } finally {
      setLoading(false);
    }
  }, [schoolId]);

  useEffect(() => { loadSchool(); }, [loadSchool]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return SEMANTIC_COLORS.success.main;
      case 'inactive': return SEMANTIC_COLORS.error.main;
      case 'pending': return SEMANTIC_COLORS.warning.main;
      default: return COLORS.onSurfaceVariant;
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading school details...</Text>
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
        <Text style={styles.title}>School Details</Text>
        <TouchableOpacity>
          <Ionicons name="create-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card variant="elevated" padding="lg" style={styles.mainCard}>
          <View style={styles.schoolHeader}>
            <View style={styles.schoolIcon}>
              <Ionicons name="school" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.schoolInfo}>
              <Text style={styles.schoolName}>{school?.name}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={16} color={COLORS.onSurfaceVariant} />
                <Text style={styles.schoolLocation}>{school?.location}</Text>
              </View>
            </View>
          </View>
          <Badge variant="dot" color={getStatusColor(school?.status || '')}>
            {school?.status?.charAt(0).toUpperCase() + (school?.status?.slice(1) || '')}
          </Badge>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={20} color={COLORS.onSurfaceVariant} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>{school?.phone}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="mail-outline" size={20} color={COLORS.onSurfaceVariant} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{school?.email}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="person-outline" size={20} color={COLORS.onSurfaceVariant} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Principal</Text>
                <Text style={styles.infoValue}>{school?.principal}</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{school?.student_count}</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{school?.teacher_count}</Text>
              <Text style={styles.statLabel}>Teachers</Text>
            </View>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Subscription</Text>
          <View style={styles.infoList}>
            <View style={styles.infoItem}>
              <Ionicons name="card-outline" size={20} color={COLORS.onSurfaceVariant} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Plan</Text>
                <Text style={styles.infoValue}>{school?.subscription_type}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={20} color={COLORS.onSurfaceVariant} />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Expires</Text>
                <Text style={styles.infoValue}>{school?.subscription_expiry}</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: COLORS.primaryContainer }]}>
                <Ionicons name="people" size={FONT_SIZES.xl} color={COLORS.primary} />
              </View>
              <Text style={styles.actionLabel}>Users</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: SEMANTIC_COLORS.warning.surface }]}>
                <Ionicons name="chatbubbles" size={FONT_SIZES.xl} color={SEMANTIC_COLORS.warning.main} />
              </View>
              <Text style={styles.actionLabel}>Tickets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionItem}>
              <View style={[styles.actionIcon, { backgroundColor: SEMANTIC_COLORS.success.surface }]}>
                <Ionicons name="bar-chart" size={FONT_SIZES.xl} color={SEMANTIC_COLORS.success.main} />
              </View>
              <Text style={styles.actionLabel}>Reports</Text>
            </TouchableOpacity>
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
  mainCard: {
    marginBottom: SPACING.lg,
  },
  schoolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  schoolIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  schoolInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
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
  sectionCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginBottom: SPACING.lg,
  },
  infoList: {
    gap: SPACING.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  infoLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
    fontWeight: FONT_WEIGHTS.medium,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
  actionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionItem: {
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
  },
});
