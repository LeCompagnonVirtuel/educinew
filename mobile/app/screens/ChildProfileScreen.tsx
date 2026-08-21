import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useRealtimeAttendance } from '../hooks/useRealtime';
import { api } from '../../services/api';
import { supabase } from '../../services/supabase';

export default function ChildProfileScreen({ route, navigation }: any) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const studentId = route?.params?.studentId;
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [stats, setStats] = useState({ average: 0, attendance: 0, rank: 0 });
  const [loading, setLoading] = useState(true);
  const [showSelector, setShowSelector] = useState(false);

  useRealtimeAttendance((event) => {
    const targetId = studentId || selectedChild?.id;
    if (event.user_id === targetId) {
      loadData();
    }
  });

  useEffect(() => {
    loadData();
  }, [studentId]);

  async function loadData() {
    try {
      setLoading(true);
      const parentId = user?.id;
      if (!parentId) return;

      const childrenData = await api.getParentChildren(parentId);
      setChildren(childrenData || []);

      const targetId = studentId || childrenData?.[0]?.id;
      if (targetId) {
        const [childData, gradesReport, attendanceResult] = await Promise.all([
          api.getStudent(targetId),
          api.getStudentAverages(targetId).catch(() => ({ generalAverage: 0, averages: [] })),
          supabase.from('attendance').select('status').eq('student_id', targetId),
        ]);
        const attData = attendanceResult?.data || [];
        const attTotal = attData.length;
        const attPresent = attData.filter((r: any) => r.status === 'PRESENT').length;
        const attRate = attTotal > 0 ? Math.round((attPresent / attTotal) * 100) : 0;
        setSelectedChild(childData);
        const report = gradesReport as any;
        setStats({
          average: report?.generalAverage || 0,
          attendance: attRate,
          rank: childData?.rank || 0,
        });
      }
    } catch (error) {
      console.error('[ChildProfile]', error);
    } finally {
      setLoading(false);
    }
  }

  function handleSelectChild(child: any) {
    setSelectedChild(child);
    setShowSelector(false);
    navigation.setParams({ studentId: child.id });
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={{ marginTop: 12, color: COLORS.onSurfaceVariant }}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const firstName = selectedChild?.firstName || selectedChild?.first_name || '';
  const lastName = selectedChild?.lastName || selectedChild?.last_name || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'Élève';
  const initials = (firstName[0] || '') + (lastName[0] || '');
  const className = selectedChild?.classes?.name || selectedChild?.class?.name || '';
  const schoolName = selectedChild?.schools?.name || selectedChild?.school?.name || '';
  const studentIdCode = selectedChild?.studentId || selectedChild?.student_id || selectedChild?.id || '';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>

        {children.length > 1 && (
          <View style={styles.selectorContainer}>
            <TouchableOpacity style={styles.selectorBtn} onPress={() => setShowSelector(!showSelector)}>
              <Ionicons name="people-outline" size={16} color={COLORS.primary} />
              <Text style={styles.selectorText}>{children.length} enfants</Text>
              <Ionicons name={showSelector ? "chevron-up" : "chevron-down"} size={16} color={COLORS.primary} />
            </TouchableOpacity>
            {showSelector && (
              <View style={styles.selectorDropdown}>
                {children.map((child: any) => {
                  const cFirstName = child?.firstName || child?.first_name || '';
                  const cLastName = child?.lastName || child?.last_name || '';
                  const cName = `${cFirstName} ${cLastName}`.trim();
                  const isSelected = child.id === selectedChild?.id;
                  return (
                    <TouchableOpacity
                      key={child.id}
                      style={[styles.selectorItem, isSelected && styles.selectorItemActive]}
                      onPress={() => handleSelectChild(child)}
                    >
                      <Text style={[styles.selectorItemText, isSelected && styles.selectorItemTextActive]}>{cName}</Text>
                      {isSelected && <Ionicons name="checkmark" size={16} color={COLORS.primary} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        )}

        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials || '?'}</Text>
            </View>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={14} color={COLORS.onPrimary} />
            </View>
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.tags}>
            {className ? <View style={styles.tag}><Text style={styles.tagText}>{className}</Text></View> : null}
            <View style={styles.tag}><Text style={styles.tagText}>ID: {studentIdCode}</Text></View>
          </View>
          {schoolName ? (
            <Text style={styles.school}>
              <Ionicons name="location-outline" size={14} color={COLORS.onSurfaceVariant} /> {schoolName}
            </Text>
          ) : null}
        </View>

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>{t('home.average')}</Text>
            <Text style={styles.cardValue}>{stats.average > 0 ? `${stats.average}/20` : '--'}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>{t('home.rank')}</Text>
            <Text style={styles.cardValue}>{stats.rank > 0 ? `${stats.rank}e` : '--'}</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={[styles.card, { flex: 1 }]}>
            <Text style={styles.cardLabel}>Assiduité</Text>
            <Text style={styles.cardValue}>{stats.attendance > 0 ? `${stats.attendance}%` : '--'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('messages.title')}</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactAvatar}><Text style={styles.contactAvatarText}>--</Text></View>
            <View>
              <Text style={styles.contactName}>Chargement...</Text>
              <Text style={styles.contactRole}>Conseillère académique</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.primary }]} onPress={() => Alert.alert('Appel', "Appel de l'école en cours...")}>
            <Ionicons name="call-outline" size={18} color={COLORS.onPrimary} />
            <Text style={styles.actionText}>{t('messages.title')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.secondaryContainer }]} onPress={() => navigation.navigate('Messages')}>
            <Ionicons name="chatbubble-outline" size={18} color={COLORS.onSecondaryContainer} />
            <Text style={[styles.actionText, { color: COLORS.onSecondaryContainer }]}>{t('messages.teachers')}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomTabBar activeTab="home" onTabPress={(tab) => {
        const routes: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
        navigation.navigate(routes[tab] || 'Home');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backBtn: { padding: 20, paddingBottom: 0 },
  selectorContainer: { paddingHorizontal: 20, marginBottom: 8 },
  selectorBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: COLORS.primaryFixed, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, alignSelf: 'flex-start' },
  selectorText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  selectorDropdown: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 12, marginTop: 8, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  selectorItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.outlineVariant + '20' },
  selectorItemActive: { backgroundColor: COLORS.primaryFixed + '40' },
  selectorItemText: { fontSize: 14, color: COLORS.onSurface },
  selectorItemTextActive: { color: COLORS.primary, fontWeight: '600' },
  profileSection: { alignItems: 'center', paddingVertical: 16 },
  avatarContainer: { position: 'relative', marginBottom: 12 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: COLORS.surfaceContainerLowest, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 4 },
  avatarText: { fontSize: 40, fontWeight: '800', color: COLORS.primary },
  verifiedBadge: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: COLORS.background },
  name: { fontSize: 28, fontWeight: '800', color: COLORS.onSurface },
  tags: { flexDirection: 'row', gap: 8, marginTop: 8 },
  tag: { backgroundColor: COLORS.primaryFixed, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  tagText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  school: { fontSize: 13, color: COLORS.onSurfaceVariant, marginTop: 8 },
  grid: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginBottom: 24 },
  card: { flex: 1, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  cardLabel: { fontSize: 11, fontWeight: '600', color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  cardValue: { fontSize: 24, fontWeight: '800', color: COLORS.primary, marginTop: 4 },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.onSurface, marginBottom: 12 },
  contactCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: COLORS.surfaceContainerLow, borderRadius: 16, padding: 16 },
  contactAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.surfaceContainer, justifyContent: 'center', alignItems: 'center' },
  contactAvatarText: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  contactName: { fontSize: 14, fontWeight: '700', color: COLORS.onSurface },
  contactRole: { fontSize: 12, color: COLORS.onSurfaceVariant },
  actionsRow: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginTop: 8 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 12 },
  actionText: { fontSize: 14, fontWeight: '700', color: COLORS.onPrimary },
});
