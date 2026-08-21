import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, RefreshControl } from 'react-native';
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
}

export default function EmployeeListScreen({ navigation }: any) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadEmployees = useCallback(async () => {
    try {
      // Replace with actual API call
      // const data = await api.getEmployees();
      // setEmployees(data);
      setEmployees([]);
    } catch (error) {
      console.error('[EmployeeListScreen] Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadEmployees(); }, [loadEmployees]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEmployees(employees);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredEmployees(
        employees.filter(
          (emp) =>
            emp.first_name.toLowerCase().includes(query) ||
            emp.last_name.toLowerCase().includes(query) ||
            emp.email.toLowerCase().includes(query) ||
            emp.position.toLowerCase().includes(query) ||
            emp.department.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, employees]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadEmployees();
    setRefreshing(false);
  }, [loadEmployees]);

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'INACTIVE': return 'error';
      case 'ON_LEAVE': return 'warning';
      default: return 'neutral';
    }
  };

  const renderEmployeeItem = ({ item }: { item: Employee }) => (
    <TouchableOpacity
      style={styles.employeeCard}
      onPress={() => navigation.navigate('EmployeeDetail', { employeeId: item.id })}
    >
      <Card variant="default" padding="md">
        <View style={styles.employeeHeader}>
          <View style={styles.employeeAvatar}>
            <Text style={styles.avatarText}>
              {item.first_name.charAt(0)}{item.last_name.charAt(0)}
            </Text>
          </View>
          <View style={styles.employeeInfo}>
            <Text style={styles.employeeName}>{item.first_name} {item.last_name}</Text>
            <Text style={styles.employeePosition}>{item.position}</Text>
            <Text style={styles.employeeDepartment}>{item.department}</Text>
          </View>
          <Badge
            label={item.status}
            variant={getStatusVariant(item.status)}
            size="sm"
          />
        </View>
        <View style={styles.employeeDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="mail" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>{item.email}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="call" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>{item.phone}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="calendar" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
            <Text style={styles.detailText}>Joined: {new Date(item.hire_date).toLocaleDateString()}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Employees</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('EmployeeForm')}
        >
          <Ionicons name="add" size={FONT_SIZES.lg} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={FONT_SIZES.md} color={COLORS.onSurfaceVariant} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search employees..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.onSurfaceVariant}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={FONT_SIZES.md} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading employees...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEmployees}
          keyExtractor={(item) => item.id}
          renderItem={renderEmployeeItem}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="people" size={FONT_SIZES.xxxl} color={COLORS.onSurfaceVariant} />
              <Text style={styles.emptyText}>No employees found</Text>
              <Button
                title="Add Employee"
                variant="primary"
                onPress={() => navigation.navigate('EmployeeForm')}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    margin: SPACING.lg,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.outline,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurface,
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
  employeeCard: {
    marginBottom: SPACING.md,
  },
  employeeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
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
  employeeInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  employeePosition: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  employeeDepartment: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.onSurfaceVariant,
  },
  employeeDetails: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.outline,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
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