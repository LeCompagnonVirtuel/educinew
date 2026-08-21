import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { api } from '../../services/api';
import { supabase } from '../../services/supabase';

export default function PaymentConfirmationScreen({ navigation, route }: any) {
  const { reference, amount, method, status } = route?.params || {};
  const [receipt, setReceipt] = useState<any>(null);
  const [loadingReceipt, setLoadingReceipt] = useState(false);
  const isCompleted = status === 'COMPLETED' || status === 'completed';

  useEffect(() => {
    if (reference) loadReceipt();
  }, [reference]);

  async function loadReceipt() {
    setLoadingReceipt(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const schoolId = user?.user_metadata?.school_id;
      const payments = await api.getPayments({ schoolId });
      const payment = Array.isArray(payments)
        ? payments.find((p: any) => p.reference === reference)
        : null;
      if (payment?.id) {
        const r = await api.getReceipt(payment.id);
        setReceipt(r);
      }
    } catch (error) {
      console.error('[PaymentConfirmationScreen] Error loading receipt:', error);
    } finally {
      setLoadingReceipt(false);
    }
  }

  const formatMethod = (m: string) => {
    const map: Record<string, string> = {
      'orange': 'Orange Money', 'ORANGE_MONEY': 'Orange Money',
      'mtn': 'MTN MoMo', 'MTN_MONEY': 'MTN MoMo',
      'wave': 'Wave', 'WAVE': 'Wave',
    };
    return map[m] || m || '—';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Payments')}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>

        {/* Status icon */}
        <View style={styles.statusIcon}>
          <Ionicons
            name={isCompleted ? 'checkmark-circle' : 'time-outline'}
            size={64}
            color={isCompleted ? COLORS.success : COLORS.warning}
          />
        </View>

        <Text style={styles.title}>
          {isCompleted ? 'Paiement réussi !' : 'Paiement en cours'}
        </Text>
        <Text style={styles.subtitle}>
          {isCompleted
            ? 'Votre paiement a été confirmé.'
            : 'Votre paiement est en cours de traitement.'}
        </Text>

        {/* Receipt card */}
        <View style={styles.receiptCard}>
          {receipt?.school?.logoUrl && (
            <Text style={styles.schoolName}>{receipt.school.name}</Text>
          )}

          <View style={styles.receiptHeader}>
            <Text style={styles.receiptTitle}>Reçu de paiement</Text>
            {receipt?.receiptNumber && (
              <Text style={styles.receiptNumber}>{receipt.receiptNumber}</Text>
            )}
          </View>

          <View style={styles.divider} />

          {[
            { label: 'Date', value: receipt?.date ? new Date(receipt.date).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR') },
            { label: 'Élève', value: receipt?.student?.name || '—' },
            { label: 'Classe', value: receipt?.student?.class || '—' },
            { label: 'Catégorie', value: receipt?.invoice?.category || receipt?.invoice?.type || '—' },
            { label: 'Montant', value: `${(receipt?.amount || amount || 0).toLocaleString()} FCFA`, bold: true },
            { label: 'Méthode', value: formatMethod(receipt?.method || method || '') },
            { label: 'Référence', value: receipt?.reference || reference || '—', mono: true },
          ].map((item, i) => (
            <View key={i} style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>{item.label}</Text>
              <Text style={[styles.receiptValue, item.bold && { fontWeight: '800', color: COLORS.primary }, item.mono && { fontFamily: 'monospace', fontSize: 11 }]}>
                {item.value}
              </Text>
            </View>
          ))}

          {loadingReceipt && (
            <ActivityIndicator size="small" color={COLORS.primary} style={{ marginTop: 12 }} />
          )}
        </View>

        {/* Actions */}
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={() => Alert.alert('Reçu', 'Le reçu PDF sera disponible dans la prochaine mise à jour.')}
        >
          <Ionicons name="download-outline" size={20} color={COLORS.onPrimary} />
          <Text style={styles.downloadBtnText}>Télécharger le reçu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueBtn}
          onPress={() => navigation.navigate('Payments')}
        >
          <Text style={styles.continueBtnText}>Retour aux paiements</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backBtn: { marginBottom: 16 },
  statusIcon: { alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.onSurface, textAlign: 'center' },
  subtitle: { fontSize: 14, color: COLORS.onSurfaceVariant, textAlign: 'center', marginTop: 4, marginBottom: 24 },
  receiptCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 20, padding: 20, marginBottom: 20 },
  schoolName: { fontSize: 16, fontWeight: '700', color: COLORS.onSurface, textAlign: 'center', marginBottom: 12 },
  receiptHeader: { alignItems: 'center', marginBottom: 12 },
  receiptTitle: { fontSize: 14, fontWeight: '700', color: COLORS.onSurfaceVariant },
  receiptNumber: { fontSize: 11, fontFamily: 'monospace', color: COLORS.onSurfaceVariant, marginTop: 4 },
  divider: { height: 1, backgroundColor: COLORS.outlineVariant, marginVertical: 12 },
  receiptRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  receiptLabel: { fontSize: 13, color: COLORS.onSurfaceVariant },
  receiptValue: { fontSize: 13, fontWeight: '600', color: COLORS.onSurface },
  downloadBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.primary, borderRadius: 14, paddingVertical: 14, marginBottom: 12 },
  downloadBtnText: { fontSize: 14, fontWeight: '700', color: COLORS.onPrimary },
  continueBtn: { alignItems: 'center', paddingVertical: 14 },
  continueBtnText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
});
