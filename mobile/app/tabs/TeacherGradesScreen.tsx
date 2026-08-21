import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert, RefreshControl, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../../constants/theme';
import { Card, Button, EmptyState, SkeletonList } from '../../components/ui';
import { getScoreColor } from '../../constants/grades';
import { TeacherTabBar } from '../../components/TeacherTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';

const GRADE_TYPES = (t: any) => [
  { key: 'DEVOIR', label: t('grades.title'), icon: 'create-outline' },
  { key: 'COMPOSITION', label: t('grades.reportCard'), icon: 'document-text-outline' },
  { key: 'EXAMEN', label: t('examPrep.nationalExams'), icon: 'school-outline' },
];

export default function TeacherGradesScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [periods, setPeriods] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<any>(null);
  const [selectedGradeType, setSelectedGradeType] = useState('DEVOIR');
  const [coefficient, setCoefficient] = useState('1');

  const [grades, setGrades] = useState<Record<string, { score: string; bonus: string; isOptional: boolean }>>({});
  const [_existingGrades, setExistingGrades] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [view, setView] = useState<'classes' | 'entry' | 'averages'>('classes');
  const [averages, setAverages] = useState<any>(null);

  useEffect(() => { loadData(); }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [cls, sub, per] = await Promise.all([
        api.getClasses(user?.schoolId),
        api.getSubjects(user?.schoolId),
        api.getPeriods(),
      ]);
      setClasses(cls || []);
      setSubjects(sub || []);
      setPeriods(per || []);
      if (per && per.length > 0) {
        const active = per.find((p: any) => p.isActive) || per[0];
        setSelectedPeriod(active);
      }
    } catch (err: any) {
      Alert.alert(t('common.error'), err.message);
    } finally {
      setLoading(false);
    }
  }

  async function selectClass(cls: any) {
    setSelectedClass(cls);
    try {
      const studs = await api.getStudents(user?.schoolId);
      const classStudents = (studs || []).filter((s: any) => s.classId === cls.id);
      setStudents(classStudents);

      if (selectedSubject && selectedPeriod) {
        const existing = await api.getGrades({
          classId: cls.id,
          term: selectedPeriod.name,
          periodId: selectedPeriod.id,
        });
        setExistingGrades(existing);
      }
      setView('entry');
    } catch (err: any) {
      Alert.alert(t('common.error'), err.message);
    }
  }

  async function loadExistingGrades() {
    if (!selectedClass || !selectedPeriod) return;
    try {
      const existing = await api.getGrades({
        classId: selectedClass.id,
        term: selectedPeriod.name,
        periodId: selectedPeriod.id,
        gradeType: selectedGradeType,
      });
      setExistingGrades(existing);
      const prefilled: Record<string, { score: string; bonus: string; isOptional: boolean }> = {};
      for (const g of existing) {
        if (g.subjectId === selectedSubject?.id) {
          prefilled[g.studentId] = {
            score: String(g.score),
            bonus: String(g.bonus || 0),
            isOptional: g.isOptional,
          };
        }
      }
      if (Object.keys(prefilled).length > 0) {
        setGrades(prefilled);
      }
    } catch {}
  }

  useEffect(() => {
    if (selectedClass && selectedSubject && selectedPeriod) {
      loadExistingGrades();
    }
  }, [selectedSubject, selectedGradeType]);

  const gradedCount = Object.values(grades).filter(v => v.score !== '').length;
  const gradedValues = Object.values(grades).filter(v => v.score !== '').map(v => parseFloat(v.score) || 0);
  const classAvg = gradedValues.length > 0 ? (gradedValues.reduce((a, b) => a + b, 0) / gradedValues.length).toFixed(1) : '—';

  async function handleSave() {
    if (!selectedSubject || !selectedPeriod || !selectedClass) {
      Alert.alert(t('common.error'), t('teacherGrades.selectSubjectAndPeriod'));
      return;
    }
    if (gradedCount === 0) {
      Alert.alert(t('common.error'), t('teacherGrades.noGradesEntered'));
      return;
    }

    setSaving(true);
    try {
      const gradesToSave = students
        .filter(s => grades[s.id]?.score)
        .map(s => ({
          student_id: s.id,
          subject_id: selectedSubject.id,
          school_id: user?.schoolId,
          score: parseFloat(grades[s.id].score),
          max_score: 20,
          grade_type: selectedGradeType,
          coefficient: parseFloat(coefficient) || 1,
          bonus: parseFloat(grades[s.id].bonus) || 0,
          is_optional: grades[s.id].isOptional,
          term: selectedPeriod.name,
          period_id: selectedPeriod.id,
        }));

      await api.createBulkGrades(gradesToSave);
      Alert.alert(t('common.success'), `${gradesToSave.length} ${t('teacherGrades.gradesSaved')}`);
      await loadExistingGrades();
    } catch (err: any) {
      Alert.alert(t('common.error'), err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleValidateAll() {
    if (!selectedClass || !selectedPeriod) return;
    try {
      const unvalidated = await api.getUnvalidatedGrades(selectedClass.id, selectedSubject?.id);
      for (const g of unvalidated) {
        await api.validateGrade(g.id);
      }
      Alert.alert(t('common.success'), `${unvalidated.length} ${t('teacherGrades.gradesValidated')}`);
      await loadExistingGrades();
    } catch (err: any) {
      Alert.alert(t('common.error'), err.message);
    }
  }

  async function handleGenerateBulletins() {
    if (!selectedClass || !selectedPeriod) return;
    try {
      await api.generateBulletins(selectedClass.id, selectedPeriod.id);
      const data = await api.getClassAverages(selectedClass.id, selectedPeriod.id);
      setAverages(data);
      setView('averages');
    } catch (err: any) {
      Alert.alert(t('common.error'), err.message);
    }
  }

  function goBack() {
    if (view === 'averages') {
      setView('entry');
    } else if (view === 'entry') {
      setView('classes');
      setSelectedClass(null);
      setSelectedSubject(null);
      setGrades({});
    }
  }

  if (view === 'averages' && averages) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>{t('teacherGrades.ranking')}</Text>
            <Text style={styles.subtitle}>{selectedClass?.name} — {selectedPeriod?.name}</Text>
          </View>

          {averages.length === 0 ? (
            <EmptyState
              icon={<Ionicons name="analytics-outline" size={32} color={COLORS.outlineVariant} />}
              title={t('teacherGrades.noAverages')}
            />
          ) : (
            averages.map((student: any, idx: number) => (
              <Card key={student.studentId} variant="default" padding="md" style={styles.studentCard}>
                <View style={styles.rankBadge}>
                  <Text style={[styles.rankText, idx < 3 && { color: COLORS.white }]}>
                    {student.rank || '—'}
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: SPACING.md }}>
                  <Text style={styles.studentName}>{student.studentName}</Text>
                  <Text style={styles.studentId}>{student.matricule}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.avgBig, { color: getScoreColor(student.generalAverage) }]}>
                    {student.generalAverage != null ? student.generalAverage.toFixed(2) : '—'}
                  </Text>
                  <Text style={styles.mentionText}>{student.mention}</Text>
                </View>
              </Card>
            ))
          )}
          <View style={{ height: SPACING.xxxl }} />
        </ScrollView>
        </KeyboardAvoidingView>
        <TeacherTabBar activeTab="dashboard" onTabPress={(tab) => {
          const r: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
          navigation.navigate(r[tab] || 'TeacherDashboard');
        }} />
      </SafeAreaView>
    );
  }

  if (view === 'entry' && selectedClass) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}>
          <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
              <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>{selectedClass.name}</Text>
            <Text style={styles.subtitle}>{t('teacherGrades.gradeEntry')}</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: SPACING.lg }} contentContainerStyle={{ gap: SPACING.sm }}>
            {subjects.map((sub) => (
              <Button
                key={sub.id}
                title={sub.name}
                variant={selectedSubject?.id === sub.id ? 'primary' : 'outline'}
                size="sm"
                onPress={() => setSelectedSubject(sub)}
              />
            ))}
          </ScrollView>

          <View style={styles.typeRow}>
            {GRADE_TYPES(t).map((gt) => (
              <Button
                key={gt.key}
                title={gt.label}
                variant={selectedGradeType === gt.key ? 'primary' : 'outline'}
                size="sm"
                iconLeft={<Ionicons name={gt.icon as any} size={14} color={selectedGradeType === gt.key ? COLORS.onPrimary : COLORS.primary} />}
                onPress={() => setSelectedGradeType(gt.key)}
                style={styles.typeBtn}
              />
            ))}
          </View>

          <View style={styles.coeffRow}>
            <Text style={styles.coeffLabel}>{t('teacherGrades.coefficient')}</Text>
            <TextInput
              style={styles.coeffInput}
              value={coefficient}
              onChangeText={setCoefficient}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          <View style={styles.insightsRow}>
            <Card variant="default" padding="md" style={styles.avgCard}>
              <Text style={styles.avgLabel}>{t('teacherGrades.classAverage')}</Text>
              <Text style={styles.avgValue}>{classAvg}<Text style={styles.avgMax}>/20</Text></Text>
            </Card>
            <Card variant="default" padding="md" style={styles.progressInsightCard}>
              <Text style={styles.progressLabel}>{t('teacherGrades.gradedStudents')}</Text>
              <Text style={styles.progressValue}>{gradedCount}/{students.length}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${students.length > 0 ? (gradedCount / students.length) * 100 : 0}%` }]} />
              </View>
            </Card>
          </View>

          {students.map((student) => (
            <Card key={student.id} variant="default" padding="sm" style={styles.studentRow}>
              <View style={styles.studentAvatar}>
                <Text style={styles.studentInitials}>
                  {(student.user?.name || student.name || '??').split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.studentName}>{student.user?.name || student.name}</Text>
                <Text style={styles.studentId}>ID: {student.matricule}</Text>
              </View>
              <TextInput
                style={styles.gradeField}
                placeholder="--"
                placeholderTextColor={COLORS.outline}
                keyboardType="numeric"
                maxLength={5}
                value={grades[student.id]?.score || ''}
                onChangeText={(v) => setGrades(prev => ({
                  ...prev,
                  [student.id]: { score: v, bonus: prev[student.id]?.bonus || '0', isOptional: prev[student.id]?.isOptional || false }
                }))}
              />
              <Text style={styles.gradeMax}>/20</Text>
            </Card>
          ))}

          <View style={styles.btnRow}>
            <Button
              title={t('teacherGrades.clear')}
              variant="ghost"
              size="md"
              onPress={() => { setGrades({}); }}
              style={styles.cancelBtn}
            />
            <Button
              title={saving ? t('teacherGrades.saving') : t('common.save')}
              variant="primary"
              size="md"
              loading={saving}
              onPress={handleSave}
              iconLeft={!saving ? <Ionicons name="save" size={16} color={COLORS.onPrimary} /> : undefined}
              style={styles.saveBtn}
            />
          </View>

          <View style={styles.btnRow}>
            <Button
              title={t('teacherGrades.validateGrades')}
              variant="outline"
              size="md"
              iconLeft={<Ionicons name="checkmark-circle" size={16} color={COLORS.success} />}
              onPress={handleValidateAll}
              style={styles.validateBtn}
            />
            <Button
              title={t('grades.reportCard')}
              variant="outline"
              size="md"
              iconLeft={<Ionicons name="analytics" size={16} color={COLORS.primary} />}
              onPress={handleGenerateBulletins}
              style={styles.bulletinBtn}
            />
          </View>

          <View style={{ height: SPACING.xxxl }} />
        </ScrollView>
        </KeyboardAvoidingView>
        <TeacherTabBar activeTab="dashboard" onTabPress={(tab) => {
          const r: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
          navigation.navigate(r[tab] || 'TeacherDashboard');
        }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('teacherGrades.title')}</Text>
          <Text style={styles.subtitle}>{t('teacherGrades.subtitle')}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: SPACING.lg, marginBottom: SPACING.md }} contentContainerStyle={{ gap: SPACING.sm }}>
          {periods.map((p) => (
            <Button
              key={p.id}
              title={p.name}
              variant={selectedPeriod?.id === p.id ? 'primary' : 'outline'}
              size="sm"
              onPress={() => setSelectedPeriod(p)}
            />
          ))}
        </ScrollView>

        {loading ? (
          <SkeletonList count={4} />
        ) : classes.length === 0 ? (
          <EmptyState
            icon={<Ionicons name="school-outline" size={32} color={COLORS.outlineVariant} />}
            title={t('teacherDashboard.noClasses')}
            subtitle={t('teacherDashboard.noClassesSubtitle')}
          />
        ) : (
          classes.map((cls) => (
            <Card key={cls.id} variant="default" padding="md" onPress={() => selectClass(cls)} style={styles.classCard}>
              <View style={styles.classIcon}>
                <Ionicons name="school" size={20} color={COLORS.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.className}>{cls.name}</Text>
                <Text style={styles.classSub}>{cls._count?.students || 0} {t('teacherAttendance.students')} • {t('home.level')} {cls.level}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
            </Card>
          ))
        )}

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>
      </KeyboardAvoidingView>
      <TeacherTabBar activeTab="dashboard" onTabPress={(tab) => {
        const r: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
        navigation.navigate(r[tab] || 'TeacherDashboard');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xs, gap: SPACING.xs },
  title: { fontSize: FONT_SIZES.xxxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  subtitle: { fontSize: FONT_SIZES.md, color: COLORS.onSurfaceVariant },

  typeRow: { flexDirection: 'row', paddingHorizontal: SPACING.lg, marginTop: SPACING.md, gap: SPACING.sm },
  typeBtn: { flex: 1 },

  coeffRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg, marginTop: SPACING.md, gap: SPACING.md },
  coeffLabel: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant },
  coeffInput: { width: 56, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: BORDER_RADIUS.md, padding: SPACING.sm, textAlign: 'center', fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary, borderWidth: 1, borderColor: COLORS.border },

  classCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md },
  classIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.lg, backgroundColor: COLORS.primaryFixed, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  className: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  classSub: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },

  insightsRow: { flexDirection: 'row', marginHorizontal: SPACING.lg, marginTop: SPACING.lg, gap: SPACING.md },
  avgCard: { flex: 1, backgroundColor: COLORS.primaryFixed },
  avgLabel: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary, letterSpacing: 0.5, marginBottom: SPACING.xs },
  avgValue: { fontSize: 36, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.primary },
  avgMax: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.medium, opacity: 0.6 },
  progressInsightCard: { flex: 1 },
  progressLabel: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, fontWeight: FONT_WEIGHTS.semibold },
  progressValue: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface, marginVertical: SPACING.xs },
  progressBar: { height: 6, backgroundColor: COLORS.surfaceContainer, borderRadius: BORDER_RADIUS.sm, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.sm },

  studentRow: { marginHorizontal: SPACING.lg, marginTop: SPACING.sm },
  studentAvatar: { width: 36, height: 36, borderRadius: BORDER_RADIUS.lg, backgroundColor: COLORS.secondaryFixed, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  studentInitials: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.bold, color: COLORS.secondary },
  studentName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurface },
  studentId: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  gradeField: { width: 52, backgroundColor: COLORS.surfaceContainer, borderRadius: BORDER_RADIUS.md, padding: SPACING.xs, textAlign: 'center', fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.primary },
  gradeMax: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, fontWeight: FONT_WEIGHTS.medium },

  btnRow: { flexDirection: 'row', marginHorizontal: SPACING.lg, marginTop: SPACING.lg, gap: SPACING.md },
  cancelBtn: { flex: 1 },
  saveBtn: { flex: 2 },
  validateBtn: { flex: 1 },
  bulletinBtn: { flex: 1 },

  studentCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.sm },
  rankBadge: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.surfaceContainer, justifyContent: 'center', alignItems: 'center' },
  rankText: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  avgBig: { fontSize: FONT_SIZES.xl, fontWeight: FONT_WEIGHTS.extrabold },
  mentionText: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant, marginTop: 2 },
});
