import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface AttendanceRecord {
  id: string;
  studentName: string;
  studentId: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: string;
}

export const ScBusAttendanceScreen: React.FC<{ route: any }> = ({ route }) => {
  const { busId, tripId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    fetchAttendance();
  }, [busId, tripId]);

  const fetchAttendance = async () => {
    try {
      const params = new URLSearchParams();
      if (busId) params.append('busId', busId);
      if (tripId) params.append('tripId', tripId);
      const response = await fetch(`/api/smart-campus/bus-attendance?${params.toString()}`);
      const json = await response.json();
      setAttendance(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  const checkedIn = attendance.filter((a) => a.status === 'checked-in').length;
  const checkedOut = attendance.filter((a) => a.status === 'checked-out').length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Attendance Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{attendance.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, styles.checkedIn]}>{checkedIn}</Text>
            <Text style={styles.summaryLabel}>Checked In</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryValue, styles.checkedOut]}>{checkedOut}</Text>
            <Text style={styles.summaryLabel}>Checked Out</Text>
          </View>
        </View>
      </View>

      {attendance.map((record) => (
        <View key={record.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.studentName}>{record.studentName}</Text>
            <View style={[styles.statusBadge, record.status === 'checked-in' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{record.status}</Text>
            </View>
          </View>
          <Text style={styles.studentId}>ID: {record.studentId}</Text>
          <View style={styles.timeInfo}>
            <Text style={styles.timeText}>Check In: {record.checkInTime}</Text>
            <Text style={styles.timeText}>
              Check Out: {record.checkOutTime || 'Pending'}
            </Text>
          </View>
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
  checkedIn: { color: '#28a745' },
  checkedOut: { color: '#6c757d' },
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
  studentName: { fontSize: 16, fontWeight: '600' },
  studentId: { fontSize: 14, color: '#666', marginBottom: 8 },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: { fontSize: 14, color: '#666' },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: { backgroundColor: '#d4edda' },
  statusInactive: { backgroundColor: '#fff3cd' },
  statusText: { fontSize: 12, fontWeight: '600' },
});
