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

export default function ComptableDashboardScreen({ navigation }: any) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalPayments: 0, todayPayments: 0, pendingPayments: 0,
    totalAmount: 0, todayAmount: 0, invoiceCount: 0,
  });

  const loadStats = useCallback(async () => {
    try {
      const schoolId = await getUserSchoolId();
      if (!schoolId) return;
      const today = new Date().toISOString().split('T')[0];

      const [payments, todayPay] = await Promise.all([
        supabase.from('payments').select('amount, status').eq('school_id', schoolId),
        supabase.from('payments').select('amount').eq('school_id', schoolId).eq('date', today),
      ]);

      const pData = payments.data || [];
      const tData = todayPay.data || [];
      const total = pData.reduce((s: number, p: any) => s + (p.amount || 0), 0);
      const todayTotal = tData.reduce((s: number, p: any) => s + (p.amount || 0), 0);

      setStats({
        totalPayments: pData.length,
        todayPayments: tData.length,
        pendingPayments: pData.filter((p: any) => p.status === 'PENDING').length,
        totalAmount: total,
        todayAmount: todayTotal,
        invoiceCount: 0,
      });
    } catch (err) {
      console.error('Comptable dashboard error:', err);
    }
  }, []);

  useEffect(() => { loadStats(); }, [loadStats]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  }, [loadStats]);

  const formatAmount = (n: number) => n.toLocaleString('fr-FR');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Espace Comptable</Text>
            <Text style={styles.userName}>{user?.name || 'Comptable'}</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn} onPress={() => navigation.navigate('Notifications')}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        {/* Revenue Card */}
        <View style={styles.revenueCard}>
          <Text style={styles.revenueLabel}>Recettes totales</Text>
          <Text style={styles.revenueAmount}>{formatAmount(stats.totalAmount)} FCFA</Text>
          <View style={styles.revenueRow}>
            <View style={styles.revenueStat}>
              <Text style={styles.revenueStatValue}>{formatAmount(stats.todayAmount)}</Text>
              <Text style={styles.revenueStatLabel}>Aujourd'hui</Text>
            </View>
            <View style={styles.revenueDivider} />
            <View style={styles.revenueStat}>
              <Text style={styles.revenueStatValue}>{stats.todayPayments}</Text>
              <Text style={styles.revenueStatLabel}>Transactions</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vue d'ensemble</Text>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="wallet" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>{stats.totalPayments}</Text>
              <Text style={styles.statLabel}>Paiements</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="time" size={24} color="#FF9800" />
              <Text style={styles.statValue}>{stats.pendingPayments}</Text>
              <Text style={styles.statLabel}>En attente</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="document-text" size={24} color="#2196F3" />
              <Text style={styles.statValue}>{stats.invoiceCount}</Text>
              <Text style={styles.statLabel}>Factures</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Payments')}>
              <View style={[styles.actionIcon, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="list" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.actionLabel}>Paiements</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('MakePayment')}>
              <View style={[styles.actionIcon, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="add-circle" size={24} color="#2196F3" />
              </View>
              <Text style={styles.actionLabel}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Messages')}>
              <View style={[styles.actionIcon, { backgroundColor: '#F3E5F5' }]}>
                <Ionicons name="chatbubble" size={24} color="#9C27B0" />
              </View>
              <Text style={styles.actionLabel}>Messages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard} onPress={() => navigation.navigate('Settings')}>
              <View style={[styles.actionIcon, { backgroundColor: '#ECEFF1' }]}>
                <Ionicons name="settings" size={24} color="#607D8B" />
              </View>
              <Text style={styles.actionLabel}>Paramètres</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Check-in */}
        <TouchableOpacity style={styles.checkinCard} onPress={() => navigation.navigate('PremiumCheckIn')}>
          <Ionicons name="finger-print" size={28} color={COLORS.primary} />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.checkinTitle}>Mon pointage</Text>
            <Text style={styles.checkinHint}>Pointer votre présence</Text>
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
  revenueCard: { backgroundColor: COLORS.primary, borderRadius: 20, padding: 24, marginBottom: 20 },
  revenueLabel: { fontSize: 14, color: 'rgba(255,255,255,0.7)' },
  revenueAmount: { fontSize: 32, fontWeight: '800', color: '#fff', marginTop: 4 },
  revenueRow: { flexDirection: 'row', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)' },
  revenueStat: { flex: 1, alignItems: 'center' },
  revenueStatValue: { fontSize: 18, fontWeight: '700', color: '#fff' },
  revenueStatLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  revenueDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 14, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  statValue: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginTop: 8 },
  statLabel: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { width: '47%', backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  actionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  actionLabel: { fontSize: 14, fontWeight: '600', color: COLORS.text },
  checkinCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  checkinTitle: { fontSize: 15, fontWeight: '600', color: COLORS.text },
  checkinHint: { fontSize: 12, color: COLORS.textSecondary },
});
