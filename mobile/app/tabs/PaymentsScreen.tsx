import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../constants/theme';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';
import { Card, Badge, Button, EmptyState, SkeletonCard, SkeletonList } from '../../components/ui';

export default function PaymentsScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (selectedChildId) {
      await loadChildData();
    } else {
      await loadChildren();
    }
    setRefreshing(false);
  }, [selectedChildId]);

  useEffect(() => {
    loadChildren();
  }, []);

  useEffect(() => {
    if (selectedChildId) loadChildData();
  }, [selectedChildId]);

  async function loadChildren() {
    try {
      const kids = await api.getParentChildren(user?.id || '');
      const kidsArray = Array.isArray(kids) ? kids : [];
      setChildren(kidsArray);
      if (kidsArray.length > 0) {
        setSelectedChildId(kidsArray[0].id || kidsArray[0].studentId);
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  async function loadChildData() {
    if (!selectedChildId) return;
    setLoading(true);
    try {
      const [invoiceData, historyData] = await Promise.allSettled([
        api.getInvoices(selectedChildId),
        api.getPaymentHistory(),
      ]);

      const inv = invoiceData.status === 'fulfilled' ? (invoiceData.value || []) : [];
      setInvoices(Array.isArray(inv) ? inv : []);

      const hist = historyData.status === 'fulfilled' ? historyData.value : null;
      const childPayments = (hist?.payments || []).filter((p: any) =>
        p.studentId === selectedChildId || p.student?.id === selectedChildId
      );
      setPayments(childPayments);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }

  const totalAnnual = invoices.reduce((sum: number, inv: any) => sum + (inv.amount || 0), 0);
  const totalPaid = invoices.reduce((sum: number, inv: any) => sum + (inv.paidAmount || 0), 0);
  const totalOutstanding = invoices.reduce((sum: number, inv: any) => sum + ((inv.finalAmount || inv.amount || 0) - (inv.paidAmount || 0)), 0);
  const unpaidInvoices = invoices.filter((inv: any) => inv.status !== 'PAID' && inv.status !== 'CANCELLED');

  const handlePayInvoice = (invoice: any) => {
    navigation.navigate('MakePayment', { invoiceId: invoice.id });
  };

  const selectedChild = children.find(c => (c.id || c.studentId) === selectedChildId);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        >
          <View style={styles.header}>
            <View style={{ width: 120, height: SPACING.md, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: BORDER_RADIUS.sm }} />
            <View style={{ width: 180, height: SPACING.xl, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: BORDER_RADIUS.sm, marginTop: SPACING.xs }} />
          </View>
          <SkeletonCard />
          <View style={{ height: SPACING.lg }} />
          <SkeletonList count={3} />
          <View style={{ height: 100 }} />
        </ScrollView>
        <BottomTabBar activeTab="payments" onTabPress={(tab) => {
          const r: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
          navigation.navigate(r[tab] || 'Home');
        }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
      >
        <View style={styles.header}>
          <Text style={styles.label}>FRAIS SCOLAIRES</Text>
          <Text style={styles.title}>{t('payments.title')}</Text>
        </View>

        {children.length > 1 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: SPACING.xl, marginBottom: SPACING.lg }}>
            {children.map((child: any) => {
              const cid = child.id || child.studentId;
              const isSelected = cid === selectedChildId;
              return (
                <TouchableOpacity
                  key={cid}
                  onPress={() => setSelectedChildId(cid)}
                  style={[styles.childTab, isSelected && styles.childTabActive]}
                >
                  <Ionicons name="person" size={FONT_SIZES.xs} color={isSelected ? '#fff' : COLORS.onSurfaceVariant} />
                  <Text style={[styles.childTabText, isSelected && { color: '#fff' }]}>{child.name || child.user?.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {loading ? (
          <View style={{ padding: SPACING.xxxl, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : !selectedChildId ? (
          <View style={{ padding: SPACING.xxxl, alignItems: 'center' }}>
            <Ionicons name="people" size={48} color={COLORS.onSurfaceVariant} />
            <Text style={{ color: COLORS.onSurfaceVariant, marginTop: SPACING.md }}>Aucun enfant associé</Text>
          </View>
        ) : (
          <>
            <Card variant="default" padding="md" onPress={() => {
              if (unpaidInvoices.length > 0) handlePayInvoice(unpaidInvoices[0]);
            }} style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Solde restant — {selectedChild?.name || ''}</Text>
              <Text style={styles.balanceValue}>{totalOutstanding.toLocaleString()} FCFA</Text>
              {unpaidInvoices.length > 0 && (
                <Button variant="primary" size="sm" title={t('payments.payNow')} style={styles.payBtn} onPress={() => handlePayInvoice(unpaidInvoices[0])} />
              )}
            </Card>

            <View style={styles.statsRow}>
              {[
                { l: 'Total annuel', v: `${(totalAnnual / 1000).toFixed(0)}k`, c: COLORS.onSurface },
                { l: 'Payé', v: `${(totalPaid / 1000).toFixed(0)}k`, c: COLORS.success },
                { l: 'Reste', v: `${(totalOutstanding / 1000).toFixed(0)}k`, c: COLORS.error },
              ].map((s, i) => (
                <View key={i} style={styles.statCard}>
                  <Text style={[styles.statVal, { color: s.c }]}>{s.v}</Text>
                  <Text style={styles.statLabel}>{s.l}</Text>
                </View>
              ))}
            </View>

            {invoices.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>{t('payments.invoices') || 'Factures'}</Text>
                {invoices.map((inv: any) => {
                  const remaining = (inv.finalAmount || inv.amount || 0) - (inv.paidAmount || 0);
                  const isPaid = inv.status === 'PAID';
                  const isOverdue = inv.status === 'OVERDUE';
                  return (
                    <Card
                      key={inv.id}
                      variant="default"
                      padding="md"
                      onPress={() => !isPaid && remaining > 0 && handlePayInvoice(inv)}
                      style={styles.paymentRow}
                    >
                      <View style={styles.paymentIcon}>
                        <Ionicons name={isPaid ? 'checkmark-circle' : 'document-text-outline'} size={FONT_SIZES.lg} color={isPaid ? COLORS.success : COLORS.warning} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.payDesc}>{inv.feeCategory?.name || inv.type || 'Frais'}</Text>
                        <Badge
                          label={isPaid ? t('payments.paid') : isOverdue ? t('payments.overdue') : t('payments.pending')}
                          variant={isPaid ? 'success' : isOverdue ? 'error' : 'warning'}
                          dot
                          pulse={!isPaid}
                        />
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.payAmount}>{(inv.finalAmount || inv.amount || 0).toLocaleString()} FCFA</Text>
                        {!isPaid && remaining > 0 && (
                          <Button variant="ghost" size="sm" title={`${t('payments.payNow')} →`} onPress={() => handlePayInvoice(inv)} />
                        )}
                      </View>
                    </Card>
                  );
                })}
              </>
            )}

            {payments.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>{t('payments.history') || 'Historique'}</Text>
                {payments.map((p: any) => (
                  <View key={p.id} style={styles.paymentRow}>
                    <View style={styles.paymentIcon}>
                      <Ionicons name={p.status === 'COMPLETED' ? 'checkmark-circle' : 'time-outline'} size={FONT_SIZES.lg} color={p.status === 'COMPLETED' ? COLORS.success : COLORS.warning} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.payDesc}>{p.invoice?.type || p.paymentMethod || 'Paiement'}</Text>
                      <Badge
                        label={p.status === 'COMPLETED' ? t('payments.paid') : t('payments.pending')}
                        variant={p.status === 'COMPLETED' ? 'success' : 'warning'}
                        dot
                        pulse={p.status !== 'COMPLETED'}
                      />
                    </View>
                    <Text style={styles.payAmount}>{(p.amount || 0).toLocaleString()} FCFA</Text>
                  </View>
                ))}
              </>
            )}

            {invoices.length === 0 && payments.length === 0 && (
              <EmptyState
                icon="receipt-outline"
                title={t('payments.noPayments') || 'Aucun paiement'}
                subtitle={t('payments.noPaymentsSubtitle') || 'Pas de paiements en cours'}
              />
            )}
          </>
        )}
        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomTabBar activeTab="payments" onTabPress={(tab) => {
        const r: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
        navigation.navigate(r[tab] || 'Home');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.xl, paddingTop: SPACING.md, paddingBottom: SPACING.sm + SPACING.xs },
  label: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: FONT_SIZES.xxxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface, marginTop: SPACING.xs },
  childTab: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm + SPACING.xs, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surfaceContainerLowest, marginRight: SPACING.sm, borderWidth: 1, borderColor: COLORS.outline },
  childTabActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  childTabText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant },
  balanceCard: { marginHorizontal: SPACING.xl, backgroundColor: COLORS.primaryContainer, borderRadius: BORDER_RADIUS.xxl, marginBottom: SPACING.lg, overflow: 'hidden' },
  balanceLabel: { fontSize: FONT_SIZES.sm, color: 'rgba(255,255,255,0.7)' },
  balanceValue: { fontSize: FONT_SIZES.xxxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onPrimary, marginTop: SPACING.xs },
  payBtn: { marginTop: SPACING.md, alignSelf: 'flex-start' },
  statsRow: { flexDirection: 'row', paddingHorizontal: SPACING.xl, gap: SPACING.sm + SPACING.xs, marginBottom: SPACING.lg },
  statCard: { flex: 1, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: BORDER_RADIUS.lg, padding: SPACING.lg, alignItems: 'center' },
  statVal: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.extrabold },
  statLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, fontWeight: FONT_WEIGHTS.medium, marginTop: SPACING.xs },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface, paddingHorizontal: SPACING.xl, marginBottom: SPACING.md },
  paymentRow: { marginHorizontal: SPACING.xl, marginBottom: SPACING.sm },
  paymentIcon: { width: 40, height: 40, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.surfaceContainerLow, justifyContent: 'center', alignItems: 'center' },
  payDesc: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  payAmount: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
});
