import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { BottomTabBar } from '../../components/BottomTabBar';
import { useLanguage } from '../context/LanguageContext';

export default function ExamPrepScreen({ navigation }: any) {
  const { t } = useLanguage();
  const exams = [
    { name: 'CEPE', desc: 'Primaire', progress: 85, color: COLORS.primary },
    { name: 'BEPC', desc: 'Secondaire', progress: 42, color: COLORS.secondary },
    { name: 'BAC', desc: 'Terminale', progress: 12, color: COLORS.tertiary },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>

        <View style={styles.hero}>
          <Text style={styles.heroTag}>Nouveau — IA Intégrée</Text>
          <Text style={styles.heroTitle}>Prépare tes examens avec <Text style={{ color: COLORS.primary }}>EduCI AI</Text></Text>
          <Text style={styles.heroSub}>Quiz interactifs, annales corrigées et assistant IA pour réussir.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Examens Nationaux</Text>
          {exams.map((exam, i) => (
            <TouchableOpacity key={i} style={styles.examCard} onPress={() => navigation.navigate('AI', { context: 'exam_prep' })}>
              <View style={styles.examTop}>
                <View style={[styles.examBadge, { backgroundColor: withAlpha(exam.color, 0.08) }]}>
                  <Text style={[styles.examBadgeText, { color: exam.color }]}>{exam.name}</Text>
                </View>
                <Text style={styles.examProgress}>{exam.progress}%</Text>
              </View>
              <Text style={styles.examName}>{exam.desc}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${exam.progress}%`, backgroundColor: exam.color }]} />
              </View>
              <TouchableOpacity style={[styles.startBtn, { backgroundColor: exam.color }]} onPress={() => navigation.navigate('AI', { context: 'exam_prep' })}>
                <Text style={styles.startBtnText}>Continuer</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.onPrimary} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ressources Rapides</Text>
          <View style={styles.resourceGrid}>
            {[
              { icon: 'document-text-outline', label: 'Fiches Révision' },
              { icon: 'play-circle-outline', label: 'Cours Vidéos' },
              { icon: 'help-circle-outline', label: 'Quiz Rapides' },
              { icon: 'chatbubbles-outline', label: 'Forum Aide' },
            ].map((res, i) => (
              <TouchableOpacity key={i} style={styles.resourceCard} onPress={() => navigation.navigate('AI', { context: 'exam_prep' })}>
                <Ionicons name={res.icon as any} size={24} color={COLORS.primary} />
                <Text style={styles.resourceLabel}>{res.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  backBtn: { padding: 20, paddingBottom: 0 },
  hero: { paddingHorizontal: 20, marginBottom: 24 },
  heroTag: { fontSize: 12, fontWeight: '700', color: COLORS.primary, marginBottom: 8, letterSpacing: 1 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: COLORS.onSurface, lineHeight: 36 },
  heroSub: { fontSize: 15, color: COLORS.onSurfaceVariant, marginTop: 8, lineHeight: 22 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface, marginBottom: 12 },
  examCard: { backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 20, padding: 20, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
  examTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  examBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  examBadgeText: { fontSize: 12, fontWeight: '800' },
  examProgress: { fontSize: 24, fontWeight: '800', color: COLORS.onSurface },
  examName: { fontSize: 13, color: COLORS.onSurfaceVariant, marginBottom: 12 },
  progressBar: { height: 8, backgroundColor: COLORS.surfaceContainer, borderRadius: 4, marginBottom: 12 },
  progressFill: { height: '100%', borderRadius: 4 },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 12, paddingVertical: 10 },
  startBtnText: { fontSize: 13, fontWeight: '700', color: COLORS.onPrimary },
  resourceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  resourceCard: { width: '47%', backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 16, padding: 16, alignItems: 'center', gap: 8, borderWidth: 1, borderColor: COLORS.outlineVariant },
  resourceLabel: { fontSize: 12, fontWeight: '600', color: COLORS.onSurface, textAlign: 'center' },
});
