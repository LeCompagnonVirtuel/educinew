import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../../constants/theme';
import { Card, Badge, Button, EmptyState, SkeletonList } from '../../components/ui';
import { TeacherTabBar } from '../../components/TeacherTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../../services/supabase';

interface ClassItem {
  id: string;
  name: string;
  subjectName: string;
  studentCount: number;
}

interface StudentItem {
  id: string;
  firstName: string;
  lastName: string;
  matricule: string;
}

export default function TeacherAttendanceScreen({ navigation, route }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState<string | null>(route?.params?.classId || null);
  const [selectedClassName, setSelectedClassName] = useState<string>(route?.params?.className || '');
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [teacherId, setTeacherId] = useState<string | null>(null);

  useEffect(() => { loadClasses(); }, [user?.id]);

  useEffect(() => {
    if (selectedClass) {
      loadStudents(selectedClass);
      setAttendance({});
    }
  }, [selectedClass]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (selectedClass) await loadStudents(selectedClass);
    else await loadClasses();
    setRefreshing(false);
  }, [selectedClass, user?.id]);

  async function loadClasses() {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data: teacher } = await supabase
        .from('teachers').select('id').eq('user_id', user.id).single();
      if (!teacher) { setLoading(false); return; }
      setTeacherId(teacher.id);

      const { data: classSubjects } = await supabase
        .from('class_subjects')
        .select('class_id, subject:subjects(name), class:classes(id, name)')
        .eq('teacher_id', teacher.id);

      const uniqueClasses = new Map<string, ClassItem>();
      (classSubjects || []).forEach((cs: any) => {
        const classId = cs.class?.id || cs.class_id;
        if (!uniqueClasses.has(classId)) {
          uniqueClasses.set(classId, { id: classId, name: cs.class?.name || '', subjectName: cs.subject?.name || '', studentCount: 0 });
        }
      });

      const classIds = Array.from(uniqueClasses.keys());
      if (classIds.length > 0) {
        const { data: studentCounts } = await supabase
          .from('students').select('class_id').in('class_id', classIds);
        const countMap = new Map<string, number>();
        (studentCounts || []).forEach((s: any) => {
          countMap.set(s.class_id, (countMap.get(s.class_id) || 0) + 1);
        });
        uniqueClasses.forEach((c, id) => { c.studentCount = countMap.get(id) || 0; });
      }

      setClasses(Array.from(uniqueClasses.values()));
    } catch (err) {
      console.error('[TeacherAttendance]', err);
    } finally {
      setLoading(false);
    }
  }

  async function loadStudents(classId: string) {
    setLoading(true);
    try {
      const { data } = await supabase
        .from('students')
        .select('id, first_name, last_name, matricule')
        .eq('class_id', classId)
        .order('last_name');

      setStudents((data || []).map((s: any) => ({
        id: s.id,
        firstName: s.first_name || '',
        lastName: s.last_name || '',
        matricule: s.matricule || '',
      })));
    } catch (err) {
      console.error('[TeacherAttendance] loadStudents', err);
    } finally {
      setLoading(false);
    }
  }

  const markedCount = Object.keys(attendance).length;
  const progress = students.length > 0 ? Math.round((markedCount / students.length) * 100) : 0;

  const handleMark = (studentId: string, status: string) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAll = (status: string) => {
    const all: Record<string, string> = {};
    students.forEach(s => { all[s.id] = status; });
    setAttendance(all);
  };

  const handleSubmit = async () => {
    if (markedCount === 0) {
      Alert.alert(t('teacherAttendance.attention'), t('teacherAttendance.markAtLeastOne'));
      return;
    }
    setSubmitting(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const records = Object.entries(attendance).map(([studentId, status]) => ({
        student_id: studentId,
        school_id: user?.schoolId,
        class_id: selectedClass,
        teacher_id: teacherId,
        date: today,
        status,
      }));

      const { error } = await supabase.from('attendance').upsert(records, { onConflict: 'student_id,date' });
      if (error) throw error;

      Alert.alert(t('common.success'), `${t('teacherAttendance.attendanceRecorded')} ${markedCount} ${t('teacherAttendance.students')}`, [
        { text: 'OK', onPress: () => { setSelectedClass(null); setSelectedClassName(''); } },
      ]);
    } catch (err: any) {
      Alert.alert(t('common.error'), err?.message || t('teacherAttendance.recordingFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!selectedClass) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('attendance_mark.title')}</Text>
            <Text style={styles.subtitle}>{t('attendance_mark.selectClass')}</Text>
          </View>
          {loading ? (
            <SkeletonList count={4} />
          ) : classes.length === 0 ? (
            <EmptyState
              icon={<Ionicons name="school-outline" size={32} color={COLORS.outlineVariant} />}
              title={t('teacherDashboard.noClasses')}
              subtitle={t('teacherDashboard.noClassesSubtitle')}
            />
          ) : (
            classes.map(cls => (
              <Card key={cls.id} variant="default" padding="md" onPress={() => { setSelectedClass(cls.id); setSelectedClassName(cls.name); }} style={styles.classSelectCard}>
                <View style={styles.classSelectIcon}>
                  <Ionicons name="people" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.classSelectInfo}>
                  <Text style={styles.classSelectName}>{cls.name}</Text>
                  <Text style={styles.classSelectSub}>{cls.studentCount} {t('teacherAttendance.students')} • {cls.subjectName}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
              </Card>
            ))
          )}
          <View style={{ height: SPACING.xxxl }} />
        </ScrollView>
        <TeacherTabBar activeTab="attendance" onTabPress={(tab) => {
          const routes: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
          navigation.navigate(routes[tab] || 'TeacherDashboard');
        }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => { setSelectedClass(null); setSelectedClassName(''); }} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>{selectedClassName || t('teacherDashboard.attendance')}</Text>
          <Text style={styles.subtitle}>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
        </View>

        {loading ? (
          <SkeletonList count={6} />
        ) : (
          <>
            <Card variant="default" padding="md" style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressValue}>{markedCount}<Text style={styles.progressTotal}> / {students.length}</Text></Text>
                <Badge
                  label={`${progress}%`}
                  variant={progress === 100 ? 'success' : 'info'}
                  size="sm"
                />
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
            </Card>

            <View style={styles.quickActions}>
              <Button
                title={t('teacherAttendance.allPresent')}
                variant="outline"
                size="sm"
                iconLeft={<Ionicons name="checkmark-done" size={14} color={COLORS.success} />}
                onPress={() => handleMarkAll('PRESENT')}
                style={styles.quickBtn}
              />
              <Button
                title={t('teacherAttendance.reset')}
                variant="ghost"
                size="sm"
                iconLeft={<Ionicons name="refresh" size={14} color={COLORS.onSurfaceVariant} />}
                onPress={() => setAttendance({})}
                style={styles.quickBtn}
              />
            </View>

            {students.length === 0 ? (
              <EmptyState
                icon={<Ionicons name="people-outline" size={32} color={COLORS.outlineVariant} />}
                title={t('teacherAttendance.noStudents')}
              />
            ) : (
              students.map(student => {
                const status = attendance[student.id];
                const name = `${student.lastName} ${student.firstName}`.trim();
                const initials = `${student.lastName[0] || ''}${student.firstName[0] || ''}`;
                return (
                  <Card key={student.id} variant="default" padding="sm" style={styles.studentCard}>
                    <View style={styles.studentHeader}>
                      <View style={styles.studentAvatar}>
                        <Text style={styles.studentInitials}>{initials}</Text>
                      </View>
                      <View style={styles.studentInfo}>
                        <Text style={styles.studentName}>{name}</Text>
                        {student.matricule ? <Text style={styles.studentId}>{student.matricule}</Text> : null}
                      </View>
                      {status && (
                        <Badge
                          label={status === 'PRESENT' ? t('attendance_mark.present') : status === 'ABSENT' ? t('attendance_mark.absent') : status === 'LATE' ? t('attendance_mark.late') : t('teacherAttendance.justified')}
                          variant={status === 'PRESENT' ? 'success' : status === 'ABSENT' ? 'error' : status === 'LATE' ? 'warning' : 'info'}
                          size="sm"
                          dot
                        />
                      )}
                    </View>
                    <View style={styles.statusBtns}>
                      {[
                        { key: 'PRESENT', label: t('attendance_mark.present'), variant: 'outline' as const },
                        { key: 'ABSENT', label: t('attendance_mark.absent'), variant: 'outline' as const },
                        { key: 'LATE', label: t('attendance_mark.late'), variant: 'outline' as const },
                        { key: 'JUSTIFIED', label: t('teacherAttendance.justified'), variant: 'outline' as const },
                      ].map(btn => (
                        <Button
                          key={btn.key}
                          title={btn.label}
                          variant={status === btn.key ? btn.variant : 'ghost'}
                          size="sm"
                          onPress={() => handleMark(student.id, btn.key)}
                          style={styles.statusBtn}
                        />
                      ))}
                    </View>
                  </Card>
                );
              })
            )}

            {students.length > 0 && (
              <Button
                title={submitting ? t('teacherAttendance.submitting') : t('attendance_mark.validate')}
                variant="primary"
                size="lg"
                loading={submitting}
                disabled={markedCount === 0}
                onPress={handleSubmit}
                iconLeft={!submitting ? <Ionicons name="cloud-upload" size={18} color={COLORS.onPrimary} /> : undefined}
                fullWidth
                style={styles.submitBtn}
              />
            )}
          </>
        )}

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>

      <TeacherTabBar activeTab="attendance" onTabPress={(tab) => {
        const routes: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
        navigation.navigate(routes[tab] || 'TeacherDashboard');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xs },
  backBtn: { marginBottom: SPACING.sm },
  title: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  subtitle: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant, marginTop: 2, textTransform: 'capitalize' },

  classSelectCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md },
  classSelectIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.lg, backgroundColor: withAlpha(COLORS.primary, 0.1), justifyContent: 'center', alignItems: 'center' },
  classSelectInfo: { flex: 1 },
  classSelectName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  classSelectSub: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },

  progressCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  progressValue: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.primary },
  progressTotal: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.regular, color: COLORS.onSurfaceVariant },
  progressBar: { height: 8, backgroundColor: COLORS.surfaceContainer, borderRadius: BORDER_RADIUS.md, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: BORDER_RADIUS.md },

  quickActions: { flexDirection: 'row', gap: SPACING.sm, paddingHorizontal: SPACING.lg, marginTop: SPACING.md, marginBottom: SPACING.xs },
  quickBtn: { flex: 1 },

  studentCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.sm },
  studentHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: SPACING.sm },
  studentAvatar: { width: 38, height: 38, borderRadius: BORDER_RADIUS.lg, backgroundColor: withAlpha(COLORS.secondary, 0.12), justifyContent: 'center', alignItems: 'center' },
  studentInitials: { fontSize: FONT_SIZES.sm, fontWeight: FONT_WEIGHTS.bold, color: COLORS.secondary },
  studentInfo: { flex: 1 },
  studentName: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  studentId: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
  statusBtns: { flexDirection: 'row', gap: SPACING.xs },
  statusBtn: { flex: 1 },

  submitBtn: { marginHorizontal: SPACING.lg, marginTop: SPACING.xl },
});
