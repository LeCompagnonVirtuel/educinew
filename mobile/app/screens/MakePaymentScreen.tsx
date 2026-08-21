import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';

const ALL_PROVIDERS = [
  { key: 'MONEY_FUSION', name: 'Money Fusion', color: '#4F46E5', category: 'Paiement en ligne' },
];

export default function MakePaymentScreen({ navigation, route }: any) {
  const { t } = useLanguage();
  const [selected, setSelected] = React.useState('MONEY_FUSION');
  const [amountIndex, setAmountIndex] = React.useState(1);
  const [customAmount, setCustomAmount] = React.useState('');
  const [useCustomAmount, setUseCustomAmount] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const invoiceId = route?.params?.invoiceId;
  const presetAmounts = ['5 000', '25 000', '50 000', '100 000'];
  const amountNum = useCustomAmount ? parseInt(customAmount.replace(/\s/g, ''), 10) || 0 : parseInt(presetAmounts[amountIndex].replace(/\s/g, ''), 10);
  const fee = Math.round(amountNum * 0.01);
  const total = amountNum + fee;

  const categories = [...new Set(ALL_PROVIDERS.map(p => p.category))];

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headerLabel}>Passerelle Sécurisée</Text>
          <Text style={styles.title}>Effectuer un Paiement</Text>
          <Text style={styles.subtitle}>Choisissez votre méthode et montant.</Text>
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Montant</Text>
          <View style={styles.amountInput}>
            <Text style={styles.currency}>CFA</Text>
            {useCustomAmount ? (
              <TextInput
                style={[styles.amountValue, { fontSize: 24, flex: 1 }]}
                value={customAmount}
                onChangeText={(text) => setCustomAmount(text.replace(/[^0-9]/g, ''))}
                placeholder="0"
                placeholderTextColor={COLORS.outline}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.amountValue}>{presetAmounts[amountIndex]}</Text>
            )}
          </View>
          <View style={styles.amountButtons}>
            {presetAmounts.map((amt, i) => (
              <TouchableOpacity key={i} style={[styles.amountBtn, !useCustomAmount && i === amountIndex && styles.amountBtnActive]} onPress={() => { setAmountIndex(i); setUseCustomAmount(false); }}>
                <Text style={[styles.amountBtnText, !useCustomAmount && i === amountIndex && styles.amountBtnTextActive]}>{amt}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={[styles.amountBtn, useCustomAmount && styles.amountBtnActive]} onPress={() => setUseCustomAmount(true)}>
              <Text style={[styles.amountBtnText, useCustomAmount && styles.amountBtnTextActive]}>Autre</Text>
            </TouchableOpacity>
          </View>
        </View>

        {categories.map((category) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>{category}</Text>
            <View style={styles.methodsGrid}>
              {ALL_PROVIDERS.filter(p => p.category === category).map((method) => (
                <TouchableOpacity
                  key={method.key}
                  style={[styles.methodCard, selected === method.key && styles.methodCardActive]}
                  onPress={() => setSelected(method.key)}
                >
                  <View style={[styles.methodDot, { backgroundColor: method.color }]} />
                  <Text style={styles.methodName}>{method.name}</Text>
                  {selected === method.key && (
                    <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} style={{ marginLeft: 'auto' }} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Résumé</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryText}>Montant</Text>
              <Text style={styles.summaryValue}>{amountNum.toLocaleString('fr-FR')} CFA</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryText}>Frais (1%)</Text>
              <Text style={[styles.summaryValue, { color: COLORS.secondary }]}>{fee.toLocaleString('fr-FR')} CFA</Text>
            </View>
            <View style={[styles.summaryItem, { borderTopWidth: 1, borderTopColor: COLORS.outlineVariant, paddingTop: 12, marginTop: 8 }]}>
              <Text style={styles.summaryTotal}>Total</Text>
              <Text style={styles.summaryTotalValue}>{total.toLocaleString('fr-FR')} CFA</Text>
            </View>
          </View>
          <View style={styles.secureCard}>
            <Ionicons name="lock-closed" size={24} color={COLORS.onPrimary} />
            <Text style={styles.secureTitle}>Paiement Chiffré</Text>
            <Text style={styles.secureText}>Protégé par SSL de grade bancaire</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.payButton, processing && { opacity: 0.7 }]}
          disabled={processing}
          onPress={async () => {
            if (!invoiceId) {
              Alert.alert('Erreur', 'Aucune facture sélectionnée.');
              return;
            }
            if (amountNum <= 0) {
              Alert.alert('Erreur', 'Veuillez saisir un montant valide.');
              return;
            }
            setProcessing(true);
            try {
              const result = await api.initiatePayment(invoiceId, selected);
              navigation.navigate('PaymentConfirmation', {
                reference: (result as any)?.reference,
                amount: total,
                method: selected,
                status: (result as any)?.status,
              });
            } catch (err: any) {
              Alert.alert('Erreur', err?.message || 'Échec de l\'initiation du paiement.');
            } finally {
              setProcessing(false);
            }
          }}
        >
          {processing ? (
            <ActivityIndicator color={COLORS.onPrimary} />
          ) : (
            <>
              <Ionicons name="flash" size={20} color={COLORS.onPrimary} />
              <Text style={styles.payButtonText}>Procéder au Paiement Sécurisé</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.helpText}>Having issues? <Text style={{ color: COLORS.primary, fontWeight: '700' }} onPress={() => { const { openWhatsApp } = require('../../constants/support'); openWhatsApp(); }}>Contact Support</Text></Text>

        <View style={{ height: 100 }} />
      </ScrollView>
      </KeyboardAvoidingView>
      <BottomTabBar activeTab="payments" onTabPress={(tab) => {
        const r: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
        navigation.navigate(r[tab] || 'Home');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backBtn: { padding: 20, paddingBottom: 0 },
  header: { paddingHorizontal: 20, marginBottom: 24 },
  headerLabel: { fontSize: 12, fontWeight: '700', color: COLORS.primary, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.onSurface },
  subtitle: { fontSize: 14, color: COLORS.onSurfaceVariant, marginTop: 4 },
  amountSection: { paddingHorizontal: 20, marginBottom: 24 },
  amountLabel: { fontSize: 13, fontWeight: '600', color: COLORS.onSurfaceVariant, marginBottom: 8 },
  amountInput: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'baseline', gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 12, elevation: 2 },
  currency: { fontSize: 16, fontWeight: '700', color: COLORS.onSurfaceVariant },
  amountValue: { fontSize: 32, fontWeight: '900', color: COLORS.primary },
  amountButtons: { flexDirection: 'row', gap: 8, marginTop: 12 },
  amountBtn: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 20, borderWidth: 1, borderColor: COLORS.outlineVariant },
  amountBtnActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  amountBtnText: { fontSize: 13, fontWeight: '600', color: COLORS.onSurface },
  amountBtnTextActive: { color: COLORS.onPrimary },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface, marginBottom: 12 },
  methodsGrid: { gap: 10 },
  methodCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 16, borderWidth: 2, borderColor: COLORS.outlineVariant },
  methodCardActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryFixed },
  methodDot: { width: 24, height: 24, borderRadius: 12 },
  methodName: { fontSize: 14, fontWeight: '600', color: COLORS.onSurface },
  summaryRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginBottom: 24 },
  summaryCard: { flex: 2, backgroundColor: COLORS.surfaceContainer, borderRadius: 20, padding: 16 },
  summaryLabel: { fontSize: 11, fontWeight: '700', color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryText: { fontSize: 13, color: COLORS.onSurfaceVariant },
  summaryValue: { fontSize: 13, fontWeight: '600', color: COLORS.onSurface },
  summaryTotal: { fontSize: 14, fontWeight: '700', color: COLORS.onSurface },
  summaryTotalValue: { fontSize: 18, fontWeight: '900', color: COLORS.primary },
  secureCard: { flex: 1, backgroundColor: COLORS.primary, borderRadius: 20, padding: 16, justifyContent: 'center' },
  secureTitle: { fontSize: 14, fontWeight: '700', color: COLORS.onPrimary, marginTop: 8 },
  secureText: { fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  payButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, backgroundColor: COLORS.primary, borderRadius: 16, paddingVertical: 16, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  payButtonText: { fontSize: 15, fontWeight: '700', color: COLORS.onPrimary },
  helpText: { fontSize: 13, color: COLORS.onSurfaceVariant, textAlign: 'center', marginTop: 20 },
});
