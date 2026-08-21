import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { useChild } from '../context/ChildContext';
import { api } from '../../services/api';
import ChildSelector from '../../components/ChildSelector';

interface ScheduleSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  teacherName: string;
  room?: string;
}

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

export default function ParentScheduleScreen({ navigation }: any) {
  const { selectedChild } = useChild();
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([]);
  const [selectedDay, setSelectedDay] = useState(() => {
    const today = new Date().getDay();
    return today >= 1 && today <= 6 ? DAYS[today - 1] : DAYS[0];
  });
  const [loading, setLoading] = useState(true);

  const loadSchedule = useCallback(async () => {
    if (!selectedChild) return;
    try {
      const data = await api.getChildSchedule(selectedChild.id);
      setSchedule(data || []);
    } catch (err) {
      console.error('[ParentSchedule]', err);
    } finally {
      setLoading(false);
    }
  }, [selectedChild?.id]);

  useEffect(() => { setLoading(true); loadSchedule(); }, [loadSchedule]);

  const daySlots = schedule
    .filter((s) => s.day === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const getSubjectColor = (subject: string) => {
    const colors = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899'];
    let hash = 0;
    for (let i = 0; i < subject.length; i++) hash = subject.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emploi du temps</Text>
        <View style={{ width: 24 }} />
      </View>

      <ChildSelector />

      {/* Day Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayTabs} contentContainerStyle={styles.dayTabsContent}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayTab, selectedDay === day && styles.dayTabActive]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayTabText, selectedDay === day && styles.dayTabTextActive]}>
              {day.slice(0, 3)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {daySlots.length === 0 ? (
            <View style={styles.emptyBox}>
              <Ionicons name="calendar-clear-outline" size={40} color={COLORS.outlineVariant} />
              <Text style={styles.emptyText}>Pas de cours {selectedDay.toLowerCase()}</Text>
            </View>
          ) : (
            daySlots.map((slot) => {
              const color = getSubjectColor(slot.subject);
              return (
                <View key={slot.id} style={styles.slotCard}>
                  <View style={[styles.slotBar, { backgroundColor: color }]} />
                  <View style={styles.slotTime}>
                    <Text style={styles.slotStart}>{slot.startTime}</Text>
                    <Text style={styles.slotEnd}>{slot.endTime}</Text>
                  </View>
                  <View style={styles.slotInfo}>
                    <Text style={styles.slotSubject}>{slot.subject}</Text>
                    <View style={styles.slotMeta}>
                      <Ionicons name="person-outline" size={12} color={COLORS.onSurfaceVariant} />
                      <Text style={styles.slotTeacher}>{slot.teacherName}</Text>
                    </View>
                    {slot.room && (
                      <View style={styles.slotMeta}>
                        <Ionicons name="location-outline" size={12} color={COLORS.onSurfaceVariant} />
                        <Text style={styles.slotRoom}>{slot.room}</Text>
                      </View>
                    )}
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
  dayTabs: { maxHeight: 50, marginBottom: 12 },
  dayTabsContent: { paddingHorizontal: 16, gap: 8 },
  dayTab: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, backgroundColor: COLORS.surfaceContainerLow },
  dayTabActive: { backgroundColor: COLORS.primary },
  dayTabText: { fontSize: 13, fontWeight: '600', color: COLORS.onSurfaceVariant },
  dayTabTextActive: { color: COLORS.onPrimary },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },
  emptyBox: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.onSurfaceVariant },
  slotCard: {
    flexDirection: 'row', alignItems: 'stretch',
    backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 14,
    marginBottom: 10, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  slotBar: { width: 4 },
  slotTime: { padding: 14, justifyContent: 'center', alignItems: 'center', width: 65 },
  slotStart: { fontSize: 13, fontWeight: '700', color: COLORS.onSurface },
  slotEnd: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 2 },
  slotInfo: { flex: 1, padding: 14, justifyContent: 'center' },
  slotSubject: { fontSize: 14, fontWeight: '700', color: COLORS.onSurface, marginBottom: 4 },
  slotMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  slotTeacher: { fontSize: 11, color: COLORS.onSurfaceVariant },
  slotRoom: { fontSize: 11, color: COLORS.onSurfaceVariant },
});
