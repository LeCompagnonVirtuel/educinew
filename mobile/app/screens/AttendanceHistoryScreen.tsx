import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { useAuth } from '../context/AuthContext';
import { api } from '../../services/api';

export default function AttendanceHistoryScreen({ navigation }: any) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    try {
      setError(null);
      const data = await api.getStudentAttendanceByUser(user.id);
      setStats(data.stats);
      setRecords(data.records || []);
    } catch (err: any) {
      setError(err?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => { loadData(); }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const getStatusInfo = (status: string) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'present': return { label: 'Présent', icon: 'checkmark-circle', color: COLORS.success };
      case 'absent': return { label: 'Absent', icon: 'close-circle', color: COLORS.error };
      case 'late': return { label: 'Retard', icon: 'time', color: COLORS.warning };
      case 'excused': return { label: 'Excusé', icon: 'document-text', color: '#06B6D4' };
      default: return { label: 'Présent', icon: 'checkmark-circle', color: COLORS.success };
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Présences & Pointage</Text>
          <View style={{ width: 24 }} />
        </View>

        {error && (
          <TouchableOpacity style={styles.errorBanner} onPress={loadData}>
            <Ionicons name="warning-outline" size={16} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        )}

        {/* Stats */}
        {stats && (
          <>
            <View style={styles.rateCard}>
              <Text style={styles.rateValue}>{stats.rate}%</Text>
              <Text style={styles.rateLabel}>Taux de présence</Text>
            </View>

            <View style={styles.statsRow}>
              <View style={[styles.statCard, { backgroundColor: withAlpha(COLORS.success, 0.1) }]}>
                <Text style={[styles.statValue, { color: COLORS.success }]}>{stats.present}</Text>
                <Text style={styles.statLabel}>Présences</Text>
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
          </>
        )}

        {/* Records */}
        <Text style={styles.sectionTitle}>Historique</Text>
        {records.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="calendar-outline" size={40} color={COLORS.outlineVariant} />
            <Text style={styles.emptyText}>Aucun historique de présence</Text>
          </View>
        ) : (
          records.map((r: any) => {
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
                  {r.arrivalTime && <Text style={styles.recordTime}>Arrivée: {r.arrivalTime}</Text>}
                  {r.reason && <Text style={styles.recordReason}>{r.reason}</Text>}
                </View>
                <View style={[styles.statusBadge, { backgroundColor: info.color + '15' }]}>
                  <Text style={[styles.statusBadgeText, { color: info.color }]}>{info.label}</Text>
                </View>
              </View>
            );
          })
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.onSurface },
  errorBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 16, marginBottom: 12, backgroundColor: COLORS.errorContainer, borderRadius: 12, padding: 12 },
  errorText: { flex: 1, fontSize: 12, color: COLORS.error },
  retryText: { fontSize: 12, fontWeight: '700', color: COLORS.error },

  rateCard: { alignItems: 'center', marginHorizontal: 16, backgroundColor: COLORS.primary, borderRadius: 20, padding: 24, marginBottom: 16 },
  rateValue: { fontSize: 48, fontWeight: '900', color: COLORS.onPrimary },
  rateLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },

  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 20 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800' },
  statLabel: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 4 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.onSurface, paddingHorizontal: 16, marginBottom: 12 },
  emptyBox: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.onSurfaceVariant },

  recordRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 14, padding: 14, marginHorizontal: 16, marginBottom: 8,
  },
  recordIcon: { width: 36, height: 36, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  recordInfo: { flex: 1 },
  recordDate: { fontSize: 13, fontWeight: '600', color: COLORS.onSurface, textTransform: 'capitalize' },
  recordTime: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 2 },
  recordReason: { fontSize: 11, color: COLORS.onSurfaceVariant, fontStyle: 'italic', marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontWeight: '700' },
});
