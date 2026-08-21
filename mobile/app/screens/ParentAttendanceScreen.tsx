import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { useChild } from '../context/ChildContext';
import { api } from '../../services/api';
import ChildSelector from '../../components/ChildSelector';

interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'early_departure';
  arrivalTime?: string;
  departureTime?: string;
  reason?: string;
}

interface AttendanceStats {
  totalDays: number;
  present: number;
  absent: number;
  late: number;
  rate: number;
}

export default function ParentAttendanceScreen({ navigation }: any) {
  const { selectedChild } = useChild();
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadAttendance = useCallback(async () => {
    if (!selectedChild) return;
    try {
      const data = await api.getChildAttendance(selectedChild.id);
      setRecords(data.records || []);
      setStats(data.stats || null);
    } catch (err) {
      console.error('[ParentAttendance]', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedChild?.id]);

  useEffect(() => { setLoading(true); loadAttendance(); }, [loadAttendance]);

  const onRefresh = () => { setRefreshing(true); loadAttendance(); };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'present': return { label: 'Présent', icon: 'checkmark-circle', color: COLORS.success };
      case 'absent': return { label: 'Absent', icon: 'close-circle', color: COLORS.error };
      case 'late': return { label: 'Retard', icon: 'time', color: COLORS.warning };
      case 'excused': return { label: 'Excusé', icon: 'document-text', color: '#06B6D4' };
      case 'early_departure': return { label: 'Sorti tôt', icon: 'exit-outline', color: '#8B5CF6' };
      default: return { label: status, icon: 'help-circle', color: COLORS.outline };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Présences & Pointage</Text>
        <View style={{ width: 24 }} />
      </View>

      <ChildSelector />

      {loading ? (
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Stats Cards */}
          {stats && (
            <View style={styles.statsRow}>
              <View style={[styles.statCard, { backgroundColor: withAlpha(COLORS.success, 0.1) }]}>
                <Text style={[styles.statValue, { color: COLORS.success }]}>{stats.rate}%</Text>
                <Text style={styles.statLabel}>Taux présence</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: withAlpha(COLORS.error, 0.1) }]}>
                <Text style={[styles.statValue, { color: COLORS.error }]}>{stats.absent}</Text>
                <Text style={styles.statLabel}>Absences</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: withAlpha(COLORS.warning, 0.1) }]}>
                <Text style={[styles.statValue, { color: COLORS.warning }]}>{stats.late}</Text>
                <Text style={styles.statLabel}>Retards</Text>
              </View>
            </View>
          )}

          {/* Records */}
          {records.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="calendar-outline" size={40} color={COLORS.outlineVariant} />
              <Text style={styles.emptyText}>Aucun historique de présence</Text>
            </View>
          ) : (
            records.map((r) => {
              const info = getStatusInfo(r.status);
              return (
                <View key={r.id} style={styles.recordRow}>
                  <View style={[styles.recordIcon, { backgroundColor: info.color + '15' }]}>
                    <Ionicons name={info.icon as any} size={18} color={info.color} />
                  </View>
                  <View style={styles.recordInfo}>
                    <Text style={styles.recordDate}>
                      {new Date(r.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </Text>
                    {r.arrivalTime && (
                      <Text style={styles.recordTime}>Arrivée: {r.arrivalTime}</Text>
                    )}
                    {r.reason && (
                      <Text style={styles.recordReason}>{r.reason}</Text>
                    )}
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: info.color + '15' }]}>
                    <Text style={[styles.statusBadgeText, { color: info.color }]}>{info.label}</Text>
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.onSurface },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 4 },
  emptyBox: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.onSurfaceVariant },
  recordRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 14, padding: 14, marginBottom: 8,
  },
  recordIcon: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  recordInfo: { flex: 1 },
  recordDate: { fontSize: 13, fontWeight: '600', color: COLORS.onSurface, textTransform: 'capitalize' },
  recordTime: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 2 },
  recordReason: { fontSize: 11, color: COLORS.onSurfaceVariant, fontStyle: 'italic', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontWeight: '700' },
});
