import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { api } from '../../services/api';
import { COLORS } from '../../constants/colors';

export default function SurveillanceScreen({ navigation }: any) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ students: { total: 0, present: 0 }, staff: { total: 0, present: 0 }, visitors: { total: 0, inside: 0 } });
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [studentStats, staffStats, visitorStats] = await Promise.all([
        api.getTeacherCheckinStats(user?.schoolId || ''),
        api.getTeacherCheckinStats(user?.schoolId || ''),
        api.getVisitorStats(),
      ]);
      setStats({
        students: { total: studentStats.total, present: studentStats.present },
        staff: { total: staffStats.total, present: staffStats.present },
        visitors: visitorStats,
      });
    } catch (error) { console.error('[SurveillanceScreen] Error:', error); } finally { setLoading(false); }
  }, [user?.schoolId]);

  useEffect(() => { loadData(); }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} style={{ flex: 1 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.header}>
          <Text style={styles.title}>Surveillance</Text>
          <Text style={styles.subtitle}>Tableau de bord</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: '#EFF6FF' }]}>
            <Ionicons name="people" size={24} color="#3B82F6" />
            <Text style={styles.statValue}>{stats.students.present}/{stats.students.total}</Text>
            <Text style={styles.statLabel}>Élèves</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F0FDF4' }]}>
            <Ionicons name="person" size={24} color="#22C55E" />
            <Text style={styles.statValue}>{stats.staff.present}/{stats.staff.total}</Text>
            <Text style={styles.statLabel}>Personnel</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#F5F3FF' }]}>
            <Ionicons name="walk" size={24} color="#8B5CF6" />
            <Text style={styles.statValue}>{stats.visitors.inside}</Text>
            <Text style={styles.statLabel}>Visiteurs</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}
            onPress={() => navigation.navigate('QRScanner')}>
            <View style={[styles.actionIcon, { backgroundColor: '#3B82F6' }]}>
              <Ionicons name="qr-code" size={28} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Scanner QR Élève</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}
            onPress={() => navigation.navigate('StaffCheckin')}>
            <View style={[styles.actionIcon, { backgroundColor: '#22C55E' }]}>
              <Ionicons name="finger-print" size={28} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Pointage Personnel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}
            onPress={() => navigation.navigate('VisitorRegister')}>
            <View style={[styles.actionIcon, { backgroundColor: '#8B5CF6' }]}>
              <Ionicons name="walk" size={28} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Visiteurs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}
            onPress={() => navigation.navigate('QRBadge')}>
            <View style={[styles.actionIcon, { backgroundColor: '#F59E0B' }]}>
              <Ionicons name="card" size={28} color="#fff" />
            </View>
            <Text style={styles.actionLabel}>Mon Badge QR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 16 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  subtitle: { fontSize: 14, color: '#64748B' },
  statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: {
    flex: 1, borderRadius: 16, padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  statValue: { fontSize: 20, fontWeight: 'bold', color: '#1E293B', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 12 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: {
    width: '47%', backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  actionIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  actionLabel: { fontSize: 13, fontWeight: '500', color: '#1E293B', textAlign: 'center' },
});
