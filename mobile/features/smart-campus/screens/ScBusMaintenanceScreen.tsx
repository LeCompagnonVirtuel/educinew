import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface MaintenanceRecord {
  id: string;
  busName: string;
  type: string;
  description: string;
  scheduledDate: string;
  completedDate: string | null;
  status: string;
  cost: number;
  technician: string;
}

export const ScBusMaintenanceScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { busId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);

  useEffect(() => {
    fetchMaintenanceRecords();
  }, [busId]);

  const fetchMaintenanceRecords = async () => {
    try {
      const url = busId
        ? `/api/smart-campus/bus-maintenance?busId=${busId}`
        : '/api/smart-campus/bus-maintenance';
      const response = await fetch(url);
      const json = await response.json();
      setRecords(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const pending = records.filter((r) => r.status === 'pending').length;
  const completed = records.filter((r) => r.status === 'completed').length;
  const inProgress = records.filter((r) => r.status === 'in-progress').length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Maintenance Overview</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{pending}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, styles.inProgress]}>{inProgress}</Text>
            <Text style={styles.summaryLabel}>In Progress</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, styles.completed]}>{completed}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
        </View>
      </View>

      {records.map((record) => (
        <TouchableOpacity
          key={record.id}
          style={styles.card}
          onPress={() => navigation.navigate('ScBusMaintenanceDetail', { id: record.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.busName}>{record.busName}</Text>
            <View style={[styles.statusBadge, getStatusStyle(record.status)]}>
              <Text style={styles.statusText}>{record.status}</Text>
            </View>
          </View>
          <Text style={styles.type}>{record.type}</Text>
          <Text style={styles.description}>{record.description}</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText}>Scheduled: {record.scheduledDate}</Text>
            <Text style={styles.detailText}>Cost: ${record.cost.toFixed(2)}</Text>
          </View>
          <Text style={styles.technician}>Technician: {record.technician}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'completed':
      return styles.statusCompleted;
    case 'in-progress':
      return styles.statusInProgress;
    default:
      return styles.statusPending;
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    elevation: 2,
  },
  summaryTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { fontSize: 24, fontWeight: '700' },
  summaryLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  inProgress: { color: '#ffc107' },
  completed: { color: '#28a745' },
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
  busName: { fontSize: 16, fontWeight: '600' },
  type: { fontSize: 14, fontWeight: '500', marginBottom: 4 },
  description: { fontSize: 14, color: '#666', marginBottom: 8 },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailText: { fontSize: 14, color: '#666' },
  technician: { fontSize: 14, color: '#666' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: { backgroundColor: '#fff3cd' },
  statusInProgress: { backgroundColor: '#cce5ff' },
  statusCompleted: { backgroundColor: '#d4edda' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
