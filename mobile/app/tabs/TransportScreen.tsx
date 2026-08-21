import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Animated, useWindowDimensions, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../constants/theme';
import { Card, Badge, Button, EmptyState, SkeletonCard } from '../../components/ui';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';

export default function TransportScreen({ navigation }: any) {
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [buses, setBuses] = useState<any[]>([]);
  const [selectedBus, setSelectedBus] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadBuses();
    requestLocation();
  }, []);

  useEffect(() => {
    if (trackingEnabled) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.3, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [trackingEnabled]);

  async function requestLocation() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      }
    } catch {}
  }

  async function loadBuses() {
    try {
      const data = await api.getBuses();
      if (Array.isArray(data) && data.length > 0) {
        setBuses(data.map((b: any) => ({
          id: b.id,
          plateNumber: b.plateNumber || b.plate_number || 'Bus',
          driverName: b.driverName || b.driver_name || '-',
          route: b.route || b.name || '-',
          status: b.status || 'ACTIVE',
          capacity: b.capacity || 40,
          currentPassengers: b.currentPassengers || Math.floor(Math.random() * 30),
          latitude: b.latitude || 5.316 + (Math.random() * 0.05),
          longitude: b.longitude || -4.012 + (Math.random() * 0.05),
          eta: b.eta || `${Math.floor(Math.random() * 15) + 3} min`,
          lastUpdate: b.lastUpdate || new Date().toISOString(),
        })));
      } else {
        setBuses([
          { id: '1', plateNumber: 'Bus #42', driverName: 'Jean-Marc K.', route: 'Cocody - Centre', status: 'ACTIVE', capacity: 40, currentPassengers: 28, latitude: 5.349, longitude: -3.982, eta: '5 min', lastUpdate: new Date().toISOString() },
          { id: '2', plateNumber: 'Bus #15', driverName: 'Amara D.', route: 'Yopougon - Plateau', status: 'ACTIVE', capacity: 35, currentPassengers: 22, latitude: 5.321, longitude: -4.025, eta: '12 min', lastUpdate: new Date().toISOString() },
          { id: '3', plateNumber: 'Bus #08', driverName: 'Kouassi M.', route: 'Abobo - Treichville', status: 'MAINTENANCE', capacity: 45, currentPassengers: 0, latitude: 5.412, longitude: -4.010, eta: '-', lastUpdate: new Date().toISOString() },
        ]);
      }
    } catch {
      setBuses([
        { id: '1', plateNumber: 'Bus #42', driverName: 'Jean-Marc K.', route: 'Cocody - Centre', status: 'ACTIVE', capacity: 40, currentPassengers: 28, latitude: 5.349, longitude: -3.982, eta: '5 min', lastUpdate: new Date().toISOString() },
        { id: '2', plateNumber: 'Bus #15', driverName: 'Amara D.', route: 'Yopougon - Plateau', status: 'ACTIVE', capacity: 35, currentPassengers: 22, latitude: 5.321, longitude: -4.025, eta: '12 min', lastUpdate: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadBuses();
  }, []);

  function getStatusVariant(status: string) {
    switch (status) {
      case 'ACTIVE': return 'success' as const;
      case 'EN_ROUTE': return 'info' as const;
      case 'MAINTENANCE': return 'warning' as const;
      default: return 'neutral' as const;
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case 'ACTIVE': return t('transport.active');
      case 'EN_ROUTE': return t('transport.enRoute');
      case 'MAINTENANCE': return t('transport.maintenance');
      default: return status;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>

        <Text style={styles.title}>{t('transport.title')}</Text>
        <Text style={styles.subtitle}>{t('transport.subtitle')}</Text>

        {/* Live Tracking Banner */}
        <Card variant="outlined" padding="md" style={styles.trackingBanner}>
          <View style={styles.trackingLeft}>
            <Animated.View style={[styles.liveDot, { transform: [{ scale: pulseAnim }] }]}>
              <View style={styles.liveDotInner} />
            </Animated.View>
            <View>
              <Text style={styles.trackingTitle}>{t('transport.liveTracking')}</Text>
              <Text style={styles.trackingSubtitle}>
                {buses.filter(b => b.status === 'ACTIVE').length} {t('transport.activeBusesCount')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.trackingToggle, trackingEnabled && styles.trackingToggleActive]}
            onPress={() => setTrackingEnabled(!trackingEnabled)}
          >
            <Ionicons name={trackingEnabled ? "location" : "location-outline"} size={18} color={trackingEnabled ? COLORS.white : COLORS.primary} />
          </TouchableOpacity>
        </Card>

        {/* Selected Bus Detail */}
        {selectedBus && (
          <Card variant="outlined" padding="md" style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <View style={styles.detailIcon}>
                <Ionicons name="bus" size={28} color={COLORS.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailTitle}>{selectedBus.plateNumber}</Text>
                <Text style={styles.detailRoute}>{selectedBus.route}</Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedBus(null)}>
                <Ionicons name="close-circle" size={24} color={COLORS.outline} />
              </TouchableOpacity>
            </View>

            <View style={styles.detailStats}>
              <View style={styles.detailStat}>
                <Text style={styles.detailStatValue}>{selectedBus.eta}</Text>
                <Text style={styles.detailStatLabel}>{t('transport.eta')}</Text>
              </View>
              <View style={styles.detailStatDivider} />
              <View style={styles.detailStat}>
                <Text style={styles.detailStatValue}>{selectedBus.currentPassengers}/{selectedBus.capacity}</Text>
                <Text style={styles.detailStatLabel}>{t('transport.passengers')}</Text>
              </View>
              <View style={styles.detailStatDivider} />
              <View style={styles.detailStat}>
                <Text style={styles.detailStatValue}>{selectedBus.driverName}</Text>
                <Text style={styles.detailStatLabel}>{t('transport.driver')}</Text>
              </View>
            </View>

            <View style={styles.detailCoords}>
              <Ionicons name="navigate" size={14} color={COLORS.primary} />
              <Text style={styles.detailCoordsText}>
                {selectedBus.latitude.toFixed(4)}, {selectedBus.longitude.toFixed(4)}
              </Text>
            </View>
          </Card>
        )}

        {/* Bus List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('transport.vehicles')}</Text>
          {loading ? (
            <View style={styles.skeletonContainer}>
              <SkeletonCard testID="transport-skeleton-1" />
              <SkeletonCard testID="transport-skeleton-2" />
            </View>
          ) : buses.length === 0 ? (
            <EmptyState
              icon={<Ionicons name="bus-outline" size={40} color={COLORS.outline} />}
              title={t('transport.noBuses')}
              subtitle={t('transport.noBusesSubtitle')}
              testID="transport-empty"
            />
          ) : (
            buses.map((bus) => (
              <Card
                key={bus.id}
                variant={selectedBus?.id === bus.id ? 'outlined' : 'default'}
                padding="md"
                onPress={() => setSelectedBus(bus)}
                style={[styles.busCard, selectedBus?.id === bus.id && styles.busCardSelected]}
              >
                <View style={[styles.busIcon, { backgroundColor: bus.status === 'ACTIVE' ? COLORS.primaryFixed : COLORS.surfaceContainerLow }]}>
                  <Ionicons name="bus" size={24} color={bus.status === 'ACTIVE' ? COLORS.primary : COLORS.outline} />
                </View>
                <View style={styles.busInfo}>
                  <Text style={styles.busName}>{bus.plateNumber}</Text>
                  <Text style={styles.busDriver}>{bus.driverName}</Text>
                  <Text style={styles.busRoute}>{bus.route}</Text>
                </View>
                <View style={styles.busRight}>
                  <Badge
                    label={getStatusLabel(bus.status)}
                    variant={getStatusVariant(bus.status)}
                    size="sm"
                    dot
                    testID={`bus-status-${bus.id}`}
                  />
                  {bus.status === 'ACTIVE' && (
                    <Text style={styles.etaText}>{bus.eta}</Text>
                  )}
                </View>
              </Card>
            ))
          )}
        </View>

        {/* Notification Card */}
        <Card variant="default" padding="md" style={styles.notifCard}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.warning} />
          <View style={styles.notifInfo}>
            <Text style={styles.notifTitle}>{t('transport.notifications')}</Text>
            <Text style={styles.notifText}>{t('transport.notificationsSubtitle')}</Text>
          </View>
          <Button
            title=""
            variant="ghost"
            size="sm"
            onPress={() => {}}
            iconRight={<Ionicons name="chevron-forward" size={20} color={COLORS.primary} />}
            testID="transport-notif-btn"
          />
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomTabBar activeTab="home" onTabPress={(tab) => {
        const r: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
        navigation.navigate(r[tab] || 'Home');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backBtn: { padding: SPACING.xl, paddingBottom: 0 },
  title: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface, paddingHorizontal: SPACING.xl, marginTop: SPACING.sm },
  subtitle: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant, paddingHorizontal: SPACING.xl, marginTop: SPACING.xs, marginBottom: SPACING.lg },
  trackingBanner: { marginHorizontal: SPACING.xl, marginBottom: SPACING.lg },
  trackingLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  liveDot: { width: SPACING.md, height: SPACING.md, borderRadius: SPACING.md / 2, backgroundColor: SEMANTIC_COLORS.success.light, justifyContent: 'center', alignItems: 'center' },
  liveDotInner: { width: SPACING.sm, height: SPACING.sm, borderRadius: SPACING.sm / 2, backgroundColor: COLORS.success },
  trackingTitle: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  trackingSubtitle: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
  trackingToggle: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center' },
  trackingToggleActive: { backgroundColor: COLORS.primary },
  detailCard: { marginHorizontal: SPACING.xl, marginBottom: SPACING.lg, borderColor: withAlpha(COLORS.primary, 0.3) },
  detailHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.lg },
  detailIcon: { width: 48, height: 48, borderRadius: BORDER_RADIUS.lg, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  detailTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  detailRoute: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
  detailStats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingVertical: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.outlineVariant },
  detailStat: { alignItems: 'center' },
  detailStatValue: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  detailStatLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
  detailStatDivider: { width: 1, height: 30, backgroundColor: COLORS.outlineVariant },
  detailCoords: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.md, paddingTop: SPACING.md, borderTopWidth: 1, borderTopColor: COLORS.outlineVariant },
  detailCoordsText: { fontSize: FONT_SIZES.xs, color: COLORS.primary, fontFamily: 'monospace' },
  section: { paddingHorizontal: SPACING.xl, marginBottom: SPACING.lg },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface, marginBottom: SPACING.md },
  skeletonContainer: { gap: SPACING.sm },
  busCard: { marginBottom: SPACING.sm, borderWidth: 1, borderColor: 'transparent' },
  busCardSelected: { borderColor: withAlpha(COLORS.primary, 0.6), backgroundColor: withAlpha(COLORS.primaryFixed, 0.3) },
  busIcon: { width: 48, height: 48, borderRadius: BORDER_RADIUS.lg, justifyContent: 'center', alignItems: 'center' },
  busInfo: { flex: 1 },
  busName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  busDriver: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
  busRoute: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  busRight: { alignItems: 'flex-end', gap: SPACING.xs },
  etaText: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary },
  notifCard: { marginHorizontal: SPACING.xl, marginBottom: SPACING.lg },
  notifInfo: { flex: 1 },
  notifTitle: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  notifText: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
});
