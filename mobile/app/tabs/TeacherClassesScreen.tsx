import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../../constants/theme';
import { Card, Badge, Button, EmptyState, SkeletonList } from '../../components/ui';
import { TeacherTabBar } from '../../components/TeacherTabBar';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../../services/supabase';

interface ClassInfo {
  id: string;
  name: string;
  level: string;
  subjectName: string;
  studentCount: number;
}

export default function TeacherClassesScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [classes, setClasses] = useState<ClassInfo[]>([]);

  useEffect(() => { loadClasses(); }, [user?.id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadClasses();
    setRefreshing(false);
  }, [user?.id]);

  async function loadClasses() {
    if (!user?.id) return;
    setLoading(true);
    try {
      const { data: teacher } = await supabase
        .from('teachers').select('id').eq('user_id', user.id).single();
      if (!teacher) { setLoading(false); return; }

      const { data: classSubjects } = await supabase
        .from('class_subjects')
        .select('class_id, subject:subjects(name), class:classes(id, name, level)')
        .eq('teacher_id', teacher.id);

      if (!classSubjects || classSubjects.length === 0) {
        setClasses([]);
        setLoading(false);
        return;
      }

      const uniqueClasses = new Map<string, { id: string; name: string; level: string; subjectName: string }>();
      classSubjects.forEach((cs: any) => {
        const classId = cs.class?.id || cs.class_id;
        if (!uniqueClasses.has(classId)) {
          uniqueClasses.set(classId, {
            id: classId,
            name: cs.class?.name || '',
            level: cs.class?.level || '',
            subjectName: cs.subject?.name || '',
          });
        } else {
          const existing = uniqueClasses.get(classId)!;
          existing.subjectName += `, ${cs.subject?.name || ''}`;
        }
      });

      const classIds = Array.from(uniqueClasses.keys());
      const { data: studentCounts } = await supabase
        .from('students')
        .select('class_id')
        .in('class_id', classIds);

      const countMap = new Map<string, number>();
      (studentCounts || []).forEach((s: any) => {
        countMap.set(s.class_id, (countMap.get(s.class_id) || 0) + 1);
      });

      const result: ClassInfo[] = Array.from(uniqueClasses.values()).map(c => ({
        ...c,
        studentCount: countMap.get(c.id) || 0,
      }));

      result.sort((a, b) => a.name.localeCompare(b.name));
      setClasses(result);
    } catch (err) {
      console.error('[TeacherClasses]', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('teacherClasses.title')}</Text>
        </View>
        <SkeletonList count={4} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('teacherClasses.title')}</Text>
        <Badge
          label={`${classes.length} ${classes.length > 1 ? t('teacherClasses.classCountPlural') : t('teacherClasses.classCount')}`}
          variant="info"
          size="sm"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}
        contentContainerStyle={styles.scrollContent}
      >
        {classes.length === 0 ? (
          <EmptyState
            icon={<Ionicons name="school-outline" size={32} color={COLORS.outlineVariant} />}
            title={t('teacherDashboard.noClasses')}
            subtitle={t('teacherDashboard.noClassesSubtitle')}
          />
        ) : (
          classes.map((cls) => (
            <Card key={cls.id} variant="default" padding="md" style={styles.classCard}>
              <View style={styles.classHeader}>
                <View style={styles.classIcon}>
                  <Ionicons name="school" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.classInfo}>
                  <Text style={styles.className}>{cls.name}</Text>
                  <Text style={styles.classSubject}>{cls.subjectName}</Text>
                </View>
                <Badge label={`${cls.studentCount}`} variant="info" size="sm" dot />
              </View>

              <View style={styles.classActions}>
                <Button
                  title={t('teacherDashboard.attendance')}
                  variant="outline"
                  size="sm"
                  iconLeft={<Ionicons name="checkmark-done-outline" size={14} color={COLORS.primary} />}
                  onPress={() => navigation.navigate('TeacherAttendance', { classId: cls.id, className: cls.name })}
                  style={styles.actionBtn}
                />
                <Button
                  title={t('grades.title')}
                  variant="outline"
                  size="sm"
                  iconLeft={<Ionicons name="create-outline" size={14} color={COLORS.tertiary} />}
                  onPress={() => navigation.navigate('TeacherGrades', { classId: cls.id, className: cls.name })}
                  style={styles.actionBtn}
                />
                <Button
                  title={t('studentAssignments.title')}
                  variant="outline"
                  size="sm"
                  iconLeft={<Ionicons name="document-text-outline" size={14} color={COLORS.secondary} />}
                  onPress={() => navigation.navigate('TeacherAssignments', { classId: cls.id, className: cls.name })}
                  style={styles.actionBtn}
                />
              </View>
            </Card>
          ))
        )}
      </ScrollView>

      <TeacherTabBar activeTab="classes" onTabPress={(tab) => {
        const routes: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
        navigation.navigate(routes[tab] || 'TeacherDashboard');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg, paddingBottom: SPACING.md },
  headerTitle: { fontSize: FONT_SIZES.xxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface },
  scrollContent: { paddingBottom: SPACING.xxxl },
  classCard: { marginHorizontal: SPACING.lg, marginBottom: SPACING.md },
  classHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginBottom: SPACING.md },
  classIcon: { width: 44, height: 44, borderRadius: BORDER_RADIUS.lg, backgroundColor: withAlpha(COLORS.primary, 0.1), justifyContent: 'center', alignItems: 'center' },
  classInfo: { flex: 1 },
  className: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  classSubject: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant, marginTop: 2 },
  classActions: { flexDirection: 'row', gap: SPACING.sm, borderTopWidth: 1, borderTopColor: withAlpha(COLORS.outlineVariant, 0.3), paddingTop: SPACING.md },
  actionBtn: { flex: 1 },
});
