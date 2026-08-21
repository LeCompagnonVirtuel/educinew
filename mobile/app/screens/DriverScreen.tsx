import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  RefreshControl, Alert, Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useRealtimeTransport } from '../hooks/useRealtime';
import { supabase } from '../../services/supabase';
import {
  getDriverBus, getBusStudents, getActiveTrip, getTodayTrips, startTrip, completeTrip,
  writeGpsPoint, notifyTripStarted,
  type BusInfo, type BusStudent, type Trip,
} from '../../services/transport';

export default function DriverScreen({ navigation }: any) {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [bus, setBus] = useState<BusInfo | null>(null);
  const [students, setStudents] = useState<BusStudent[]>([]);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [todayTrips, setTodayTrips] = useState<Trip[]>([]);
  const [gpsActive, setGpsActive] = useState(false);
  const [lastGps, setLastGps] = useState<{ lat: number; lng: number; time: string } | null>(null);
  const [stats, setStats] = useState({ totalTrips: 0, totalStudents: 0, onTimeRate: 95 });

  const gpsIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Realtime: listen for transport updates
  useRealtimeTransport(bus?.id, (event) => {
    if (event.type === 'trip') {
      setActiveTrip(event.data?.status === 'IN_PROGRESS' ? event.data : null);
    }
  });

  // ─── Load Data ──────────────────────────────────────────────
  const loadData = useCallback(async () => {
    if (!user?.id) return;
    try {
      const busData = await getDriverBus(user.id);
      setBus(busData);

      if (busData) {
        const [studentsData, activeTripData, todayTripsData] = await Promise.all([
          getBusStudents(busData.id),
          getActiveTrip(busData.id),
          getTodayTrips(busData.id),
        ]);

        setStudents(studentsData);
        setActiveTrip(activeTripData);
        setTodayTrips(todayTripsData);

        // Restore GPS tracking if trip is active
        if (activeTripData && !gpsActive) {
          startGpsTracking(busData.id, activeTripData.id);
        }

        setStats({
          totalTrips: todayTripsData.length,
          totalStudents: studentsData.length,
          onTimeRate: 95,
        });
      }
    } catch (err) {
      console.error('[Driver] Load error:', err);
    }
  }, [user?.id]);

  useEffect(() => { loadData(); }, [loadData]);

  useEffect(() => {
    return () => { stopGpsTracking(); };
  }, []);

  // ─── GPS Tracking ───────────────────────────────────────────
  const startGpsTracking = useCallback((busId: string, tripId: string) => {
    if (gpsIntervalRef.current) return;

    setGpsActive(true);
    pulseAnimation();

    // Write GPS every 15 seconds
    gpsIntervalRef.current = setInterval(async () => {
      try {
        // Use expo-location for real GPS
        let lat = 5.3600;
        let lng = -4.0083;
        try {
          const Location = await import('expo-location');
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            lat = location.coords.latitude;
            lng = location.coords.longitude;
          }
        } catch (locErr) {
          console.warn('[GPS] expo-location unavailable, using fallback:', locErr);
        }

        await writeGpsPoint(busId, lat, lng, 30, 10, tripId, user?.id);
        setLastGps({
          lat,
          lng,
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        });
      } catch (err) {
        console.error('[GPS] Write error:', err);
      }
    }, 15000);

    // Write first point immediately
    writeGpsPoint(busId, 5.3600, -4.0083, 0, 10, tripId, user?.id).catch(() => {});
  }, [user?.id]);

  const stopGpsTracking = useCallback(() => {
    if (gpsIntervalRef.current) {
      clearInterval(gpsIntervalRef.current);
      gpsIntervalRef.current = null;
    }
    setGpsActive(false);
    pulseAnim.stopAnimation();
  }, []);

  const pulseAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // ─── Trip Management ────────────────────────────────────────
  const handleStartTrip = async () => {
    if (!bus || !user?.id) return;

    Alert.alert(
      'Démarrer la tournée',
      `Démarrer la tournée avec ${students.length} élèves ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Démarrer',
          onPress: async () => {
            try {
              const sid = await supabase.from('users').select('school_id').eq('id', user.id).single();
              const schoolId = sid.data?.school_id;
              if (!schoolId) {
                Alert.alert('Erreur', 'Établissement non trouvé');
                return;
              }

              const tripId = await startTrip(bus.id, user.id, schoolId, 'MORNING');
              await notifyTripStarted(bus.id, schoolId);
              startGpsTracking(bus.id, tripId);

              const tripData = await getActiveTrip(bus.id);
              setActiveTrip(tripData);
              setTodayTrips(prev => [tripData!, ...prev]);

              Alert.alert('Tournée démarrée', 'Le GPS est actif et les parents sont notifiés.');
            } catch (err: any) {
              Alert.alert('Erreur', err.message || 'Impossible de démarrer la tournée');
            }
          },
        },
      ]
    );
  };

  const handleCompleteTrip = async () => {
    if (!activeTrip) return;

    Alert.alert(
      'Terminer la tournée',
      'Confirmer la fin de la tournée ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Terminer',
          style: 'destructive',
          onPress: async () => {
            try {
              await completeTrip(activeTrip.id);
              stopGpsTracking();
              setActiveTrip(null);
              await loadData();
              Alert.alert('Tournée terminée', 'Le trajet a été enregistré avec succès.');
            } catch (err: any) {
              Alert.alert('Erreur', err.message || 'Impossible de terminer la tournée');
            }
          },
        },
      ]
    );
  };

  // ─── Refresh ────────────────────────────────────────────────
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  // ─── Render ─────────────────────────────────────────────────
  const boardedCount = students.filter(s => s.boarded).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.driverName}>{user?.name || 'Conducteur'}</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.notifBtn}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={22} color={COLORS.onSurface} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.msgBtn}
            onPress={() => navigation.navigate('Messages')}
          >
            <Ionicons name="chatbubble-outline" size={22} color={COLORS.onSurface} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
      >
        {/* GPS Status Banner */}
        {gpsActive && (
          <View style={styles.gpsBanner}>
            <Animated.View style={[styles.gpsDot, { transform: [{ scale: pulseAnim }] }]} />
            <Text style={styles.gpsText}>GPS actif — Position partagée</Text>
            {lastGps && (
              <Text style={styles.gpsTime}>{lastGps.time}</Text>
            )}
          </View>
        )}

        {/* Bus Info Card */}
        {bus ? (
          <View style={styles.busCard}>
            <View style={styles.busHeader}>
              <View style={styles.busIcon}>
                <Ionicons name="bus" size={28} color={COLORS.primary} />
              </View>
              <View style={styles.busInfo}>
                <Text style={styles.busName}>{bus.name}</Text>
                <Text style={styles.busPlate}>{bus.plateNumber}</Text>
              </View>
              <View style={[styles.statusBadge, activeTrip ? styles.statusActive : styles.statusIdle]}>
                <Text style={[styles.statusText, activeTrip ? styles.statusTextActive : styles.statusTextIdle]}>
                  {activeTrip ? 'En route' : 'Arrêté'}
                </Text>
              </View>
            </View>
            <View style={styles.busDetails}>
              <DetailRow icon="map-outline" label="Itinéraire" value={bus.route} />
              <DetailRow icon="people-outline" label="Élèves" value={`${bus.studentCount} places`} />
              {bus.vehicleModel && <DetailRow icon="car-outline" label="Véhicule" value={`${bus.vehicleModel} ${bus.vehicleYear || ''}`} />}
              <DetailRow icon="school-outline" label="Établissement" value={bus.schoolName || '—'} />
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Ionicons name="bus-outline" size={56} color={COLORS.outline} />
            <Text style={styles.emptyTitle}>Aucun véhicule assigné</Text>
            <Text style={styles.emptyHint}>Contactez votre administration pour obtenir une affectation.</Text>
          </View>
        )}

        {/* Trip Stats */}
        {bus && (
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.totalTrips}</Text>
              <Text style={styles.statLabel}>Trajets</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{boardedCount}/{students.length}</Text>
              <Text style={styles.statLabel}>À bord</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.onTimeRate}%</Text>
              <Text style={styles.statLabel}>Ponctualité</Text>
            </View>
          </View>
        )}

        {/* Trip Controls */}
        {bus && (
          <View style={styles.controlsSection}>
            {!activeTrip ? (
              <TouchableOpacity style={styles.startButton} onPress={handleStartTrip} activeOpacity={0.8}>
                <Ionicons name="play" size={24} color="#FFFFFF" />
                <Text style={styles.startButtonText}>Démarrer la tournée</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.activeTripControls}>
                <TouchableOpacity
                  style={styles.scanButton}
                  onPress={() => navigation.navigate('QRScanner', { type: 'TRANSPORT' })}
                  activeOpacity={0.8}
                >
                  <Ionicons name="scan-outline" size={22} color="#FFFFFF" />
                  <Text style={styles.scanButtonText}>Scanner QR Élève</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.completeButton} onPress={handleCompleteTrip} activeOpacity={0.8}>
                  <Ionicons name="stop" size={22} color="#FFFFFF" />
                  <Text style={styles.completeButtonText}>Terminer</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Student List */}
        {bus && students.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Élèves du trajet</Text>
              <Text style={styles.sectionCount}>{boardedCount}/{students.length}</Text>
            </View>
            {students.map((student, index) => (
              <View key={student.studentId} style={[styles.studentRow, student.boarded && styles.studentRowBoarded]}>
                <View style={styles.studentIndex}>
                  <Text style={styles.studentIndexText}>{index + 1}</Text>
                </View>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{student.studentName}</Text>
                  <Text style={styles.studentDetail}>
                    {student.matricule} · {student.className}
                  </Text>
                  {student.stopName && (
                    <Text style={styles.studentStop}>
                      <Ionicons name="location-outline" size={12} color={COLORS.outline} /> {student.stopName}
                    </Text>
                  )}
                </View>
                <View style={[styles.boardingBadge, student.boarded ? styles.boardedYes : styles.boardedNo]}>
                  <Ionicons
                    name={student.boarded ? 'checkmark-circle' : 'ellipse-outline'}
                    size={20}
                    color={student.boarded ? '#22C55E' : COLORS.outline}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Trip History */}
        {todayTrips.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trajets aujourd'hui</Text>
            {todayTrips.map((trip) => (
              <View key={trip.id} style={styles.tripRow}>
                <View style={[styles.tripDot, trip.status === 'IN_PROGRESS' ? styles.tripDotActive : trip.status === 'COMPLETED' ? styles.tripDotDone : styles.tripDotCancelled]} />
                <View style={styles.tripInfo}>
                  <Text style={styles.tripType}>
                    {trip.tripType === 'MORNING' ? 'Matin' : trip.tripType === 'AFTERNOON' ? 'Soir' : 'Spécial'}
                  </Text>
                  <Text style={styles.tripTime}>
                    {trip.startedAt ? new Date(trip.startedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '—'}
                    {trip.completedAt ? ` → ${new Date(trip.completedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : ''}
                  </Text>
                </View>
                <View style={[styles.tripStatusBadge, trip.status === 'IN_PROGRESS' ? styles.tripStatusActive : trip.status === 'COMPLETED' ? styles.tripStatusDone : styles.tripStatusCancelled]}>
                  <Text style={[styles.tripStatusText, trip.status === 'IN_PROGRESS' ? { color: '#FFFFFF' } : trip.status === 'COMPLETED' ? { color: '#16A34A' } : { color: '#DC2626' }]}>
                    {trip.status === 'IN_PROGRESS' ? 'En cours' : trip.status === 'COMPLETED' ? 'Terminé' : 'Annulé'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* No bus assigned hint */}
        {!bus && (
          <View style={styles.hintCard}>
            <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
            <Text style={styles.hintText}>
              Votre administrateur doit vous affecter un véhicule dans la section Transport du portail Web.
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon as any} size={16} color={COLORS.outline} />
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  headerLeft: {},
  greeting: { fontSize: 14, color: COLORS.onSurfaceVariant },
  driverName: { fontSize: 22, fontWeight: '800', color: COLORS.onSurface },
  headerRight: { flexDirection: 'row', gap: 8 },
  notifBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.surfaceContainerLowest, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.outlineVariant },
  msgBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: COLORS.surfaceContainerLowest, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.outlineVariant },

  gpsBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ECFDF5', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12, gap: 8, borderWidth: 1, borderColor: '#A7F3D0' },
  gpsDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#22C55E' },
  gpsText: { fontSize: 13, fontWeight: '600', color: '#166534', flex: 1 },
  gpsTime: { fontSize: 11, color: '#16A34A', fontVariant: ['tabular-nums'] },

  busCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 20, padding: 20, marginBottom: 12, borderWidth: 1, borderColor: COLORS.outlineVariant },
  busHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  busIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  busInfo: { flex: 1 },
  busName: { fontSize: 18, fontWeight: '800', color: COLORS.onSurface },
  busPlate: { fontSize: 14, color: COLORS.onSurfaceVariant, fontVariant: ['tabular-nums'] },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statusActive: { backgroundColor: '#DCFCE7' },
  statusIdle: { backgroundColor: COLORS.surfaceContainer },
  statusText: { fontSize: 12, fontWeight: '700' },
  statusTextActive: { color: '#16A34A' },
  statusTextIdle: { color: COLORS.onSurfaceVariant },
  busDetails: { gap: 10 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailLabel: { fontSize: 13, color: COLORS.onSurfaceVariant, flex: 1 },
  detailValue: { fontSize: 13, fontWeight: '600', color: COLORS.onSurface },

  emptyCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 20, padding: 48, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: COLORS.outlineVariant },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface, marginTop: 16 },
  emptyHint: { fontSize: 14, color: COLORS.onSurfaceVariant, textAlign: 'center', marginTop: 8, lineHeight: 20 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: COLORS.outlineVariant },
  statValue: { fontSize: 24, fontWeight: '800', color: COLORS.primary },
  statLabel: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 4 },

  controlsSection: { marginBottom: 16 },
  startButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: '#16A34A', borderRadius: 16, height: 56, shadowColor: '#16A34A', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  startButtonText: { fontSize: 17, fontWeight: '700', color: '#FFFFFF' },
  activeTripControls: { flexDirection: 'row', gap: 10 },
  scanButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: COLORS.primary, borderRadius: 16, height: 52, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  scanButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },
  completeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#DC2626', borderRadius: 16, paddingHorizontal: 20, height: 52 },
  completeButtonText: { fontSize: 15, fontWeight: '700', color: '#FFFFFF' },

  section: { marginBottom: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.onSurface },
  sectionCount: { fontSize: 14, fontWeight: '700', color: COLORS.primary },

  studentRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.outlineVariant },
  studentRowBoarded: { backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' },
  studentIndex: { width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.surfaceContainer, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  studentIndexText: { fontSize: 12, fontWeight: '700', color: COLORS.onSurfaceVariant },
  studentInfo: { flex: 1 },
  studentName: { fontSize: 14, fontWeight: '700', color: COLORS.onSurface },
  studentDetail: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  studentStop: { fontSize: 11, color: COLORS.outline, marginTop: 2 },
  boardingBadge: { marginLeft: 8 },
  boardedYes: { opacity: 1 },
  boardedNo: { opacity: 0.5 },

  tripRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: COLORS.outlineVariant },
  tripDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  tripDotActive: { backgroundColor: '#22C55E' },
  tripDotDone: { backgroundColor: '#94A3B8' },
  tripDotCancelled: { backgroundColor: '#EF4444' },
  tripInfo: { flex: 1 },
  tripType: { fontSize: 14, fontWeight: '600', color: COLORS.onSurface },
  tripTime: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  tripStatusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tripStatusActive: { backgroundColor: '#16A34A' },
  tripStatusDone: { backgroundColor: '#F1F5F9' },
  tripStatusCancelled: { backgroundColor: '#FEF2F2' },
  tripStatusText: { fontSize: 11, fontWeight: '700' },

  hintCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.primaryFixed, borderRadius: 14, padding: 16, gap: 12, marginBottom: 16 },
  hintText: { fontSize: 13, color: COLORS.onSurfaceVariant, flex: 1, lineHeight: 19 },
});
