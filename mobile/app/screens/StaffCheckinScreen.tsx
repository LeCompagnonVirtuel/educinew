import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useAuth } from '../context/AuthContext';
import { api } from '../../services/api';
import { COLORS } from '../../constants/colors';
import {
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
  SEMANTIC_COLORS,
} from '../../constants/theme';
import { Card, Badge, Button } from '../../components/ui';
import { useLanguage } from '../context/LanguageContext';

export default function StaffCheckinScreen({ navigation }: any) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const loadRecord = useCallback(async () => {
    try {
      const data = await api.getStaffTodayRecord();
      setRecord(data);
    } catch (error) { console.error('[StaffCheckinScreen] Error loading record:', error); }
  }, []);

  useEffect(() => { loadRecord(); }, [loadRecord]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadRecord();
    setRefreshing(false);
  }, [loadRecord]);

  const handleCheckIn = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Erreur', t('staffCheckin.locationRequired'));
        setLoading(false);
        return;
      }
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const result = await api.staffCheckIn(record?.staff_id || '', 'GPS', location.coords.latitude, location.coords.longitude);
      if ((result as any)?.success !== false) {
        setMessage(t('staffCheckin.arrivalSaved'));
        loadRecord();
      }
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Erreur lors du pointage');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      await api.staffCheckOut(record?.staff_id || '');
      setMessage(t('staffCheckin.departureSaved'));
      loadRecord();
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBreakStart = async () => {
    setLoading(true);
    try {
      await api.staffStartBreak(record?.staff_id || '');
      setMessage(t('staffCheckin.breakStarted'));
      loadRecord();
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBreakEnd = async () => {
    setLoading(true);
    try {
      await api.staffEndBreak(record?.staff_id || '');
      setMessage(t('staffCheckin.breakEnded'));
      loadRecord();
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (): 'success' | 'warning' | 'error' | 'info' | 'neutral' => {
    switch (record?.status) {
      case 'PRESENT': return 'success';
      case 'LATE': return 'warning';
      case 'DEPARTED': return 'neutral';
      case 'ON_BREAK': return 'info';
      default: return 'error';
    }
  };

  const getStatusLabel = () => {
    switch (record?.status) {
      case 'PRESENT': return t('attendance_mark.present');
      case 'LATE': return t('attendance_mark.late');
      case 'DEPARTED': return t('staffCheckin.serviceDone');
      case 'ON_BREAK': return t('staffCheckin.onBreak');
      default: return t('staffCheckin.notCheckedIn');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{t('common.goodMorning')}, {user?.name?.split(' ')[0]}</Text>
          <Text style={styles.date}>
            {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </Text>
          <Text style={styles.time}>
            {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </Text>
        </View>

        {/* Status Card */}
        <Card variant="elevated" padding="lg" style={styles.statusCard}>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>{t('staffCheckin.myStatus')}</Text>
            <Badge
              label={getStatusLabel()}
              variant={getStatusVariant()}
              dot
              size="md"
            />
            {record?.check_in_time && (
              <Text style={styles.timeInfo}>
                Arrivée: {new Date(record.check_in_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )}
            {record?.check_out_time && (
              <Text style={styles.timeInfo}>
                Départ: {new Date(record.check_out_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )}
          </View>
        </Card>

        {/* Message */}
        {message ? (
          <View style={styles.messageBox}>
            <Ionicons name="checkmark-circle" size={FONT_SIZES.lg} color={SEMANTIC_COLORS.success.main} />
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}

        {/* Action Buttons */}
        <View style={styles.actions}>
          {!record?.check_in_time ? (
            <Button
              title={t('staffCheckin.checkIn')}
              variant="primary"
              fullWidth
              loading={loading}
              onPress={handleCheckIn}
              iconLeft={<Ionicons name="log-in" size={FONT_SIZES.lg} color={COLORS.white} />}
            />
          ) : (
            <>
              {!record?.check_out_time && (
                <>
                  {record?.status !== 'ON_BREAK' ? (
                    <Button
                      title={t('staffCheckin.startBreak')}
                      variant="secondary"
                      fullWidth
                      loading={loading}
                      onPress={handleBreakStart}
                      iconLeft={<Ionicons name="pause" size={FONT_SIZES.lg} color={COLORS.white} />}
                    />
                  ) : (
                    <Button
                      title={t('staffCheckin.resumeService')}
                      variant="secondary"
                      fullWidth
                      loading={loading}
                      onPress={handleBreakEnd}
                      iconLeft={<Ionicons name="play" size={FONT_SIZES.lg} color={COLORS.white} />}
                    />
                  )}
                  <Button
                    title={t('staffCheckin.checkOut')}
                    variant="danger"
                    fullWidth
                    loading={loading}
                    onPress={handleCheckOut}
                    iconLeft={<Ionicons name="log-out" size={FONT_SIZES.lg} color={COLORS.white} />}
                  />
                </>
              )}
            </>
          )}
        </View>

        {/* Info Cards */}
        <View style={styles.infoGrid}>
          <Card variant="default" padding="md" style={styles.infoCard}>
            <Ionicons name="time" size={FONT_SIZES.lg} color={COLORS.primary} />
            <Text style={styles.infoLabel}>{t('staffCheckin.schedule')}</Text>
            <Text style={styles.infoValue}>08:00 - 17:00</Text>
          </Card>
          <Card variant="default" padding="md" style={styles.infoCard}>
            <Ionicons name="location" size={FONT_SIZES.lg} color={COLORS.primary} />
            <Text style={styles.infoLabel}>{t('staffCheckin.gpsRadius')}</Text>
            <Text style={styles.infoValue}>100m</Text>
          </Card>
          <Card variant="default" padding="md" style={styles.infoCard}>
            <Ionicons name="navigate" size={FONT_SIZES.lg} color={COLORS.primary} />
            <Text style={styles.infoLabel}>{t('staffCheckin.method')}</Text>
            <Text style={styles.infoValue}>GPS</Text>
          </Card>
        </View>

        {/* History */}
        <Card variant="default" padding="md" style={styles.historySection}>
          <Text style={styles.sectionTitle}>{t('staffCheckin.recentHistory')}</Text>
          {(!record) ? (
            <Text style={styles.emptyText}>{t('staffCheckin.noHistory')}</Text>
          ) : (
            <View style={styles.historyItem}>
              <View style={styles.historyDot} />
              <View style={styles.historyInfo}>
                <Text style={styles.historyDate}>{getStatusLabel()}</Text>
                <Text style={styles.historyTime}>
                  {record.check_in_time ? new Date(record.check_in_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                  {' → '}
                  {record.check_out_time ? new Date(record.check_out_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                </Text>
              </View>
            </View>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: SPACING.lg },
  header: { marginBottom: SPACING.xl },
  greeting: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  date: { fontSize: FONT_SIZES.sm + 1, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },
  time: { fontSize: FONT_SIZES.xxxl, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary, marginTop: SPACING.xs },
  statusCard: {
    marginBottom: SPACING.lg,
  },
  statusInfo: { flex: 1 },
  statusLabel: { fontSize: FONT_SIZES.xs + 1, color: COLORS.onSurfaceVariant, marginBottom: SPACING.xs },
  timeInfo: { fontSize: FONT_SIZES.xs + 1, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },
  messageBox: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    backgroundColor: SEMANTIC_COLORS.success.surface, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.lg,
    borderWidth: 1, borderColor: SEMANTIC_COLORS.success.border,
  },
  messageText: { fontSize: FONT_SIZES.sm + 1, color: SEMANTIC_COLORS.success.text, flex: 1 },
  actions: { gap: SPACING.md, marginBottom: SPACING.xl },
  infoGrid: { flexDirection: 'row', gap: SPACING.md, marginBottom: SPACING.xl },
  infoCard: {
    flex: 1, alignItems: 'center',
  },
  infoLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },
  infoValue: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface, marginTop: SPACING.xs },
  historySection: {},
  sectionTitle: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface, marginBottom: SPACING.md },
  emptyText: { fontSize: FONT_SIZES.sm + 1, color: COLORS.onSurfaceVariant, textAlign: 'center', padding: SPACING.xl },
  historyItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SPACING.sm },
  historyDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.primary, marginRight: SPACING.md },
  historyInfo: { flex: 1 },
  historyDate: { fontSize: FONT_SIZES.sm + 1, fontWeight: FONT_WEIGHTS.medium, color: COLORS.onSurface },
  historyTime: { fontSize: FONT_SIZES.xs + 1, color: COLORS.onSurfaceVariant },
});
