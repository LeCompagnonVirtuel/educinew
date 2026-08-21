import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { COLORS } from '../../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../../constants/theme';
import { Card, Badge, Button } from '../../../components/ui';
import { useAuth } from '../../../context/AuthContext';

interface AttendanceRecord {
  id: string;
  date: string;
  check_in: string;
  check_out: string;
  status: string;
  hours_worked: number;
  overtime: number;
}

export default function AttendanceScreen({ navigation }: any) {
  const { user } = useAuth();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const loadAttendance = useCallback(async () => {
    try {
      // Replace with actual API call
      // const data = await api.getAttendance();
      // setRecords(data.records);
      // setTodayRecord(data.todayRecord);
      setRecords([]);
      setTodayRecord(null);
    } catch (error) {
      console.error('[AttendanceScreen] Error loading attendance:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAttendance(); }, [loadAttendance]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAttendance();
    setRefreshing(false);
  }, [loadAttendance]);

  const handleClockIn = async () => {
    Alert.alert(
      'Clock In',
      'Are you sure you want to clock in?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clock In',
          onPress: async () => {
            setActionLoading(true);
            try {
              const { status } = await Location.requestForegroundPermissionsAsync();
              if (status !== 'granted') {
                Alert.alert('Error', 'Location permission is required for clock in');
                setActionLoading(false);
                return;
              }
              const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
              // Replace with actual API call
              // await api.clockIn({
              //   latitude: location.coords.latitude,
              //   longitude: location.coords.longitude,
              // });
              Alert.alert('Success', 'Clocked in successfully');
              loadAttendance();
            } catch (error) {
              Alert.alert('Error', 'Failed to clock in');
            } finally {
              setActionLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleClockOut = async () => {
    Alert.alert(
      'Clock Out',
      'Are you sure you want to clock out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clock Out',
          style: 'destructive',
          onPress: async () => {
            setActionLoading(true);
            try {
              // Replace with actual API call
              // await api.clockOut();
              Alert.alert('Success', 'Clocked out successfully');
              loadAttendance();
            } catch (error) {
              Alert.alert('Error', 'Failed to clock out');
            } finally {
              setActionLoading(false);
            }
          },
        },
      ]
    );
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
    switch (status) {
      case 'PRESENT': return 'success';
      case 'LATE': return 'warning';
      case 'ABSENT': return 'error';
      case 'ON_LEAVE': return 'info';
      default: return 'neutral';
    }
  };

  const renderRecordItem = ({ item }: { item: AttendanceRecord }) => (
    <Card variant="default" padding="md" style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <Text style={styles.recordDate}>{new Date(item.date).toLocaleDateString()}</Text>
        <Badge
          label={item.status}
          variant={getStatusVariant(item.status)}
          size="sm"
        />
      </View>
      <View style={styles.recordDetails}>
        <View style={styles.recordTime}>
          <Ionicons name="log-in" size={FONT_SIZES.sm} color={SEMANTIC_COLORS.success.main} />
          <Text style={styles.timeText}>{item.check_in || '--:--'}</Text>
        </View>
        <Ionicons name="arrow-forward" size={FONT_SIZES.sm} color={COLORS.onSurfaceVariant} />
        <View style={styles.recordTime}>
          <Ionicons name="log-out" size={FONT_SIZES.sm} color={COLORS.error} />
          <Text style={styles.timeText}>{item.check_out || '--:--'}</Text>
        </View>
        <View style={styles.recordHours}>
          <Ionicons name="time" size={FONT_SIZES.sm} color={COLORS.primary} />
          <Text style={styles.hoursText}>{item.hours_worked}h</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Attendance</Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => navigation.navigate('AttendanceHistory')}
        >
          <Ionicons name="time" size={FONT_SIZES.lg} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Current Time */}
      <Card variant="elevated" padding="lg" style={styles.timeCard}>
        <Text style={styles.currentTime}>
          {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </Text>
        <Text style={styles.currentDate}>
          {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
      </Card>

      {/* Today's Status */}
      <Card variant="default" padding="lg" style={styles.statusCard}>
        <Text style={styles.sectionTitle}>Today's Status</Text>
        {todayRecord ? (
          <View style={styles.todayStatus}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Check In:</Text>
              <Text style={styles.statusValue}>{todayRecord.check_in || '--:--'}</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Check Out:</Text>
              <Text style={styles.statusValue}>{todayRecord.check_out || '--:--'}</Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Status:</Text>
              <Badge
                label={todayRecord.status}
                variant={getStatusVariant(todayRecord.status)}
                size="md"
              />
            </View>
          </View>
        ) : (
          <Text style={styles.noRecord}>No attendance record for today</Text>
        )}
      </Card>

      {/* Action Buttons */}
      <View style={styles.actions}>
        {!todayRecord?.check_in ? (
          <Button
            title="Clock In"
            variant="primary"
            fullWidth
            loading={actionLoading}
            onPress={handleClockIn}
            iconLeft={<Ionicons name="log-in" size={FONT_SIZES.lg} color={COLORS.white} />}
          />
        ) : !todayRecord?.check_out ? (
          <Button
            title="Clock Out"
            variant="danger"
            fullWidth
            loading={actionLoading}
            onPress={handleClockOut}
            iconLeft={<Ionicons name="log-out" size={FONT_SIZES.lg} color={COLORS.white} />}
          />
        ) : (
          <Button
            title="Day Complete"
            variant="secondary"
            fullWidth
            disabled
            iconLeft={<Ionicons name="checkmark-circle" size={FONT_SIZES.lg} color={COLORS.white} />}
          />
        )}
      </View>

      {/* Recent History */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Recent History</Text>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading history...</Text>
          </View>
        ) : (
          <FlatList
            data={records}
            keyExtractor={(item) => item.id}
            renderItem={renderRecordItem}
            contentContainerStyle={styles.listContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="time" size={FONT_SIZES.xxxl} color={COLORS.onSurfaceVariant} />
                <Text style={styles.emptyText}>No attendance records found</Text>
              </View>
            }
          />
        )}
      </View>
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
  historyButton: {
    padding: SPACING.sm,
  },
  timeCard: {
    margin: SPACING.lg,
    alignItems: 'center',
  },
  currentTime: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.primary,
  },
  currentDate: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.xs,
  },
  statusCard: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
    marginBottom: SPACING.md,
  },
  todayStatus: {
    gap: SPACING.sm,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
  },
  statusValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.onSurface,
  },
  noRecord: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
    padding: SPACING.lg,
  },
  actions: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  historySection: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
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
    paddingBottom: SPACING.xl,
  },
  recordCard: {
    marginBottom: SPACING.sm,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  recordDate: {
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.onSurface,
  },
  recordDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  recordTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  timeText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.onSurfaceVariant,
  },
  recordHours: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginLeft: 'auto',
  },
  hoursText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: SPACING.xxxl,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.onSurfaceVariant,
    marginTop: SPACING.md,
  },
});