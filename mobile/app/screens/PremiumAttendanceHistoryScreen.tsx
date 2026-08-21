import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { useAuth } from '../context/AuthContext';
import { api } from '../../services/api';

const MONTHS_FR = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
];
const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

interface AttendanceRecord {
  id: string;
  date: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: string;
  lateMinutes?: number;
  method?: string;
  arrivalTime?: string;
  departureTime?: string;
  reason?: string;
}

function CircularRate({ rate }: { rate: number }) {
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (rate / 100) * circumference;

  return (
    <View style={circularStyles.container}>
      <View style={[circularStyles.outerCircle, { width: size, height: size, borderRadius: size / 2 }]}>
        <View style={[circularStyles.innerTrack, { width: size - 4, height: size - 4, borderRadius: (size - 4) / 2 }]}>
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 10) * (Math.PI / 180);
            const filled = (i / 36) * 100 <= rate;
            return (
              <View
                key={i}
                style={[
                  circularStyles.segment,
                  {
                    transform: [{ rotate: `${i * 10}deg` }],
                    backgroundColor: filled ? COLORS.success : COLORS.surfaceContainerHigh,
                  },
                ]}
              />
            );
          })}
          <View style={circularStyles.centerCircle}>
            <Text style={circularStyles.rateText}>{rate}%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export default function PremiumAttendanceHistoryScreen({ navigation }: any) {
  const { user } = useAuth();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const CALENDAR_CELL = (SCREEN_WIDTH - 48) / 7;
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [allRecords, setAllRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<{ totalDays: number; present: number; absent: number; late: number; rate: number } | null>(null);

  const loadData = useCallback(async () => {
    if (!user?.id) return;
    try {
      setError(null);
      const data = await api.getStudentAttendanceByUser(user.id);
      setAllRecords(data.records || []);
      setStats(data.stats || null);
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

  const filteredRecords = useMemo(() => {
    return allRecords.filter((r) => {
      const d = new Date(r.date);
      return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear;
    });
  }, [allRecords, selectedMonth, selectedYear]);

  const monthStats = useMemo(() => {
    const total = filteredRecords.length;
    const present = filteredRecords.filter(r => (r.status || '').toLowerCase() === 'present').length;
    const absent = filteredRecords.filter(r => (r.status || '').toLowerCase() === 'absent').length;
    const late = filteredRecords.filter(r => (r.status || '').toLowerCase() === 'late').length;
    const rate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;
    return { total, present, absent, late, rate };
  }, [filteredRecords]);

  const recordByDate = useMemo(() => {
    const map: Record<number, AttendanceRecord> = {};
    for (const r of filteredRecords) {
      const day = new Date(r.date).getDate();
      if (!map[day]) map[day] = r;
    }
    return map;
  }, [filteredRecords]);

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let i = 1; i <= daysInMonth; i++) cells.push(i);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [selectedYear, selectedMonth]);

  const selectedDayRecord = selectedDay != null ? recordByDate[selectedDay] || null : null;

  const navigateMonth = (delta: number) => {
    setSelectedDay(null);
    let newMonth = selectedMonth + delta;
    let newYear = selectedYear;
    if (newMonth < 0) { newMonth = 11; newYear--; }
    if (newMonth > 11) { newMonth = 0; newYear++; }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const getStatusInfo = (status: string) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'present': return { label: 'Présent', icon: 'checkmark-circle' as const, color: COLORS.success };
      case 'absent': return { label: 'Absent', icon: 'close-circle' as const, color: COLORS.error };
      case 'late': return { label: 'Retard', icon: 'time' as const, color: COLORS.warning };
      case 'excused': return { label: 'Excusé', icon: 'document-text' as const, color: '#06B6D4' };
      default: return { label: 'Présent', icon: 'checkmark-circle' as const, color: COLORS.success };
    }
  };

  const getDayColor = (day: number): string | null => {
    const record = recordByDate[day];
    if (!record) return null;
    const s = (record.status || '').toLowerCase();
    if (s === 'present') return COLORS.success;
    if (s === 'absent') return COLORS.error;
    if (s === 'late') return COLORS.warning;
    return null;
  };

  const isWeekend = (day: number): boolean => {
    const d = new Date(selectedYear, selectedMonth, day);
    const dow = d.getDay();
    return dow === 0 || dow === 6;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderBox}>
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={COLORS.onSurface} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Historique de présence</Text>
          <View style={{ width: 36 }} />
        </View>

        {error && (
          <TouchableOpacity style={styles.errorBanner} onPress={loadData}>
            <Ionicons name="warning-outline" size={16} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.retryText}>Réessayer</Text>
          </TouchableOpacity>
        )}

        {/* Month / Year Selector */}
        <View style={styles.monthSelector}>
          <TouchableOpacity onPress={() => navigateMonth(-1)} style={styles.monthArrow}>
            <Ionicons name="chevron-back" size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <View style={styles.monthLabelBox}>
            <Text style={styles.monthLabel}>{MONTHS_FR[selectedMonth]}</Text>
            <Text style={styles.yearLabel}>{selectedYear}</Text>
          </View>
          <TouchableOpacity onPress={() => navigateMonth(1)} style={styles.monthArrow}>
            <Ionicons name="chevron-forward" size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Summary Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: withAlpha(COLORS.primary, 0.08) }]}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
            <Text style={[styles.statValue, { color: COLORS.primary }]}>{monthStats.total}</Text>
            <Text style={styles.statLabel}>Jours</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: withAlpha(COLORS.success, 0.08) }]}>
            <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.success} />
            <Text style={[styles.statValue, { color: COLORS.success }]}>{monthStats.present}</Text>
            <Text style={styles.statLabel}>Présent</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: withAlpha(COLORS.warning, 0.08) }]}>
            <Ionicons name="time-outline" size={20} color={COLORS.warning} />
            <Text style={[styles.statValue, { color: COLORS.warning }]}>{monthStats.late}</Text>
            <Text style={styles.statLabel}>Retard</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: withAlpha(COLORS.error, 0.08) }]}>
            <Ionicons name="close-circle-outline" size={20} color={COLORS.error} />
            <Text style={[styles.statValue, { color: COLORS.error }]}>{monthStats.absent}</Text>
            <Text style={styles.statLabel}>Absent</Text>
          </View>
        </View>

        {/* Circular Rate + Global Stats */}
        <View style={styles.rateSection}>
          <CircularRate rate={monthStats.rate} />
          <View style={styles.rateInfo}>
            <Text style={styles.rateTitle}>Taux de présence</Text>
            <Text style={styles.rateSubtitle}>Ce mois-ci</Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
                <Text style={styles.legendText}>Présent ({monthStats.present})</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.warning }]} />
                <Text style={styles.legendText}>Retard ({monthStats.late})</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.error }]} />
                <Text style={styles.legendText}>Absent ({monthStats.absent})</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Calendrier</Text>
          <View style={styles.weekdayRow}>
            {WEEKDAYS.map((w) => (
              <View key={w} style={[styles.weekdayCell, { width: CALENDAR_CELL }]}>
                <Text style={styles.weekdayText}>{w}</Text>
              </View>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, idx) => {
              if (day === null) return <View key={`empty-${idx}`} style={[styles.dayCell, { width: CALENDAR_CELL, height: CALENDAR_CELL }]} />;
              const weekend = isWeekend(day);
              const dayColor = getDayColor(day);
              const isSelected = selectedDay === day;
              const today = new Date();
              const isToday = day === today.getDate() && selectedMonth === today.getMonth() && selectedYear === today.getFullYear();

              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayCell,
                    { width: CALENDAR_CELL, height: CALENDAR_CELL },
                    isSelected && [styles.dayCellSelected, { borderRadius: CALENDAR_CELL / 2 }],
                    isToday && !isSelected && [styles.dayCellToday, { borderRadius: CALENDAR_CELL / 2 }],
                  ]}
                  onPress={() => setSelectedDay(isSelected ? null : day)}
                  activeOpacity={0.7}
                >
                  {dayColor && <View style={[styles.dayDot, { backgroundColor: dayColor }]} />}
                  <Text
                    style={[
                      styles.dayText,
                      weekend && styles.dayTextWeekend,
                      isSelected && styles.dayTextSelected,
                      dayColor && { color: dayColor, fontWeight: '700' },
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Day Detail */}
        {selectedDay != null && (
          <View style={styles.dayDetailCard}>
            <Text style={styles.dayDetailTitle}>
              {selectedDay} {MONTHS_FR[selectedMonth]} {selectedYear}
            </Text>
            {selectedDayRecord ? (
              (() => {
                const info = getStatusInfo(selectedDayRecord.status);
                return (
                  <View style={styles.dayDetailContent}>
                    <View style={[styles.dayDetailBadge, { backgroundColor: info.color + '18' }]}>
                      <Ionicons name={info.icon} size={18} color={info.color} />
                      <Text style={[styles.dayDetailBadgeText, { color: info.color }]}>{info.label}</Text>
                    </View>
                    <View style={styles.dayDetailInfo}>
                      {selectedDayRecord.checkInTime && (
                        <View style={styles.dayDetailRow}>
                          <Ionicons name="log-in-outline" size={14} color={COLORS.onSurfaceVariant} />
                          <Text style={styles.dayDetailText}>Arrivée: {formatTime(selectedDayRecord.checkInTime)}</Text>
                        </View>
                      )}
                      {selectedDayRecord.arrivalTime && (
                        <View style={styles.dayDetailRow}>
                          <Ionicons name="log-in-outline" size={14} color={COLORS.onSurfaceVariant} />
                          <Text style={styles.dayDetailText}>Arrivée: {selectedDayRecord.arrivalTime}</Text>
                        </View>
                      )}
                      {selectedDayRecord.checkOutTime && (
                        <View style={styles.dayDetailRow}>
                          <Ionicons name="log-out-outline" size={14} color={COLORS.onSurfaceVariant} />
                          <Text style={styles.dayDetailText}>Départ: {formatTime(selectedDayRecord.checkOutTime)}</Text>
                        </View>
                      )}
                      {selectedDayRecord.departureTime && (
                        <View style={styles.dayDetailRow}>
                          <Ionicons name="log-out-outline" size={14} color={COLORS.onSurfaceVariant} />
                          <Text style={styles.dayDetailText}>Départ: {selectedDayRecord.departureTime}</Text>
                        </View>
                      )}
                      {(selectedDayRecord.lateMinutes ?? 0) > 0 && (
                        <View style={styles.dayDetailRow}>
                          <Ionicons name="time-outline" size={14} color={COLORS.warning} />
                          <Text style={[styles.dayDetailText, { color: COLORS.warning }]}>
                            Retard: {selectedDayRecord.lateMinutes} min
                          </Text>
                        </View>
                      )}
                      {selectedDayRecord.reason && (
                        <View style={styles.dayDetailRow}>
                          <Ionicons name="document-text-outline" size={14} color={COLORS.onSurfaceVariant} />
                          <Text style={[styles.dayDetailText, { fontStyle: 'italic' }]}>{selectedDayRecord.reason}</Text>
                        </View>
                      )}
                      {selectedDayRecord.method && (
                        <View style={styles.dayDetailRow}>
                          <Ionicons name="qr-code-outline" size={14} color={COLORS.onSurfaceVariant} />
                          <Text style={styles.dayDetailText}>Méthode: {selectedDayRecord.method}</Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })()
            ) : (
              <View style={styles.dayDetailEmpty}>
                <Ionicons name="information-circle-outline" size={18} color={COLORS.outlineVariant} />
                <Text style={styles.dayDetailEmptyText}>Aucun enregistrement ce jour</Text>
              </View>
            )}
          </View>
        )}

        {/* Records List */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Détails des présences</Text>
          {filteredRecords.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="calendar-outline" size={40} color={COLORS.outlineVariant} />
              <Text style={styles.emptyText}>Aucun enregistrement ce mois</Text>
            </View>
          ) : (
            filteredRecords.map((r) => {
              const info = getStatusInfo(r.status);
              return (
                <View key={r.id} style={styles.recordRow}>
                  <View style={[styles.recordIcon, { backgroundColor: info.color + '15' }]}>
                    <Ionicons name={info.icon} size={18} color={info.color} />
                  </View>
                  <View style={styles.recordInfo}>
                    <Text style={styles.recordDate}>
                      {new Date(r.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </Text>
                    {(r.checkInTime || r.arrivalTime) && (
                      <Text style={styles.recordTime}>
                        Arrivée: {formatTime(r.checkInTime || r.arrivalTime)}
                      </Text>
                    )}
                    {(r.checkOutTime || r.departureTime) && (
                      <Text style={styles.recordTime}>
                        Départ: {formatTime(r.checkOutTime || r.departureTime)}
                      </Text>
                    )}
                    {(r.lateMinutes ?? 0) > 0 && (
                      <Text style={styles.recordLate}>Retard: {r.lateMinutes} min</Text>
                    )}
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: info.color + '15' }]}>
                    <Text style={[styles.statusBadgeText, { color: info.color }]}>{info.label}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function formatTime(time?: string): string {
  if (!time) return '--:--';
  try {
    if (time.includes('T')) {
      const d = new Date(time);
      return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    return time.substring(0, 5);
  } catch {
    return time;
  }
}

const circularStyles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  outerCircle: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerTrack: {
    backgroundColor: COLORS.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segment: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  centerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rateText: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loaderBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface },

  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: COLORS.errorContainer,
    borderRadius: 12,
    padding: 12,
  },
  errorText: { flex: 1, fontSize: 12, color: COLORS.error },
  retryText: { fontSize: 12, fontWeight: '700', color: COLORS.error },

  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  monthArrow: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: withAlpha(COLORS.primary, 0.08),
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthLabelBox: { alignItems: 'center' },
  monthLabel: { fontSize: 17, fontWeight: '700', color: COLORS.onSurface },
  yearLabel: { fontSize: 13, color: COLORS.onSurfaceVariant, marginTop: 1 },

  statsGrid: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { fontSize: 10, color: COLORS.onSurfaceVariant, fontWeight: '600' },

  rateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  rateInfo: { flex: 1 },
  rateTitle: { fontSize: 16, fontWeight: '700', color: COLORS.onSurface },
  rateSubtitle: { fontSize: 12, color: COLORS.onSurfaceVariant, marginBottom: 12 },
  legendRow: { gap: 8 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, color: COLORS.onSurfaceVariant },

  sectionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 20,
    padding: 16,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.onSurface, marginBottom: 12 },

  weekdayRow: { flexDirection: 'row', marginBottom: 4 },
  weekdayCell: { alignItems: 'center' },
  weekdayText: { fontSize: 11, fontWeight: '600', color: COLORS.onSurfaceVariant },

  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCellSelected: {
    backgroundColor: COLORS.primary,
  },
  dayCellToday: {
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  dayDot: {
    position: 'absolute',
    top: 4,
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  dayText: { fontSize: 14, fontWeight: '500', color: COLORS.onSurface },
  dayTextWeekend: { color: COLORS.outlineVariant },
  dayTextSelected: { color: COLORS.onPrimary, fontWeight: '700' },

  dayDetailCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 20,
    padding: 16,
  },
  dayDetailTitle: { fontSize: 15, fontWeight: '700', color: COLORS.onSurface, marginBottom: 12 },
  dayDetailContent: { gap: 12 },
  dayDetailBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  dayDetailBadgeText: { fontSize: 13, fontWeight: '700' },
  dayDetailInfo: { gap: 6 },
  dayDetailRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dayDetailText: { fontSize: 13, color: COLORS.onSurfaceVariant },
  dayDetailEmpty: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dayDetailEmptyText: { fontSize: 13, color: COLORS.outlineVariant },

  emptyBox: { alignItems: 'center', paddingVertical: 32, gap: 10 },
  emptyText: { fontSize: 13, color: COLORS.onSurfaceVariant },

  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 14,
    padding: 12,
    marginBottom: 8,
  },
  recordIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInfo: { flex: 1 },
  recordDate: { fontSize: 13, fontWeight: '600', color: COLORS.onSurface, textTransform: 'capitalize' },
  recordTime: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 1 },
  recordLate: { fontSize: 11, color: COLORS.warning, fontWeight: '600', marginTop: 1 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusBadgeText: { fontSize: 11, fontWeight: '700' },
});
