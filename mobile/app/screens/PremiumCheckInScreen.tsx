import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useAuth } from '../context/AuthContext';
import { api } from '../../services/api';
import { COLORS, withAlpha } from '../../constants/colors';
import { supabase } from '../../services/supabase';



type UserRole = 'STUDENT' | 'TEACHER' | 'STAFF' | string;

type TodayRecord = {
  check_in_time: string | null;
  check_out_time: string | null;
  status: string;
  break_start: string | null;
  break_end: string | null;
  method?: string;
};

type TimelineEvent = {
  id: string;
  time: string;
  type: 'arrival' | 'break_start' | 'break_end' | 'departure';
  label: string;
};

type HistoryRecord = {
  date: string;
  check_in_time: string | null;
  check_out_time: string | null;
  status: string;
  late_minutes?: number;
};

export default function PremiumCheckInScreen({ navigation }: any) {
  const { user } = useAuth();
  const role: UserRole = user?.role || 'STUDENT';

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState('');
  const [todayRecord, setTodayRecord] = useState<TodayRecord | null>(null);
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseAnimRef = useRef<Animated.CompositeAnimation | null>(null);

  const [entityId, setEntityId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!todayRecord?.check_in_time && !todayRecord?.check_out_time) {
      pulseAnimRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.08, duration: 1000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
        ])
      );
      pulseAnimRef.current.start();
    } else {
      pulseAnim.setValue(1);
      pulseAnimRef.current?.stop();
    }
    return () => { pulseAnimRef.current?.stop(); };
  }, [todayRecord?.check_in_time, todayRecord?.check_out_time]);

  useEffect(() => { initData(); }, [user?.id]);

  async function initData() {
    if (!user?.id) return;
    setInitialLoading(true);
    try {
      if (role === 'STUDENT') {
        await initStudent();
      } else if (role === 'TEACHER') {
        await initTeacher();
      } else {
        await initStaff();
      }
    } catch (err) {
      console.error('[PremiumCheckIn] init', err);
    } finally {
      setInitialLoading(false);
    }
  }

  async function initStudent() {
    const { data: student } = await supabase
      .from('students').select('id').eq('user_id', user!.id).single();
    if (!student) return;
    setEntityId(student.id);

    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('attendance')
      .select('check_in_time, check_out_time, status')
      .eq('student_id', student.id).eq('date', today).maybeSingle();

    if (data) {
      setTodayRecord({
        check_in_time: data.check_in_time,
        check_out_time: data.check_out_time,
        status: data.status || 'PRESENT',
        break_start: null,
        break_end: null,
      });
      buildTimeline(data);
    }

    const { data: histData } = await supabase
      .from('attendance')
      .select('date, check_in_time, check_out_time, status')
      .eq('student_id', student.id)
      .order('date', { ascending: false })
      .limit(7);

    setHistory((histData || []).map((r: any) => ({
      date: r.date,
      check_in_time: r.check_in_time,
      check_out_time: r.check_out_time,
      status: r.status || 'PRESENT',
    })));
  }

  async function initTeacher() {
    const { data: teacher } = await supabase
      .from('teachers').select('id').eq('user_id', user!.id).single();
    if (!teacher) return;
    setEntityId(teacher.id);

    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('teacher_attendance')
      .select('check_in_time, check_out_time, status')
      .eq('teacher_id', teacher.id).eq('date', today).maybeSingle();

    if (data) {
      setTodayRecord({
        check_in_time: data.check_in_time,
        check_out_time: data.check_out_time,
        status: data.status || 'PRESENT',
        break_start: null,
        break_end: null,
      });
      buildTimeline(data);
    }

    const { data: histData } = await supabase
      .from('teacher_attendance')
      .select('date, check_in_time, check_out_time, status')
      .eq('teacher_id', teacher.id)
      .order('date', { ascending: false })
      .limit(7);

    setHistory((histData || []).map((r: any) => ({
      date: r.date,
      check_in_time: r.check_in_time,
      check_out_time: r.check_out_time,
      status: r.status || 'PRESENT',
    })));
  }

  async function initStaff() {
    try {
      const data = await api.getStaffTodayRecord();
      if (data) {
        setTodayRecord({
          check_in_time: data.check_in_time,
          check_out_time: data.check_out_time,
          status: data.status || 'PRESENT',
          break_start: data.break_start || null,
          break_end: data.break_end || null,
          method: data.method,
        });
        setEntityId(data.staff_id);
        buildTimeline(data);
      }

      const histData = await api.getStaffAttendanceHistory(data?.staff_id || '');
      setHistory(histData.map((r: any) => ({
        date: r.date,
        check_in_time: r.check_in_time,
        check_out_time: r.check_out_time,
        status: r.status || 'PRESENT',
      })));
    } catch (err) {
      console.error('[PremiumCheckIn] initStaff', err);
    }
  }

  function buildTimeline(data: any) {
    const events: TimelineEvent[] = [];
    let idx = 0;

    if (data.check_in_time) {
      events.push({
        id: String(idx++),
        time: new Date(data.check_in_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'arrival',
        label: 'Arrivée',
      });
    }
    if (data.break_start) {
      events.push({
        id: String(idx++),
        time: new Date(data.break_start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'break_start',
        label: 'Pause débutée',
      });
    }
    if (data.break_end) {
      events.push({
        id: String(idx++),
        time: new Date(data.break_end).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'break_end',
        label: 'Pause terminée',
      });
    }
    if (data.check_out_time) {
      events.push({
        id: String(idx++),
        time: new Date(data.check_out_time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        type: 'departure',
        label: 'Départ',
      });
    }
    setTimeline(events);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await initData();
    setRefreshing(false);
  }, [user?.id]);

  const requestLocation = async (): Promise<{ lat: number; lng: number } | null> => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erreur', 'Permission de localisation requise pour le pointage GPS.');
      return null;
    }
    const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    return { lat: location.coords.latitude, lng: location.coords.longitude };
  };

  const handleCheckIn = async () => {
    setLoading(true);
    setMessage('');
    try {
      const loc = await requestLocation();
      if (!loc) { setLoading(false); return; }

      if (role === 'STUDENT') {
        if (!entityId) return;
        const today = new Date().toISOString().split('T')[0];
        const now = new Date().toISOString();
        const { error } = await supabase.from('attendance').upsert({
          student_id: entityId,
          school_id: user?.schoolId,
          date: today,
          check_in_time: now,
          status: 'PRESENT',
          latitude: loc.lat,
          longitude: loc.lng,
        }, { onConflict: 'student_id,date' });
        if (error) throw error;
        setMessage('Présence enregistrée avec succès');
      } else if (role === 'TEACHER') {
        if (!entityId) return;
        await api.teacherCheckinGPS(entityId, loc.lat, loc.lng);
        setMessage('Pointage enregistré avec succès');
      } else {
        const staffId = entityId || '';
        await api.staffCheckIn(staffId, 'GPS', loc.lat, loc.lng);
        setMessage('Arrivée enregistrée avec succès');
      }

      await initData();
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Pointage échoué.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      if (role === 'STUDENT') {
        if (!entityId) return;
        const today = new Date().toISOString().split('T')[0];
        const { error } = await supabase.from('attendance')
          .update({ check_out_time: new Date().toISOString() })
          .eq('student_id', entityId).eq('date', today);
        if (error) throw error;
      } else if (role === 'TEACHER') {
        if (!entityId) return;
        await api.teacherCheckout(entityId);
      } else {
        await api.staffCheckOut(entityId || '');
      }
      setMessage('Départ enregistré');
      await initData();
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Départ échoué');
    } finally {
      setLoading(false);
    }
  };

  const handleStartBreak = async () => {
    setLoading(true);
    try {
      if (role === 'STAFF') {
        await api.staffStartBreak(entityId || '');
      } else {
        Alert.alert('Info', 'Les pauses ne sont pas gérées pour ce profil.');
        setLoading(false);
        return;
      }
      setMessage('Pause commencée');
      await initData();
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Erreur pause');
    } finally {
      setLoading(false);
    }
  };

  const handleEndBreak = async () => {
    setLoading(true);
    try {
      if (role === 'STAFF') {
        await api.staffEndBreak(entityId || '');
      }
      setMessage('Pause terminée');
      await initData();
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Erreur reprise');
    } finally {
      setLoading(false);
    }
  };

  const isCheckedIn = !!todayRecord?.check_in_time;
  const isCheckedOut = !!todayRecord?.check_out_time;
  const isOnBreak = todayRecord?.status === 'ON_BREAK';
  const isLate = todayRecord?.status === 'LATE';

  const getStatusInfo = () => {
    if (!isCheckedIn) return { label: 'Non pointé', color: COLORS.outline, bg: COLORS.surfaceContainerLow };
    if (isCheckedOut) return { label: 'Départ enregistré', color: '#6B7280', bg: '#F3F4F6' };
    if (isOnBreak) return { label: 'En pause', color: '#8B5CF6', bg: '#F5F3FF' };
    if (isLate) return { label: 'En retard', color: '#F59E0B', bg: '#FFFBEB' };
    return { label: 'Présent', color: COLORS.success, bg: '#ECFDF5' };
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'arrival': return 'log-in-outline';
      case 'break_start': return 'pause-outline';
      case 'break_end': return 'play-outline';
      case 'departure': return 'log-out-outline';
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'arrival': return COLORS.success;
      case 'break_start': return '#8B5CF6';
      case 'break_end': return '#3B82F6';
      case 'departure': return '#6B7280';
    }
  };

  const getHistoryStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT': return COLORS.success;
      case 'LATE': return '#F59E0B';
      case 'ABSENT': return '#EF4444';
      case 'DEPARTED': return '#6B7280';
      default: return COLORS.outline;
    }
  };

  const getHistoryStatusLabel = (status: string) => {
    switch (status) {
      case 'PRESENT': return 'Présent';
      case 'LATE': return 'Retard';
      case 'ABSENT': return 'Absent';
      case 'DEPARTED': return 'Terminé';
      case 'ON_BREAK': return 'En pause';
      default: return status;
    }
  };

  const formatTime = (iso: string | null) =>
    iso ? new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : '--:--';

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const statusInfo = getStatusInfo();

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />
        }
      >
        {/* Header with gradient */}
        <LinearGradient colors={[COLORS.primary, COLORS.primaryContainer]} style={styles.headerGradient}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.greeting}>Bonjour, {user?.name?.split(' ')[0]}</Text>

          {/* Real-time Clock */}
          <Text style={styles.clock}>
            {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </Text>
          <Text style={styles.dateText}>
            {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </Text>
        </LinearGradient>

        {/* Message Banner */}
        {message ? (
          <View style={styles.messageBanner}>
            <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
            <Text style={styles.messageText}>{message}</Text>
            <TouchableOpacity onPress={() => setMessage('')}>
              <Ionicons name="close" size={16} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Status Card */}
        <View style={[styles.statusCard, { borderLeftColor: statusInfo.color }]}>
          <View style={[styles.statusDot, { backgroundColor: statusInfo.color }]} />
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Mon statut</Text>
            <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.label}</Text>
            {todayRecord?.check_in_time && (
              <Text style={styles.timeDetail}>
                Arrivée: {formatTime(todayRecord.check_in_time)}
              </Text>
            )}
            {todayRecord?.check_out_time && (
              <Text style={styles.timeDetail}>
                Départ: {formatTime(todayRecord.check_out_time)}
              </Text>
            )}
            {todayRecord?.break_start && (
              <Text style={styles.timeDetail}>
                Pause: {formatTime(todayRecord.break_start)} - {todayRecord.break_end ? formatTime(todayRecord.break_end) : '...'}
              </Text>
            )}
          </View>
        </View>

        {/* Premium Check-In Button */}
        {!isCheckedIn ? (
          <View style={styles.buttonContainer}>
            <Animated.View style={[styles.pulseWrapper, { transform: [{ scale: pulseAnim }] }]}>
              <TouchableOpacity
                style={[styles.checkInButton, loading && styles.checkInButtonDisabled]}
                onPress={handleCheckIn}
                disabled={loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#22C55E', '#10B981']}
                  style={styles.checkInGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  {loading ? (
                    <ActivityIndicator size="large" color="#fff" />
                  ) : (
                    <>
                      <Ionicons name="finger-print" size={40} color="#fff" />
                      <Text style={styles.checkInButtonText}>Pointer maintenant</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
            <Text style={styles.checkInHint}>Appuyez pour enregistrer votre arrivée</Text>
          </View>
        ) : (
          /* Quick Actions */
          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Actions rapides</Text>
            <View style={styles.actionsRow}>
              {!isCheckedOut && (
                <>
                  {role === 'STAFF' && (
                    <>
                      {!isOnBreak ? (
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: '#8B5CF6' }]}
                          onPress={handleStartBreak}
                          disabled={loading}
                        >
                          {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                          ) : (
                            <>
                              <Ionicons name="pause" size={20} color="#fff" />
                              <Text style={styles.actionButtonText}>Pause</Text>
                            </>
                          )}
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
                          onPress={handleEndBreak}
                          disabled={loading}
                        >
                          {loading ? (
                            <ActivityIndicator color="#fff" size="small" />
                          ) : (
                            <>
                              <Ionicons name="play" size={20} color="#fff" />
                              <Text style={styles.actionButtonText}>Reprendre</Text>
                            </>
                          )}
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#EF4444' }]}
                    onPress={handleCheckOut}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" size="small" />
                    ) : (
                      <>
                        <Ionicons name="log-out" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>Départ</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </>
              )}
              {isCheckedOut && (
                <View style={styles.completedBanner}>
                  <Ionicons name="checkmark-done-circle" size={22} color={COLORS.success} />
                  <Text style={styles.completedText}>Journée terminée</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Today's Timeline */}
        {timeline.length > 0 && (
          <View style={styles.timelineSection}>
            <Text style={styles.sectionTitle}>Chronologie du jour</Text>
            {timeline.map((event, i) => {
              const color = getEventColor(event.type);
              const isLast = i === timeline.length - 1;
              return (
                <View key={event.id} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={[styles.timelineDot, { backgroundColor: color }]} />
                    {!isLast && <View style={styles.timelineLine} />}
                  </View>
                  <View style={[styles.timelineCard, { borderLeftColor: color }]}>
                    <View style={styles.timelineCardHeader}>
                      <Ionicons name={getEventIcon(event.type) as any} size={16} color={color} />
                      <Text style={[styles.timelineType, { color }]}>{event.label}</Text>
                    </View>
                    <Text style={styles.timelineTime}>{event.time}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Historique (7 derniers jours)</Text>
          {history.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={40} color={COLORS.outline} />
              <Text style={styles.emptyText}>Aucun historique</Text>
            </View>
          ) : (
            history.map((record, i) => {
              const dotColor = getHistoryStatusColor(record.status);
              const statusLabel = getHistoryStatusLabel(record.status);
              const ci = formatTime(record.check_in_time);
              const co = formatTime(record.check_out_time);
              return (
                <View key={i} style={styles.historyItem}>
                  <View style={[styles.historyDot, { backgroundColor: dotColor }]} />
                  <View style={styles.historyInfo}>
                    <Text style={styles.historyDate}>{formatDate(record.date)}</Text>
                    <Text style={styles.historyTime}>{ci} - {co}</Text>
                  </View>
                  <View style={[styles.historyBadge, { backgroundColor: withAlpha(dotColor, 0.12) }]}>
                    <Text style={[styles.historyBadgeText, { color: dotColor }]}>{statusLabel}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  clock: {
    fontSize: 42,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  dateText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  messageBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginTop: 16,
  },
  messageText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.success,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusInfo: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 2,
  },
  timeDetail: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 8,
  },
  pulseWrapper: {
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  checkInButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
  },
  checkInButtonDisabled: {
    opacity: 0.7,
  },
  checkInGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
  },
  checkInButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginTop: 6,
  },
  checkInHint: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 12,
  },
  quickActions: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 14,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  completedBanner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    paddingVertical: 14,
  },
  completedText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.success,
  },
  timelineSection: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  timelineLeft: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: COLORS.surfaceContainerHigh,
    marginTop: 4,
    marginBottom: -4,
  },
  timelineCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 10,
    padding: 10,
    marginLeft: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
  },
  timelineCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timelineType: {
    fontSize: 13,
    fontWeight: '600',
  },
  timelineTime: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    marginLeft: 22,
  },
  historySection: {
    marginHorizontal: 16,
    marginTop: 20,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginTop: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainer,
  },
  historyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onSurface,
    textTransform: 'capitalize',
  },
  historyTime: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  historyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  historyBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
});
