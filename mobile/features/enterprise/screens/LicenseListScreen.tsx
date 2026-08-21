import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface License {
  id: string;
  school_name: string;
  license_key: string;
  type: 'student' | 'teacher' | 'admin';
  status: 'active' | 'expired' | 'revoked';
  assigned_to: string | null;
  expires_at: string;
  created_at: string;
}

export default function LicenseListScreen({ navigation }: any) {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLicenses = useCallback(async () => {
    try {
      setLicenses([
        { id: '1', school_name: 'Lincoln Academy', license_key: 'LIC-XXXX-1234', type: 'student', status: 'active', assigned_to: 'John Doe', expires_at: '2027-01-15', created_at: '2026-01-15' },
        { id: '2', school_name: 'Lincoln Academy', license_key: 'LIC-XXXX-5678', type: 'teacher', status: 'active', assigned_to: 'Jane Smith', expires_at: '2027-01-15', created_at: '2026-01-15' },
        { id: '3', school_name: 'Washington High', license_key: 'LIC-XXXX-9012', type: 'admin', status: 'active', assigned_to: 'Bob Wilson', expires_at: '2027-03-15', created_at: '2026-03-15' },
        { id: '4', school_name: 'Jefferson Middle', license_key: 'LIC-XXXX-3456', type: 'student', status: 'expired', assigned_to: null, expires_at: '2026-06-01', created_at: '2025-06-01' },
        { id: '5', school_name: 'Roosevelt Elementary', license_key: 'LIC-XXXX-7890', type: 'student', status: 'active', assigned_to: 'Alice Brown', expires_at: '2026-12-01', created_at: '2025-12-01' },
      ]);
    } catch (error) {
      console.error('[LicenseListScreen] Error loading licenses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadLicenses(); }, [loadLicenses]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return SEMANTIC_COLORS.success.main;
      case 'expired': return SEMANTIC_COLORS.error.main;
      case 'revoked': return COLORS.onSurfaceVariant;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'admin': return SEMANTIC_COLORS.error.main;
      case 'teacher': return SEMANTIC_COLORS.warning.main;
      case 'student': return COLORS.primary;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const renderLicense = ({ item }: { item: License }) => (
    <Card variant="elevated" padding="md" style={styles.licenseCard}>
      <View style={styles.licenseHeader}>
        <View style={styles.licenseInfo}>
          <Text style={styles.schoolName}>{item.school_name}</Text>
          <Text style={styles.licenseKey}>{item.license_key}</Text>
        </View>
        <Badge variant="dot" color={getStatusColor(item.status)}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      </View>

      <View style={styles.detailsRow}>
        <Badge variant="outline" color={getTypeColor(item.type)}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </Badge>
        <Text style={styles.expiryText}>Expires: {item.expires_at}</Text>
      </View>

      <View style={styles.assignedRow}>
        <Ionicons name="person-outline" size={16} color={COLORS.onSurfaceVariant} />
        <Text style={styles.assignedText}>
          {item.assigned_to || 'Unassigned'}
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={18} color={COLORS.primary} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        {item.status === 'active' && (
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="ban-outline" size={18} color={SEMANTIC_COLORS.error.main} />
            <Text style={[styles.actionText, { color: SEMANTIC_COLORS.error.main }]}>Revoke</Text>
          </TouchableOpacity>
        )}
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
        <Text style={styles.title}>Licenses</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading licenses...</Text>
        </View>
      ) : (
        <FlatList
          data={licenses}
          renderItem={renderLicense}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="key-outline" size={48} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No licenses found</Text>
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
  licenseCard: {
    marginBottom: SPACING.md,
  },
  licenseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  licenseInfo: {
    flex: 1,
  },
  schoolName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  licenseKey: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
    fontFamily: 'monospace',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  expiryText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  assignedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SPACING.md,
  },
  assignedText: {
    fontSize: FONT_SIZES.sm,
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
