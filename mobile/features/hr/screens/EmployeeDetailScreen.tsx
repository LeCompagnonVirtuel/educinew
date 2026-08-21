import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge, Button } from '../../../components/ui';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: string;
  hire_date: string;
  address: string;
  emergency_contact: string;
  emergency_phone: string;
  salary: number;
  contract_type: string;
}

export default function EmployeeDetailScreen({ navigation, route }: any) {
  const { employeeId } = route.params;
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadEmployee = useCallback(async () => {
    try {
      // Replace with actual API call
      // const data = await api.getEmployee(employeeId);
      // setEmployee(data);
      setEmployee(null);
    } catch (error) {
      console.error('[EmployeeDetailScreen] Error loading employee:', error);
    } finally {
      setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => { loadEmployee(); }, [loadEmployee]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadEmployee();
    setRefreshing(false);
  }, [loadEmployee]);

  const handleEdit = () => {
    navigation.navigate('EmployeeForm', { employeeId });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Employee',
      'Are you sure you want to delete this employee?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // await api.deleteEmployee(employeeId);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete employee');
            }
          },
        },
      ]
    );
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'INACTIVE': return 'error';
      case 'ON_LEAVE': return 'warning';
      default: return 'neutral';
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading employee details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!employee) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={FONT_SIZES.xxxl} color={COLORS.error} />
          <Text style={styles.errorText}>Employee not found</Text>
          <Button title="Go Back" variant="primary" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={FONT_SIZES.lg} color={COLORS.onSurface} />
          </TouchableOpacity>
          <Text style={styles.title}>Employee Details</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
              <Ionicons name="create" size={FONT_SIZES.lg} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
              <Ionicons name="trash" size={FONT_SIZES.lg} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Card */}
        <Card variant="elevated" padding="lg" style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {employee.first_name.charAt(0)}{employee.last_name.charAt(0)}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.employeeName}>{employee.first_name} {employee.last_name}</Text>
              <Text style={styles.employeePosition}>{employee.position}</Text>
              <Badge
                label={employee.status}
                variant={getStatusVariant(employee.status)}
                size="md"
              />
            </View>
          </View>
        </Card>

        {/* Contact Information */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="mail" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{employee.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{employee.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Address:</Text>
            <Text style={styles.infoValue}>{employee.address}</Text>
          </View>
        </Card>

        {/* Employment Details */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Employment Details</Text>
          <View style={styles.infoRow}>
            <Ionicons name="business" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Department:</Text>
            <Text style={styles.infoValue}>{employee.department}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="calendar" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Hire Date:</Text>
            <Text style={styles.infoValue}>{new Date(employee.hire_date).toLocaleDateString()}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="document-text" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Contract:</Text>
            <Text style={styles.infoValue}>{employee.contract_type}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cash" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Salary:</Text>
            <Text style={styles.infoValue}>${employee.salary.toLocaleString()}</Text>
          </View>
        </Card>

        {/* Emergency Contact */}
        <Card variant="default" padding="lg" style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.infoRow}>
            <Ionicons name="person" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Contact:</Text>
            <Text style={styles.infoValue}>{employee.emergency_contact}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="call" size={FONT_SIZES.md} color={COLORS.primary} />
            <Text style={styles.infoLabel}>Phone:</Text>
            <Text style={styles.infoValue}>{employee.emergency_phone}</Text>
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            title="Edit Employee"
            variant="primary"
            fullWidth
            onPress={handleEdit}
            iconLeft={<Ionicons name="create" size={FONT_SIZES.md} color={COLORS.white} />}
          />
          <Button
            title="Delete Employee"
            variant="danger"
            fullWidth
            onPress={handleDelete}
            iconLeft={<Ionicons name="trash" size={FONT_SIZES.md} color={COLORS.white} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.error,
    marginVertical: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  backButton: {
    padding: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionButton: {
    padding: SPACING.sm,
  },
  profileCard: {
    marginBottom: SPACING.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  avatarText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  profileInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.onSurface,
  },
  employeePosition: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.xs,
  },
  sectionCard: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginBottom: SPACING.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  infoLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginLeft: SPACING.sm,
    width: 100,
  },
  infoValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
    flex: 1,
  },
  actions: {
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
});