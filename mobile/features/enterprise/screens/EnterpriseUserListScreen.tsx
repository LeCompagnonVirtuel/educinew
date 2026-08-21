import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge } from '../../../components/ui';

interface EnterpriseUser {
  id: string;
  name: string;
  email: string;
  school_name: string;
  role: 'super_admin' | 'school_admin' | 'teacher' | 'student';
  status: 'active' | 'inactive' | 'pending';
  last_login: string;
}

export default function EnterpriseUserListScreen({ navigation }: any) {
  const [users, setUsers] = useState<EnterpriseUser[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = useCallback(async () => {
    try {
      setUsers([
        { id: '1', name: 'Admin User', email: 'admin@educi.com', school_name: 'All Schools', role: 'super_admin', status: 'active', last_login: '2026-07-24 10:30' },
        { id: '2', name: 'Dr. Sarah Johnson', email: 'sjohnson@lincolnacademy.edu', school_name: 'Lincoln Academy', role: 'school_admin', status: 'active', last_login: '2026-07-24 09:15' },
        { id: '3', name: 'Jane Smith', email: 'jsmith@lincolnacademy.edu', school_name: 'Lincoln Academy', role: 'teacher', status: 'active', last_login: '2026-07-23 16:45' },
        { id: '4', name: 'John Doe', email: 'jdoe@lincolnacademy.edu', school_name: 'Lincoln Academy', role: 'student', status: 'active', last_login: '2026-07-24 08:00' },
        { id: '5', name: 'Bob Wilson', email: 'bwilson@washingtonhigh.edu', school_name: 'Washington High', role: 'school_admin', status: 'active', last_login: '2026-07-24 11:20' },
      ]);
    } catch (error) {
      console.error('[EnterpriseUserListScreen] Error loading users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadUsers(); }, [loadUsers]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return SEMANTIC_COLORS.success.main;
      case 'inactive': return SEMANTIC_COLORS.error.main;
      case 'pending': return SEMANTIC_COLORS.warning.main;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return SEMANTIC_COLORS.error.main;
      case 'school_admin': return SEMANTIC_COLORS.warning.main;
      case 'teacher': return COLORS.primary;
      case 'student': return SEMANTIC_COLORS.info.main;
      default: return COLORS.onSurfaceVariant;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const renderUser = ({ item }: { item: EnterpriseUser }) => (
    <Card variant="elevated" padding="md" style={styles.userCard}>
      <View style={styles.userHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(item.name)}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <Badge variant="dot" color={getStatusColor(item.status)}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      </View>

      <View style={styles.detailsRow}>
        <Badge variant="outline" color={getRoleColor(item.role)}>
          {item.role.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
        </Badge>
        <Text style={styles.schoolText}>{item.school_name}</Text>
      </View>

      <View style={styles.loginRow}>
        <Ionicons name="time-outline" size={14} color={COLORS.onSurfaceVariant} />
        <Text style={styles.loginText}>Last login: {item.last_login}</Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="create-outline" size={18} color={COLORS.primary} />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="key-outline" size={18} color={COLORS.onSurfaceVariant} />
          <Text style={styles.actionText}>Reset Password</Text>
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
        <Text style={styles.title}>Users</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people-outline" size={48} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No users found</Text>
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
  userCard: {
    marginBottom: SPACING.md,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatar: {
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
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  userEmail: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  schoolText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SPACING.md,
  },
  loginText: {
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
