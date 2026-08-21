import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Alert, ActivityIndicator, Share, useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { getScoreColor, getScoreBg, getMention } from '../../constants/grades';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';

function getMentionEmoji(mention: string): string {
  switch (mention) {
    case 'Excellent': return '🏆';
    case 'Très Bien': return '🌟';
    case 'Bien': return '👏';
    case 'Assez Bien': return '📝';
    case 'Passable': return '📌';
    default: return '⚠️';
  }
}

function getMentionColor(mention: string): string {
  switch (mention) {
    case 'Excellent': return '#059669';
    case 'Très Bien': return '#10b981';
    case 'Bien': return '#14b8a6';
    case 'Assez Bien': return '#f59e0b';
    case 'Passable': return '#f97316';
    default: return '#ef4444';
  }
}

function getMentionBg(mention: string): string {
  switch (mention) {
    case 'Excellent': return '#ecfdf5';
    case 'Très Bien': return '#f0fdf4';
    case 'Bien': return '#f0fdfa';
    case 'Assez Bien': return '#fffbeb';
    case 'Passable': return '#fff7ed';
    default: return '#fef2f2';
  }
}

function getInitials(name: string): string {
  return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
}

function getAppreciation(avg: number): string {
  if (avg >= 16) return 'Excellent travail. Félicitations !';
  if (avg >= 14) return 'Très bon travail. Continuez ainsi !';
  if (avg >= 12) return 'Bon travail dans l\'ensemble.';
  if (avg >= 10) return 'Résultats satisfaisants. Peut mieux faire.';
  return 'Résultats insuffisants. Des efforts sont nécessaires.';
}

function generateAIAnalysis(subjects: any[]) {
  const sorted = [...subjects].sort((a, b) => (b.average || 0) - (a.average || 0));
  return {
    strengths: sorted.filter(s => (s.average || 0) >= 14).slice(0, 3),
    weaknesses: sorted.filter(s => (s.average || 0) < 10).slice(0, 3),
    recommendations: [
      ...(sorted.filter(s => (s.average || 0) < 10).length > 0
        ? [`Renforcer le travail en ${sorted.filter(s => (s.average || 0) < 10).map(w => w.subjectName || w.subject?.name || 'matière').filter(Boolean).join(' et ')}.`]
        : []),
      ...(sorted.filter(s => (s.average || 0) >= 14).length > 0
        ? [`Maintenir l'excellence en ${sorted.filter(s => (s.average || 0) >= 14).map(s => s.subjectName || s.subject?.name || 'matière').filter(Boolean).join(', ')}.`]
        : ['Continuer les efforts. Le niveau est globalement bon.']),
    ],
  };
}

function getRankSuffix(rank: number): string {
  return rank === 1 ? 'er' : 'ème';
}

// ─── Tab Button ─────────────────────────────────────────────────
function TabButton({ active, label, icon, onPress }: {
  active: boolean; label: string; icon: string; onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabBtn, active && styles.tabBtnActive]}
      activeOpacity={0.7}
    >
      <Ionicons name={icon as any} size={16} color={active ? COLORS.primary : '#94a3b8'} />
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Main Screen ────────────────────────────────────────────────
export default function ReportCardScreen({ navigation, route }: any) {
  const { t } = useLanguage();
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'notes' | 'evolution' | 'analysis'>('notes');
  const [bulletin, setBulletin] = useState<any>(null);
  const [report, setReport] = useState<any>(null);
  const [evolution, setEvolution] = useState<any[]>([]);

  const bulletinId = route?.params?.bulletinId;
  const studentId = route?.params?.studentId;
  const periodId = route?.params?.periodId;

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    try {
      if (bulletinId) {
        const data = await api.getBulletin(bulletinId);
        setBulletin(data);
        if (data.studentId) {
          const evo = await api.getStudentEvolution(data.studentId);
          setEvolution(evo);
        }
      } else if (studentId && periodId) {
        const [data, evo] = await Promise.all([
          api.getStudentAverages(studentId, periodId),
          api.getStudentEvolution(studentId),
        ]);
        setReport(data);
        setEvolution(evo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    const name = bulletin?.student?.user?.name || report?.studentName || '';
    const avgVal = (bulletin?.generalAverage || report?.generalAverage || 0).toFixed(2);
    try {
      await Share.share({
        message: `Bulletin de ${name}\nMoyenne: ${avgVal}/20\nRang: ${bulletin?.rank || report?.rank || '—'}e\n— EduCI`,
      });
    } catch {}
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Chargement du bulletin...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const data = bulletin || report;
  const subjects = bulletin?.entries || report?.subjects || [];
  const avg = data?.generalAverage || 0;
  const rank = data?.rank || report?.rank;
  const classSize = data?.classSize || 0;
  const mention = data?.mention || getMention(avg);
  const studentName = bulletin?.student?.user?.name || report?.studentName || '';
  const className = bulletin?.student?.class?.name || report?.className || '';
  const matricule = bulletin?.student?.matricule || report?.matricule || '';
  const periodName = bulletin?.period?.name || '';
  const appreciation = data?.teacherComment || getAppreciation(avg);
  const ai = generateAIAnalysis(subjects);

  const mentionColor = getMentionColor(mention);
  const mentionBg = getMentionBg(mention);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* ─── Top Bar ────────────────────────────────────── */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color="#1e293b" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle}>Bulletin</Text>
          <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
            <Ionicons name="share-outline" size={20} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {/* ─── Header Card ────────────────────────────────── */}
        <View style={styles.headerCard}>
          {/* Gradient Top */}
          <View style={styles.headerGradient}>
            <View style={styles.headerCircle1} />
            <View style={styles.headerCircle2} />

            {/* School Row */}
            <View style={styles.schoolRow}>
              <View style={styles.schoolBadge}>
                <Ionicons name="school" size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.schoolName}>EduCI</Text>
                <Text style={styles.schoolSub}>Bulletin Scolaire</Text>
              </View>
              <View style={styles.yearBadge}>
                <Text style={styles.yearText}>2025-2026</Text>
              </View>
            </View>

            {/* Student Row */}
            <View style={styles.studentRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getInitials(studentName)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.studentName}>{studentName}</Text>
                <View style={styles.studentMeta}>
                  <Text style={styles.studentClass}>{className}</Text>
                  <Text style={styles.studentDot}>•</Text>
                  <Text style={styles.studentMat}>Mat. {matricule}</Text>
                </View>
              </View>
              {periodName ? (
                <View style={styles.periodPill}>
                  <Text style={styles.periodText}>{periodName}</Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* ─── Score Orb ────────────────────────────────── */}
          <View style={styles.orbContainer}>
            <View style={styles.orbOuter}>
              <View style={styles.orbInner}>
                <Text style={styles.orbScore}>{avg.toFixed(2)}</Text>
                <Text style={styles.orbMax}>/ 20</Text>
              </View>
              {avg >= 10 && (
                <View style={styles.orbStar}>
                  <Ionicons name="star" size={14} color="#fff" />
                </View>
              )}
            </View>
          </View>

          {/* Mention + Rank */}
          <View style={styles.mentionRankRow}>
            <View style={[styles.mentionBadge, { backgroundColor: mentionBg, borderColor: withAlpha(mentionColor, 0.2) }]}>
              <Text style={styles.mentionEmoji}>{getMentionEmoji(mention)}</Text>
              <Text style={[styles.mentionText, { color: mentionColor }]}>{mention}</Text>
            </View>
            {rank ? (
              <View style={styles.rankContainer}>
                <View style={styles.rankRow}>
                  <Text style={styles.rankNumber}>{rank}</Text>
                  <Text style={styles.rankSuffix}>{getRankSuffix(rank)}</Text>
                </View>
                <Text style={styles.rankSub}>sur {classSize} élèves</Text>
              </View>
            ) : null}
          </View>

          {/* Appreciation */}
          <View style={styles.appreciationCard}>
            <Ionicons name="chatbubble-ellipses" size={16} color="#6366f1" />
            <Text style={styles.appreciationText}>&ldquo;{appreciation}&rdquo;</Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{data?.totalCoefficient?.toFixed(0) || '—'}</Text>
              <Text style={styles.statLabel}>Coeff. total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{subjects.length}</Text>
              <Text style={styles.statLabel}>Matières</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: getScoreColor(avg) }]}>{avg.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Moyenne</Text>
            </View>
          </View>
        </View>

        {/* ─── Tabs ────────────────────────────────────────── */}
        <View style={styles.tabsRow}>
          <TabButton active={activeTab === 'notes'} label="Notes" icon="bar-chart" onPress={() => setActiveTab('notes')} />
          <TabButton active={activeTab === 'evolution'} label="Évolution" icon="trending-up" onPress={() => setActiveTab('evolution')} />
          <TabButton active={activeTab === 'analysis'} label="Analyse IA" icon="sparkles" onPress={() => setActiveTab('analysis')} />
        </View>

        {/* ─── Tab: Notes ──────────────────────────────────── */}
        {activeTab === 'notes' && (
          <View style={styles.section}>
            {subjects.map((entry: any, i: number) => {
              const name = entry.subjectName || entry.subject?.name || '—';
              const coeff = entry.coefficient || entry.subject?.coefficient || 1;
              const avgScore = entry.average || 0;
              const barWidth = Math.min((avgScore / 20) * 100, 100);
              const appreciation = avgScore >= 16 ? 'Excellent'
                : avgScore >= 14 ? 'Très bien'
                : avgScore >= 12 ? 'Bien'
                : avgScore >= 10 ? 'Satisfaisant'
                : 'Insuffisant';

              return (
                <View key={entry.subjectId || i} style={styles.subjectCard}>
                  <View style={styles.subjectTop}>
                    <View style={[styles.subjectIcon, { backgroundColor: getScoreBg(avgScore) }]}>
                      <Text style={[styles.subjectIconText, { color: getScoreColor(avgScore) }]}>
                        {name.charAt(0)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.subjectName}>{name}</Text>
                      <Text style={styles.subjectCoeff}>Coeff. {coeff}</Text>
                    </View>
                    <View style={[styles.subjectScoreContainer, { backgroundColor: getScoreBg(avgScore) }]}>
                      <Text style={[styles.subjectScore, { color: getScoreColor(avgScore) }]}>
                        {avgScore.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.barContainer}>
                    <View style={styles.barBg}>
                      <View
                        style={[
                          styles.barFill,
                          { width: `${barWidth}%`, backgroundColor: getScoreColor(avgScore) }
                        ]}
                      />
                    </View>
                    <Text style={[styles.barLabel, { color: getScoreColor(avgScore) }]}>
                      {appreciation}
                    </Text>
                  </View>
                </View>
              );
            })}
            {subjects.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons name="document-text-outline" size={48} color="#cbd5e1" />
                <Text style={styles.emptyText}>Aucune matière enregistrée</Text>
              </View>
            )}
          </View>
        )}

        {/* ─── Tab: Evolution ──────────────────────────────── */}
        {activeTab === 'evolution' && (
          <View style={styles.section}>
            {evolution.length > 0 ? (
              <>
                {evolution.map((evo: any, i: number) => {
                  const prev = i > 0 ? evolution[i - 1] : null;
                  const diff = prev ? evo.average - prev.average : 0;
                  return (
                    <View key={i} style={styles.evoCard}>
                      <View style={styles.evoLeft}>
                        <Text style={styles.evoPeriod}>{evo.periodName}</Text>
                        {evo.rank && <Text style={styles.evoRank}>Rang #{evo.rank}</Text>}
                      </View>
                      <Text style={[styles.evoAvg, { color: getScoreColor(evo.average) }]}>
                        {evo.average.toFixed(2)}
                      </Text>
                      {prev && (
                        <View style={styles.evoDiffRow}>
                          <Ionicons
                            name={diff > 0 ? 'trending-up' : diff < 0 ? 'trending-down' : 'remove-outline'}
                            size={16}
                            color={diff > 0 ? '#10b981' : diff < 0 ? '#ef4444' : '#94a3b8'}
                          />
                          <Text style={[styles.evoDiff, { color: diff > 0 ? '#10b981' : diff < 0 ? '#ef4444' : '#94a3b8' }]}>
                            {diff > 0 ? '+' : ''}{diff.toFixed(2)}
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="trending-up" size={48} color="#cbd5e1" />
                <Text style={styles.emptyText}>Aucune donnée d'évolution</Text>
              </View>
            )}
          </View>
        )}

        {/* ─── Tab: AI Analysis ────────────────────────────── */}
        {activeTab === 'analysis' && (
          <View style={styles.section}>
            {/* Strengths */}
            {ai.strengths.length > 0 && (
              <View style={[styles.aiCard, { borderColor: '#a7f3d0', backgroundColor: '#f0fdf4' }]}>
                <View style={styles.aiHeader}>
                  <View style={[styles.aiIcon, { backgroundColor: '#dcfce7' }]}>
                    <Ionicons name="checkmark-circle" size={18} color="#059669" />
                  </View>
                  <Text style={[styles.aiTitle, { color: '#065f46' }]}>Points forts</Text>
                </View>
                {ai.strengths.map((s: any, i: number) => (
                  <View key={i} style={styles.aiItem}>
                    <View style={[styles.aiDot, { backgroundColor: '#34d399' }]} />
                    <Text style={[styles.aiItemText, { color: '#065f46' }]}>
                      {s.subjectName || s.subject?.name} — {s.average.toFixed(2)}/20
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Weaknesses */}
            {ai.weaknesses.length > 0 && (
              <View style={[styles.aiCard, { borderColor: '#fecaca', backgroundColor: '#fef2f2' }]}>
                <View style={styles.aiHeader}>
                  <View style={[styles.aiIcon, { backgroundColor: '#fee2e2' }]}>
                    <Ionicons name="warning" size={18} color="#dc2626" />
                  </View>
                  <Text style={[styles.aiTitle, { color: '#991b1b' }]}>Points faibles</Text>
                </View>
                {ai.weaknesses.map((w: any, i: number) => (
                  <View key={i} style={styles.aiItem}>
                    <View style={[styles.aiDot, { backgroundColor: '#f87171' }]} />
                    <Text style={[styles.aiItemText, { color: '#991b1b' }]}>
                      {w.subjectName || w.subject?.name} — {w.average.toFixed(2)}/20
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Recommendations */}
            <View style={[styles.aiCard, { borderColor: '#c7d2fe', backgroundColor: '#eef2ff' }]}>
              <View style={styles.aiHeader}>
                <View style={[styles.aiIcon, { backgroundColor: '#e0e7ff' }]}>
                  <Ionicons name="bulb" size={18} color="#4f46e5" />
                </View>
                <Text style={[styles.aiTitle, { color: '#3730a3' }]}>Recommandations</Text>
              </View>
              {ai.recommendations.map((rec, i) => (
                <View key={i} style={styles.aiRecRow}>
                  <View style={styles.aiRecNumber}>
                    <Text style={styles.aiRecNumText}>{i + 1}</Text>
                  </View>
                  <Text style={[styles.aiRecText, { color: '#3730a3' }]}>{rec}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ─── Footer ──────────────────────────────────────── */}
        <View style={styles.footer}>
          <Ionicons name="school" size={14} color="#94a3b8" />
          <Text style={styles.footerText}>EduCI — Bulletin généré automatiquement</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomTabBar activeTab="learning" onTabPress={(tab) => {
        const r: Record<string, string> = { home: 'Home', learning: 'Learning', payments: 'Payments', messages: 'Messages', profile: 'Profile' };
        navigation.navigate(r[tab] || 'Home');
      }} />
    </SafeAreaView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scrollContent: { paddingBottom: 20 },

  // Loading
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { fontSize: 14, color: '#94a3b8', fontWeight: '500' },

  // Top Bar
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  topBarTitle: { fontSize: 17, fontWeight: '700', color: '#1e293b' },
  shareBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eef2ff', alignItems: 'center', justifyContent: 'center' },

  // Header Card
  headerCard: { marginHorizontal: 16, marginTop: 8, backgroundColor: '#fff', borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 4, overflow: 'hidden' },

  // Gradient Header
  headerGradient: { backgroundColor: '#4f46e5', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24, position: 'relative', overflow: 'hidden' },
  headerCircle1: { position: 'absolute', top: -40, right: -20, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.06)' },
  headerCircle2: { position: 'absolute', bottom: -30, left: -15, width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.04)' },

  // School Row
  schoolRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  schoolBadge: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  schoolName: { fontSize: 15, fontWeight: '700', color: '#fff' },
  schoolSub: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  yearBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  yearText: { fontSize: 11, fontWeight: '700', color: '#fff' },

  // Student Row
  studentRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 20, fontWeight: '800', color: '#fff' },
  studentName: { fontSize: 20, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  studentMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  studentClass: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },
  studentDot: { fontSize: 13, color: 'rgba(255,255,255,0.4)' },
  studentMat: { fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },
  periodPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  periodText: { fontSize: 12, fontWeight: '700', color: '#fff' },

  // Score Orb
  orbContainer: { alignItems: 'center', marginTop: -32, zIndex: 10 },
  orbOuter: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6, position: 'relative' },
  orbInner: { alignItems: 'center' },
  orbScore: { fontSize: 28, fontWeight: '900', color: '#4f46e5', letterSpacing: -0.5 },
  orbMax: { fontSize: 11, fontWeight: '600', color: '#a5b4fc' },
  orbStar: { position: 'absolute', top: -2, right: -2, width: 26, height: 26, borderRadius: 13, backgroundColor: '#f59e0b', alignItems: 'center', justifyContent: 'center', shadowColor: '#f59e0b', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 },

  // Mention + Rank
  mentionRankRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 12, paddingHorizontal: 20 },
  mentionBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  mentionEmoji: { fontSize: 16 },
  mentionText: { fontSize: 14, fontWeight: '700' },
  rankContainer: { alignItems: 'center' },
  rankRow: { flexDirection: 'row', alignItems: 'baseline' },
  rankNumber: { fontSize: 32, fontWeight: '900', color: '#1e293b' },
  rankSuffix: { fontSize: 14, fontWeight: '700', color: '#94a3b8' },
  rankSub: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },

  // Appreciation
  appreciationCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginHorizontal: 20, marginTop: 16, padding: 14, backgroundColor: '#f8fafc', borderRadius: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  appreciationText: { flex: 1, fontSize: 13, color: '#475569', fontStyle: 'italic', lineHeight: 20 },

  // Stats Row
  statsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginHorizontal: 20, marginBottom: 16, backgroundColor: '#f8fafc', borderRadius: 16, padding: 12 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#1e293b' },
  statLabel: { fontSize: 11, color: '#94a3b8', fontWeight: '600', marginTop: 2 },
  statDivider: { width: 1, height: 32, backgroundColor: '#e2e8f0' },

  // Tabs
  tabsRow: { flexDirection: 'row', marginHorizontal: 16, marginTop: 8, marginBottom: 4, backgroundColor: '#f1f5f9', borderRadius: 16, padding: 4 },
  tabBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 12 },
  tabBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  tabLabel: { fontSize: 12, fontWeight: '600', color: '#94a3b8' },
  tabLabelActive: { color: COLORS.primary },

  // Section
  section: { paddingHorizontal: 16, paddingTop: 12, gap: 8 },

  // Subject Card
  subjectCard: { backgroundColor: '#fff', borderRadius: 18, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 6, elevation: 1 },
  subjectTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  subjectIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  subjectIconText: { fontSize: 16, fontWeight: '800' },
  subjectName: { fontSize: 15, fontWeight: '700', color: '#1e293b' },
  subjectCoeff: { fontSize: 11, color: '#94a3b8', fontWeight: '500', marginTop: 2 },
  subjectScoreContainer: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 12 },
  subjectScore: { fontSize: 18, fontWeight: '800' },
  barContainer: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  barBg: { flex: 1, height: 6, backgroundColor: '#f1f5f9', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3 },
  barLabel: { fontSize: 11, fontWeight: '600', minWidth: 70, textAlign: 'right' },

  // Evolution Card
  evoCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 12 },
  evoLeft: { flex: 1 },
  evoPeriod: { fontSize: 14, fontWeight: '700', color: '#1e293b' },
  evoRank: { fontSize: 11, color: '#94a3b8', fontWeight: '500', marginTop: 2 },
  evoAvg: { fontSize: 20, fontWeight: '800' },
  evoDiffRow: { flexDirection: 'row', alignItems: 'center', gap: 4, minWidth: 50 },
  evoDiff: { fontSize: 12, fontWeight: '700' },

  // AI Card
  aiCard: { borderRadius: 18, padding: 16, borderWidth: 1, gap: 10 },
  aiHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiIcon: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  aiTitle: { fontSize: 15, fontWeight: '700' },
  aiItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  aiDot: { width: 6, height: 6, borderRadius: 3 },
  aiItemText: { fontSize: 13, fontWeight: '500' },
  aiRecRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  aiRecNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(79,70,229,0.1)', alignItems: 'center', justifyContent: 'center' },
  aiRecNumText: { fontSize: 11, fontWeight: '800', color: '#4f46e5' },
  aiRecText: { flex: 1, fontSize: 13, lineHeight: 20 },

  // Empty State
  emptyState: { alignItems: 'center', padding: 32, gap: 12 },
  emptyText: { fontSize: 14, color: '#94a3b8', fontWeight: '500' },

  // Footer
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 24, paddingHorizontal: 20 },
  footerText: { fontSize: 11, color: '#94a3b8', fontWeight: '500' },
});
