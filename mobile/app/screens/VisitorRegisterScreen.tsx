import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TextInput, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../../services/api';
import { COLORS, withAlpha } from '../../constants/colors';
import { useLanguage } from '../context/LanguageContext';
import { Card, Button, EmptyState, SkeletonList } from '../../components/ui';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../constants/theme';

export default function VisitorRegisterScreen({ navigation }: any) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [form, setForm] = useState({
    visitorName: '', visitorPhone: '', purpose: '', personToVisit: '', personRole: '',
  });

  const loadVisitors = useCallback(async () => {
    try {
      const data = await api.getActiveVisitors();
      setVisitors(data);
    } catch (error) { console.error('[VisitorRegisterScreen] Error loading visitors:', error); } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadVisitors(); }, [loadVisitors]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadVisitors();
    setRefreshing(false);
  }, [loadVisitors]);

  const handleRegister = async () => {
    if (!form.visitorName || !form.purpose || !form.personToVisit) {
      Alert.alert(t('common.error'), t('visitorRegister.requiredError'));
      return;
    }
    setSaving(true);
    try {
      await api.registerVisitor(form);
      setForm({ visitorName: '', visitorPhone: '', purpose: '', personToVisit: '', personRole: '' });
      setShowForm(false);
      loadVisitors();
      Alert.alert(t('common.success'), t('visitorRegister.registerSuccess'));
    } catch (err: any) {
      Alert.alert(t('common.error'), err.message);
    } finally { setSaving(false); }
  };

  const handleCheckout = async (id: string) => {
    Alert.alert(t('visitorRegister.checkoutTitle'), t('visitorRegister.checkoutMessage'), [
      { text: t('visitorRegister.cancel'), style: 'cancel' },
      { text: t('visitorRegister.confirm'), onPress: async () => {
        try {
          await api.checkoutVisitor(id);
          loadVisitors();
        } catch (err: any) { Alert.alert(t('common.error'), err.message); }
      }},
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <SkeletonList count={4} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
            <Text style={styles.title}>{t('visitorRegister.title')}</Text>
            <Ionicons name={showForm ? 'close' : 'add-circle'} size={28} color={COLORS.primary} />
          </View>
          <Text style={styles.subtitle}>{visitors.length} {t('visitorRegister.subtitle')}</Text>
        </View>

        {/* Registration Form */}
        {showForm && (
          <Card variant="elevated" style={styles.formCard}>
            <Text style={styles.formTitle}>{t('visitorRegister.formTitle')}</Text>
            <TextInput style={styles.input} placeholder={t('visitorRegister.visitorName')} value={form.visitorName}
              onChangeText={v => setForm({ ...form, visitorName: v })} />
            <TextInput style={styles.input} placeholder={t('visitorRegister.phone')} value={form.visitorPhone}
              onChangeText={v => setForm({ ...form, visitorPhone: v })} keyboardType="phone-pad" />
            <TextInput style={styles.input} placeholder={t('visitorRegister.purpose')} value={form.purpose}
              onChangeText={v => setForm({ ...form, purpose: v })} />
            <TextInput style={styles.input} placeholder={t('visitorRegister.personToVisit')} value={form.personToVisit}
              onChangeText={v => setForm({ ...form, personToVisit: v })} />
            <TextInput style={styles.input} placeholder={t('visitorRegister.personRole')} value={form.personRole}
              onChangeText={v => setForm({ ...form, personRole: v })} />
            <Button
              title={t('visitorRegister.register')}
              variant="primary"
              size="lg"
              onPress={handleRegister}
              loading={saving}
              fullWidth
            />
          </Card>
        )}

        {/* Visitors List */}
        {visitors.length === 0 ? (
          <EmptyState
            title={t('visitorRegister.empty')}
            icon={<Ionicons name="people-outline" size={48} color={COLORS.outlineVariant} />}
          />
        ) : (
          visitors.map(v => (
            <Card key={v.id} variant="default" padding="md" style={styles.visitorCard}>
              <View style={styles.visitorRow}>
                <View style={styles.visitorAvatar}>
                  <Ionicons name="person" size={20} color={COLORS.white} />
                </View>
                <View style={styles.visitorInfo}>
                  <Text style={styles.visitorName}>{v.visitor_name}</Text>
                  <Text style={styles.visitorDetail}>{v.purpose} — {v.person_to_visit}</Text>
                  <Text style={styles.visitorTime}>
                    {new Date(v.entry_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
                <Button
                  title=""
                  variant="ghost"
                  size="sm"
                  onPress={() => handleCheckout(v.id)}
                  iconRight={<Ionicons name="log-out" size={20} color={COLORS.error} />}
                />
              </View>
            </Card>
          ))
        )}
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: SPACING.lg },
  header: { marginBottom: SPACING.xl },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  subtitle: { fontSize: FONT_SIZES.md, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },
  formCard: { marginBottom: SPACING.lg },
  formTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface, marginBottom: SPACING.md },
  input: {
    borderWidth: 1, borderColor: COLORS.border, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md,
    fontSize: FONT_SIZES.md, color: COLORS.onSurface, marginBottom: SPACING.md - 2, backgroundColor: COLORS.surfaceContainerLow,
  },
  visitorCard: { marginBottom: SPACING.sm },
  visitorRow: { flexDirection: 'row', alignItems: 'center' },
  visitorAvatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md,
  },
  visitorInfo: { flex: 1 },
  visitorName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  visitorDetail: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant, marginTop: 2 },
  visitorTime: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
});
