import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../context/AuthContext';
import { supabase, getUserSchoolId } from '../../services/supabase';

export default function SurveillantDashboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 0, presentToday: 0, absentToday: 0, lateToday: 0,
    attendanceRate: 0, visitorsInside: 0, totalVisitors: 0,
  });

  const loadStats = useCallback(async () => {
    try {
      const schoolId = await getUserSchoolId();
      if (!schoolId) return;
      const today = new Date().toISOString().split('T')[0];

      const [students, attendance, visitors] = await Promise.all([
        supabase.from('students').select('id', { count: 'exact', head: true }).eq('school_id', schoolId),
        supabase.from('attendance').select('status').eq('school_id', schoolId).eq('date', today),
        supabase.from('visitors').select('status').eq('school_id', schoolId).gte('entry_time', `${today}T00:00:00`),
      ]);

      const attData = attendance.data || [];
      const visData = visitors.data || [];
      const total = students.count || 0;
      const present = attData.filter((r: any) => r.status === 'PRESENT').length;
      const late = attData.filter((r: any) => r.status === 'LATE').length;

      setStats({
        totalStudents: total,
        presentToday: present,
        absentToday: total - present - late,
        lateToday: late,
        attendanceRate: total > 0 ? Math.round(((present + late) / total) * 100) : 0,
        visitorsInside: visData.filter((v: any) => v.status === 'INSIDE').length,
        totalVisitors: visData.length,
      });
    } catch (err) {
      console.error('Surveillant dashboard error:', err);
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  }, [loadStats]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Espace Surveillance</Text>
            <Text style={styles.userName}>{user?.name || 'Surveillant'}</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Attendance Card */}
        <View style={styles.attendanceCard}>
          <View style={styles.attendanceHeader}>
            <Text style={styles.attendanceRate}>{stats.attendanceRate}%</Text>
            <Text style={styles.attendanceLabel}>Présences aujourd'hui</Text>
          </View>
          <View style={styles.attendanceBar}>
            <View style={[styles.attendanceBarFill, { width: `${stats.attendanceRate}%` }]} />
          </View>
          <View style={styles.attendanceRow}>
            <View style={styles.attendanceStat}>
              <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
              <Text style={styles.attendanceStatValue}>{stats.presentToday}</Text>
              <Text style={styles.attendanceStatLabel}>Présents</Text>
            </View>
            <View style={styles.attendanceStat}>
              <Ionicons name="time" size={20} color="#FF9800" />
              <Text style={styles.attendanceStatValue}>{stats.lateToday}</Text>
              <Text style={styles.attendanceStatLabel}>Retards</Text>
            </View>
            <View style={styles.attendanceStat}>
              <Ionicons name="close-circle" size={20} color="#F44336" />
              <Text style={styles.attendanceStatValue}>{stats.absentToday}</Text>
              <Text style={styles.attendanceStatLabel}>Absents</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions rapides</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Surveillance')}>
              <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="scan-outline" size={28} color="#4CAF50" />
              </View>
              <Text style={styles.actionTitle}>Scanner QR</Text>
              <Text style={styles.actionHint}>Pointer un élève</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('VisitorRegister')}>
              <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="person-add" size={28} color="#2196F3" />
              </View>
              <Text style={styles.actionTitle}>Visiteurs</Text>
              <Text style={styles.actionHint}>Enregistrer un visiteur</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('AttendanceHistory')}>
              <View style={[styles.actionIcon, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="list" size={28} color="#FF9800" />
              </View>
              <Text style={styles.actionTitle}>Historique</Text>
              <Text style={styles.actionHint}>Voir les pointages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('PremiumQRScanner')}>
              <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
                <Ionicons name="camera" size={28} color="#9C27B0" />
              </View>
              <Text style={styles.actionTitle}>Scanner avancé</Text>
              <Text style={styles.actionHint}>Caméra intégrée</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Visitors */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visiteurs</Text>
          <View style={styles.visitorCard}>
            <View style={styles.visitorRow}>
              <View style={styles.visitorStat}>
                <Text style={styles.visitorValue}>{stats.visitorsInside}</Text>
                <Text style={styles.visitorLabel}>Présents dans l'établissement</Text>
              </View>
              <View style={styles.visitorStat}>
                <Text style={styles.visitorValue}>{stats.totalVisitors}</Text>
                <Text style={styles.visitorLabel}>Total aujourd'hui</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.visitorBtn} onPress={() => navigation.navigate('VisitorRegister')}>
              <Ionicons name="add-circle" size={20} color={COLORS.primary} />
              <Text style={styles.visitorBtnText}>Enregistrer un visiteur</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* My Check-in */}
        <TouchableOpacity style={styles.checkinCard} onPress={() => navigation.navigate('StaffCheckin')}>
          <Ionicons name="finger-print" size={28} color={COLORS.primary} />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.checkinTitle}>Mon pointage</Text>
            <Text style={styles.checkinHint}>Gérer mon pointage et mes pauses</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  greeting: { fontSize: 14, color: COLORS.textSecondary },
  userName: { fontSize: 22, fontWeight: '700', color: COLORS.text },
  notifBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.surfaceContainerLowest, justifyContent: 'center', alignItems: 'center' },
  attendanceCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: COLORS.border },
  attendanceHeader: { alignItems: 'center', marginBottom: 12 },
  attendanceRate: { fontSize: 40, fontWeight: '800', color: COLORS.primary },
  attendanceLabel: { fontSize: 13, color: COLORS.textSecondary },
  attendanceBar: { height: 8, backgroundColor: COLORS.border, borderRadius: 4, overflow: 'hidden', marginBottom: 16 },
  attendanceBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 4 },
  attendanceRow: { flexDirection: 'row', justifyContent: 'space-around' },
  attendanceStat: { alignItems: 'center', gap: 4 },
  attendanceStatValue: { fontSize: 20, fontWeight: '700', color: COLORS.text },
  attendanceStatLabel: { fontSize: 12, color: COLORS.textSecondary },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { width: '47%', backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 18, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  actionIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  actionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  actionHint: { fontSize: 11, color: COLORS.textSecondary, marginTop: 2 },
  visitorCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 18, borderWidth: 1, borderColor: COLORS.border },
  visitorRow: { flexDirection: 'row', gap: 20, marginBottom: 14 },
  visitorStat: { flex: 1 },
  visitorValue: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  visitorLabel: { fontSize: 12, color: COLORS.textSecondary },
  visitorBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 },
  visitorBtnText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  checkinCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  checkinTitle: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  checkinHint: { fontSize: 12, color: COLORS.textSecondary },
});
