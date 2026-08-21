import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  status: string;
  phone: string;
  assignedStation: string;
}

export const ScKitchenStaffScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState<StaffMember[]>([]);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/smart-campus/canteen/staff');
      const json = await response.json();
      setStaff(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const onDuty = staff.filter((s) => s.status === 'on-duty').length;
  const offDuty = staff.filter((s) => s.status === 'off-duty').length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Staff Overview</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{staff.length}</Text>
            <Text style={styles.summaryLabel}>Total Staff</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#28a745' }]}>{onDuty}</Text>
            <Text style={styles.summaryLabel}>On Duty</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, { color: '#6c757d' }]}>{offDuty}</Text>
            <Text style={styles.summaryLabel}>Off Duty</Text>
          </View>
        </View>
      </View>

      {staff.map((member) => (
        <View key={member.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{member.name}</Text>
            <View style={[styles.statusBadge, member.status === 'on-duty' ? styles.statusOn : styles.statusOff]}>
              <Text style={styles.statusText}>{member.status}</Text>
            </View>
          </View>
          <Text style={styles.role}>{member.role}</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>Shift: {member.shift}</Text>
            <Text style={styles.detailText}>Station: {member.assignedStation}</Text>
          </View>
          <Text style={styles.phone}>Phone: {member.phone}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
  },
  summaryTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 24, fontWeight: '700' },
  summaryLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: { fontSize: 16, fontWeight: '600' },
  role: { fontSize: 14, color: '#666', marginBottom: 8 },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailText: { fontSize: 14, color: '#666' },
  phone: { fontSize: 14, color: '#666' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusOn: { backgroundColor: '#d4edda' },
  statusOff: { backgroundColor: '#e2e3e5' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
