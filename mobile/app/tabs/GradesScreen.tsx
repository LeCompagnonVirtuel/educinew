import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SUBJECT_ICONS, getScoreColor, getScoreBg, getMention } from '../../constants/grades';
import { Card, Badge, EmptyState, SkeletonCard } from '../../components/ui';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, SEMANTIC_COLORS } from '../../constants/theme';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';
import { SkeletonList } from '../../components/ui/SkeletonLoader';

function getGradeBadgeVariant(grade: number): 'success' | 'info' | 'warning' | 'error' {
  if (grade >= 16) return 'success';
  if (grade >= 12) return 'info';
  if (grade >= 10) return 'warning';
  return 'error';
}

function AnimatedGradeCard({ item, index, expandedSubject, setExpandedSubject, getIcon }: {
  item: any;
  index: number;
  expandedSubject: string | null;
  setExpandedSubject: (id: string | null) => void;
  getIcon: (name: string) => string;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        delay: index * 60,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        delay: index * 60,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Card
        variant="default"
        padding="md"
        onPress={() => setExpandedSubject(expandedSubject === item.subject ? null : item.subject)}
        style={styles.gradeCard}
      >
        <View style={[styles.gradeIcon, { backgroundColor: getScoreBg(item.average) }]}>
          <Text style={{ fontSize: FONT_SIZES.xl }}>{getIcon(item.subject)}</Text>
        </View>
        <View style={styles.gradeInfo}>
          <Text style={styles.gradeName}>{item.subject}</Text>
          <Text style={styles.gradeNote}>Coeff. {item.coefficient} • {item.count} note{item.count > 1 ? 's' : ''}</Text>
        </View>
        <Badge
          label={item.average.toFixed(1)}
          variant={getGradeBadgeVariant(item.average)}
          size="md"
        />
      </Card>
    </Animated.View>
  );
}

export default function GradesScreen({ navigation, route }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [periods, setPeriods] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [bulletins, setBulletins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reportLoading, setReportLoading] = useState(false);
  const [view, setView] = useState<'subjects' | 'bulletins'>('subjects');
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { loadData(); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (selectedPeriod && studentId) loadReport();
  }, [selectedPeriod, studentId]);

  async function loadData() {
    setLoading(true);
    try {
      const { data: student } = await (await import('../../services/supabase')).supabase
        .from('students').select('id').eq('user_id', user?.id).single();
      const sid = student?.id || user?.id || '';
      setStudentId(sid);

      const [per, bulls] = await Promise.all([
        api.getPeriods().catch(() => []),
        api.getStudentBulletins(sid).catch(() => []),
      ]);
      setPeriods(per || []);
      setBulletins(bulls || []);
      if (per && per.length > 0) {
        const active = per.find((p: any) => p.isActive) || per[0];
        setSelectedPeriod(active);
      } else {
        const data = await api.getStudentAverages(sid);
        setReport(data);
      }
    } catch (err) {
      console.error('[Grades]', err);
    } finally {
      setLoading(false);
    }
  }

  async function loadReport() {
    if (!selectedPeriod || !studentId) return;
    setReportLoading(true);
    try {
      const data = await api.getStudentAverages(studentId, selectedPeriod.id);
      setReport(data);
    } catch (err) {
      console.error('[Grades] loadReport', err);
    } finally {
      setReportLoading(false);
    }
  }

  const getIcon = (name: string) => SUBJECT_ICONS[name] || '📚';

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        >
          <View style={styles.header}>
            <View style={{ width: 200, height: 24, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: BORDER_RADIUS.sm }} />
            <View style={{ width: 140, height: 14, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: BORDER_RADIUS.sm, marginTop: SPACING.sm }} />
          </View>
          <SkeletonCard />
          <View style={{ height: SPACING.md }} />
          <SkeletonList count={4} />
          <View style={{ height: 100 }} />
        </ScrollView>
        <BottomTabBar activeTab="learning" onTabPress={(tab) => {
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
          <Text style={styles.title}>{t('grades.title')}</Text>
          <Text style={styles.subtitle}>{t('grades.reportCard')}</Text>
        </View>

        {periods.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: SPACING.lg + SPACING.xs, marginBottom: SPACING.md }} contentContainerStyle={{ gap: SPACING.sm }}>
            {periods.map((p) => (
              <TouchableOpacity
                key={p.id}
                style={[styles.chip, selectedPeriod?.id === p.id && styles.chipActive]}
                onPress={() => setSelectedPeriod(p)}
              >
                <Text style={[styles.chipText, selectedPeriod?.id === p.id && styles.chipTextActive]}>
                  {p.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={styles.toggleRow}>
          <TouchableOpacity style={[styles.toggleBtn, view === 'subjects' && styles.toggleBtnActive]} onPress={() => setView('subjects')}>
            <Text style={[styles.toggleText, view === 'subjects' && styles.toggleTextActive]}>{t('grades.subject')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toggleBtn, view === 'bulletins' && styles.toggleBtnActive]} onPress={() => setView('bulletins')}>
            <Text style={[styles.toggleText, view === 'bulletins' && styles.toggleTextActive]}>{t('grades.reportCard')}</Text>
          </TouchableOpacity>
        </View>

        {view === 'subjects' ? (
          <>
            {reportLoading && <ActivityIndicator size="small" color={COLORS.primary} style={{ marginVertical: SPACING.md }} />}

            {report && report.generalAverage != null && (
              <Card variant="elevated" padding="lg" style={styles.avgCard}>
                <View style={styles.avgOrb}>
                  <Text style={styles.avgValue}>{report.generalAverage > 0 ? report.generalAverage.toFixed(2) : '—'}</Text>
                  <Text style={styles.avgMax}>/20</Text>
                </View>
                <Text style={styles.avgMention}>{getMention(report.generalAverage || 0)}</Text>
                <Text style={styles.avgPeriod}>{selectedPeriod?.name || t('grades.periods')}</Text>
              </Card>
            )}

            {report?.averages?.map((item: any, i: number) => (
              <AnimatedGradeCard
                key={item.subjectId || i}
                item={item}
                index={i}
                expandedSubject={expandedSubject}
                setExpandedSubject={setExpandedSubject}
                getIcon={getIcon}
              />
            ))}

            {(!report || !report.averages || report.averages.length === 0) && !reportLoading && (
              <EmptyState
                icon={<Text style={{ fontSize: 40 }}>📊</Text>}
                title={t('common.noData')}
                subtitle={t('grades.noGradesSubtitle') || "Les notes seront disponibles prochainement"}
              />
            )}
          </>
        ) : (
          <>
            {bulletins.map((b: any) => (
              <Card
                key={b.id}
                variant="default"
                padding="md"
                onPress={() => navigation.navigate('ReportCard', { bulletinId: b.id, studentId })}
                style={styles.bulletinCard}
              >
                <View style={styles.bulletinIcon}>
                  <Ionicons name="document-text" size={24} color={COLORS.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.bulletinName}>{b.period?.name || 'Bulletin'}</Text>
                  <Text style={styles.bulletinSub}>
                    Moy: {b.generalAverage != null ? b.generalAverage.toFixed(2) : '—'}/20{b.rank ? ` • Rang: ${b.rank}e` : ''}
                  </Text>
                </View>
                {b.generalAverage != null && (
                  <Badge
                    label={b.mention || getMention(b.generalAverage)}
                    variant={getGradeBadgeVariant(b.generalAverage)}
                    size="sm"
                  />
                )}
              </Card>
            ))}
            {bulletins.length === 0 && (
              <EmptyState
                icon={<Text style={{ fontSize: 40 }}>🏫</Text>}
                title={t('common.noData')}
                subtitle={t('grades.noBulletinsSubtitle') || "Les bulletins seront disponibles prochainement"}
              />
            )}
          </>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
      <BottomTabBar activeTab="learning" onTabPress={(tab) => {
        const r: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
        navigation.navigate(r[tab] || 'Home');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg + SPACING.xs, marginBottom: SPACING.md },
  title: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  subtitle: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },

  chip: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.full, backgroundColor: COLORS.surfaceContainerLowest, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant },
  chipTextActive: { color: COLORS.onPrimary },

  toggleRow: { flexDirection: 'row', marginHorizontal: SPACING.lg + SPACING.xs, marginBottom: SPACING.md, backgroundColor: COLORS.surfaceContainer, borderRadius: BORDER_RADIUS.lg, padding: SPACING.xs },
  toggleBtn: { flex: 1, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, alignItems: 'center' },
  toggleBtnActive: { backgroundColor: COLORS.surfaceContainerLowest, ...SHADOWS.sm },
  toggleText: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant },
  toggleTextActive: { color: COLORS.primary },

  avgCard: { alignItems: 'center', backgroundColor: COLORS.primaryFixed, marginHorizontal: SPACING.lg + SPACING.xs, borderRadius: BORDER_RADIUS.xxl, marginBottom: SPACING.md },
  avgOrb: { flexDirection: 'row', alignItems: 'baseline' },
  avgValue: { fontSize: 48, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.primary },
  avgMax: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant },
  avgMention: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary, marginTop: SPACING.xs },
  avgPeriod: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },

  gradeCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: SPACING.lg + SPACING.xs, marginBottom: SPACING.sm },
  gradeIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.lg, justifyContent: 'center', alignItems: 'center' },
  gradeInfo: { flex: 1, marginLeft: SPACING.md },
  gradeName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  gradeNote: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },

  bulletinCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: SPACING.lg + SPACING.xs, marginBottom: SPACING.sm, gap: SPACING.md },
  bulletinIcon: { width: 48, height: 48, borderRadius: BORDER_RADIUS.lg, backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center' },
  bulletinName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  bulletinSub: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: SPACING.xs },
});
