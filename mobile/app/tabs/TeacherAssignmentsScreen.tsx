import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Modal, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS } from '../../constants/theme';
import { Card, Badge, Button, EmptyState, SkeletonList } from '../../components/ui';
import { TeacherTabBar } from '../../components/TeacherTabBar';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../../services/api';
import { supabase } from '../../services/supabase';

interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  className: string;
  classId: string;
  dueDate: string;
  teacherId: string;
  schoolId: string;
  createdAt: string;
  subjectName?: string;
  submissionsCount?: number;
}

interface Subject {
  id: string;
  name: string;
}

interface ClassItem {
  id: string;
  name: string;
}

export default function TeacherAssignmentsScreen({ navigation }: any) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    subjectId: '',
    classId: '',
    dueDate: '',
  });

  useEffect(() => { loadData(); }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const teacherId = user?.id;
      if (!teacherId) return;

      const schoolId = user?.schoolId || (user as any)?.school_id;

      const [classesData, subjectsData] = await Promise.all([
        api.getClasses(schoolId).catch(() => []),
        api.getSubjects(schoolId).catch(() => []),
      ]);

      setClasses(classesData || []);
      setSubjects(subjectsData || []);

      await loadAssignments(teacherId);
    } catch (error) {
      console.error('[TeacherAssignments]', error);
    } finally {
      setLoading(false);
    }
  }

  async function loadAssignments(teacherId: string) {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;
      const schoolId = authUser.user_metadata?.school_id;

      let query = supabase
        .from('assignments')
        .select('*, subject:subjects(name), class:classes(name)')
        .eq('teacher_id', teacherId)
        .order('created_at', { ascending: false });

      if (schoolId) {
        query = query.eq('school_id', schoolId);
      }

      const { data, error } = await query;
      if (error) throw error;

      const list: Assignment[] = (data || []).map((a: any) => ({
        id: a.id,
        title: a.title || '',
        description: a.description || '',
        subjectId: a.subject_id || '',
        classId: a.class_id || '',
        className: a.class?.name || '',
        dueDate: a.due_date || '',
        teacherId: a.teacher_id || '',
        schoolId: a.school_id || '',
        createdAt: a.created_at || '',
        subjectName: a.subject?.name || '',
        submissionsCount: 0,
      }));

      if (list.length > 0) {
        const assignmentIds = list.map(a => a.id);
        const { data: subs } = await supabase
          .from('assignment_submissions')
          .select('assignment_id')
          .in('assignment_id', assignmentIds);

        const countMap: Record<string, number> = {};
        (subs || []).forEach((s: any) => {
          countMap[s.assignment_id] = (countMap[s.assignment_id] || 0) + 1;
        });
        list.forEach(a => {
          a.submissionsCount = countMap[a.id] || 0;
        });
      }

      setAssignments(list);
    } catch (error) {
      console.error('[TeacherAssignments] loadAssignments', error);
      setAssignments([]);
    }
  }

  const filtered = search
    ? assignments.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.subjectName?.toLowerCase().includes(search.toLowerCase()) ||
        a.className.toLowerCase().includes(search.toLowerCase())
      )
    : assignments;

  function resetForm() {
    setForm({ title: '', description: '', subjectId: '', classId: '', dueDate: '' });
    setEditingId(null);
  }

  function openCreateForm() {
    resetForm();
    setFormVisible(true);
  }

  function openEditForm(assignment: Assignment) {
    setForm({
      title: assignment.title,
      description: assignment.description,
      subjectId: assignment.subjectId,
      classId: assignment.classId,
      dueDate: assignment.dueDate,
    });
    setEditingId(assignment.id);
    setFormVisible(true);
  }

  async function handleSubmit() {
    if (!form.title.trim()) {
      Alert.alert(t('common.error'), t('teacherAssignments.titleRequired'));
      return;
    }
    if (!form.classId) {
      Alert.alert(t('common.error'), t('teacherAssignments.classRequired'));
      return;
    }

    setSubmitting(true);
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) throw new Error(t('teacherAssignments.notAuthenticated'));

      const teacherId = user?.id;
      const schoolId = authUser.user_metadata?.school_id;

      if (editingId) {
        const { error } = await supabase
          .from('assignments')
          .update({
            title: form.title.trim(),
            description: form.description.trim(),
            subject_id: form.subjectId || null,
            class_id: form.classId,
            due_date: form.dueDate || null,
          })
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('assignments').insert({
          title: form.title.trim(),
          description: form.description.trim(),
          subject_id: form.subjectId || null,
          class_id: form.classId,
          due_date: form.dueDate || null,
          teacher_id: teacherId,
          school_id: schoolId,
        });
        if (error) throw error;
      }

      setFormVisible(false);
      resetForm();
      if (teacherId) await loadAssignments(teacherId);
    } catch (err: any) {
      Alert.alert(t('common.error'), err?.message || t('teacherAssignments.saveFailed'));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    Alert.alert(
      t('common.delete'),
      t('teacherAssignments.confirmDelete'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase.from('assignments').delete().eq('id', id);
              if (error) throw error;
              if (user?.id) await loadAssignments(user.id);
            } catch (err: any) {
              Alert.alert(t('common.error'), err?.message || t('teacherAssignments.deleteFailed'));
            }
          },
        },
      ]
    );
  }

  function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'short', year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }

  function isOverdue(dateStr: string): boolean {
    if (!dateStr) return false;
    return new Date(dateStr) < new Date();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />}>
        <View style={styles.header}>
          <Text style={styles.label}>{t('teacherAssignments.academicManagement')}</Text>
          <Text style={styles.title}>{t('teacherAssignments.title')}</Text>
        </View>

        <Button
          title={t('teacherAssignments.create')}
          variant="primary"
          size="md"
          iconLeft={<Ionicons name="add" size={18} color={COLORS.onPrimary} />}
          onPress={openCreateForm}
          fullWidth
          style={styles.createBtn}
        />

        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color={COLORS.onSurfaceVariant} />
            <TextInput style={styles.searchInput} placeholder={t('common.search')} placeholderTextColor={COLORS.outline} value={search} onChangeText={setSearch} />
          </View>
        </View>

        {loading ? (
          <SkeletonList count={4} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<Ionicons name="document-text-outline" size={32} color={COLORS.outlineVariant} />}
            title={search ? t('teacherAssignments.noResults') : t('teacherAssignments.empty')}
          />
        ) : (
          filtered.map((assignment) => {
            const overdue = isOverdue(assignment.dueDate);
            return (
              <Card key={assignment.id} variant="default" padding="md" style={styles.assignmentCard}>
                <View style={styles.cardTop}>
                  {assignment.subjectName ? (
                    <Badge label={assignment.subjectName} variant="info" size="sm" />
                  ) : (
                    <Badge label="Général" variant="neutral" size="sm" />
                  )}
                  {overdue && assignment.dueDate && (
                    <Badge label={t('teacherAssignments.late')} variant="error" size="sm" dot pulse />
                  )}
                </View>

                <Text style={styles.assignmentTitle}>{assignment.title}</Text>
                {assignment.description ? (
                  <Text style={styles.assignmentDesc} numberOfLines={2}>{assignment.description}</Text>
                ) : null}

                <View style={styles.cardMeta}>
                  {assignment.className ? (
                    <View style={styles.metaItem}>
                      <Ionicons name="school-outline" size={14} color={COLORS.onSurfaceVariant} />
                      <Text style={styles.metaText}>{assignment.className}</Text>
                    </View>
                  ) : null}
                  {assignment.dueDate ? (
                    <View style={styles.metaItem}>
                      <Ionicons name="calendar-outline" size={14} color={overdue ? COLORS.error : COLORS.onSurfaceVariant} />
                      <Text style={[styles.metaText, overdue && { color: COLORS.error }]}>
                        {formatDate(assignment.dueDate)}
                      </Text>
                    </View>
                  ) : null}
                  <View style={styles.metaItem}>
                    <Ionicons name="document-outline" size={14} color={COLORS.onSurfaceVariant} />
                    <Text style={styles.metaText}>{assignment.submissionsCount || 0} {t('teacherAssignments.submissions')}</Text>
                  </View>
                </View>

                <View style={styles.cardActions}>
                  <Button
                    title={t('common.edit')}
                    variant="ghost"
                    size="sm"
                    iconLeft={<Ionicons name="pencil-outline" size={14} color={COLORS.primary} />}
                    onPress={() => openEditForm(assignment)}
                  />
                  <Button
                    title={t('common.delete')}
                    variant="ghost"
                    size="sm"
                    iconLeft={<Ionicons name="trash-outline" size={14} color={COLORS.error} />}
                    onPress={() => handleDelete(assignment.id)}
                  />
                </View>
              </Card>
            );
          })
        )}

        <View style={{ height: SPACING.xxxl }} />
      </ScrollView>

      <Modal
        visible={formVisible}
        transparent
        animationType="slide"
        onRequestClose={() => { setFormVisible(false); resetForm(); }}
      >
        <View style={styles.modalOverlay}>
          <Card variant="elevated" padding="lg" style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{editingId ? t('teacherAssignments.editAssignment') : t('teacherAssignments.newAssignment')}</Text>
                <Button title="" variant="ghost" size="sm" onPress={() => { setFormVisible(false); resetForm(); }} iconRight={<Ionicons name="close" size={22} color={COLORS.onSurfaceVariant} />} />
              </View>

              <Text style={styles.fieldLabel}>{t('teacherAssignments.titleField')}</Text>
              <TextInput
                style={styles.modalInput}
                placeholder={t('teacherAssignments.titlePlaceholder')}
                placeholderTextColor={COLORS.outline}
                value={form.title}
                onChangeText={(v) => setForm(f => ({ ...f, title: v }))}
              />

              <Text style={styles.fieldLabel}>{t('teacherAssignments.descriptionField')}</Text>
              <TextInput
                style={[styles.modalInput, styles.modalInputMultiline]}
                placeholder={t('teacherAssignments.descriptionPlaceholder')}
                placeholderTextColor={COLORS.outline}
                value={form.description}
                onChangeText={(v) => setForm(f => ({ ...f, description: v }))}
                multiline
                numberOfLines={3}
              />

              <Text style={styles.fieldLabel}>{t('teacherAssignments.classField')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                {classes.map(cls => (
                  <Button
                    key={cls.id}
                    title={cls.name}
                    variant={form.classId === cls.id ? 'primary' : 'outline'}
                    size="sm"
                    onPress={() => setForm(f => ({ ...f, classId: cls.id }))}
                    style={styles.chip}
                  />
                ))}
              </ScrollView>

              <Text style={styles.fieldLabel}>{t('teacherAssignments.subjectField')}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                {subjects.map(sub => (
                  <Button
                    key={sub.id}
                    title={sub.name}
                    variant={form.subjectId === sub.id ? 'primary' : 'outline'}
                    size="sm"
                    onPress={() => setForm(f => ({ ...f, subjectId: f.subjectId === sub.id ? '' : sub.id }))}
                    style={styles.chip}
                  />
                ))}
              </ScrollView>

              <Text style={styles.fieldLabel}>{t('teacherAssignments.dueDateField')}</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="2026-07-15"
                placeholderTextColor={COLORS.outline}
                value={form.dueDate}
                onChangeText={(v) => setForm(f => ({ ...f, dueDate: v }))}
              />

              <View style={styles.modalActions}>
                <Button
                  title={t('common.cancel')}
                  variant="ghost"
                  size="md"
                  onPress={() => { setFormVisible(false); resetForm(); }}
                  disabled={submitting}
                  style={styles.modalCancelBtn}
                />
                <Button
                  title={editingId ? t('teacherAssignments.update') : t('teacherAssignments.createBtn')}
                  variant="primary"
                  size="md"
                  loading={submitting}
                  onPress={handleSubmit}
                  style={styles.modalConfirmBtn}
                />
              </View>
            </ScrollView>
          </Card>
        </View>
      </Modal>

      <TeacherTabBar activeTab="dashboard" onTabPress={(tab) => {
        const r: Record<string, string> = { dashboard: 'TeacherDashboard', classes: 'TeacherClasses', attendance: 'TeacherAttendance', messages: 'Messages', profile: 'TeacherSettings' };
        navigation.navigate(r[tab] || 'TeacherDashboard');
      }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xs },
  label: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant, textTransform: 'uppercase', letterSpacing: 1 },
  title: { fontSize: FONT_SIZES.xxxl, fontWeight: FONT_WEIGHTS.extrabold, color: COLORS.onSurface, marginTop: SPACING.xs },
  createBtn: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg },
  searchRow: { flexDirection: 'row', marginHorizontal: SPACING.lg, marginTop: SPACING.lg, gap: SPACING.sm },
  searchContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceContainer, borderRadius: BORDER_RADIUS.lg, paddingHorizontal: SPACING.md, gap: SPACING.sm },
  searchInput: { flex: 1, paddingVertical: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.onSurface },
  assignmentCard: { marginHorizontal: SPACING.lg, marginTop: SPACING.md, borderWidth: 1, borderColor: withAlpha(COLORS.outlineVariant, 0.06) },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  assignmentTitle: { fontSize: FONT_SIZES.md, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface, marginBottom: SPACING.xs },
  assignmentDesc: { fontSize: FONT_SIZES.sm, color: COLORS.onSurfaceVariant, lineHeight: 18, marginBottom: SPACING.sm },
  cardMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md, marginBottom: SPACING.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: SPACING.xs },
  metaText: { fontSize: FONT_SIZES.xs, color: COLORS.onSurfaceVariant },
  cardActions: { flexDirection: 'row', gap: SPACING.lg, borderTopWidth: 1, borderTopColor: COLORS.surfaceContainer, paddingTop: SPACING.md },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: BORDER_RADIUS.xxl, borderTopRightRadius: BORDER_RADIUS.xxl, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xl },
  modalTitle: { fontSize: FONT_SIZES.lg, fontWeight: FONT_WEIGHTS.bold, color: COLORS.onSurface },
  fieldLabel: { fontSize: FONT_SIZES.xs, fontWeight: FONT_WEIGHTS.semibold, color: COLORS.onSurfaceVariant, marginBottom: SPACING.xs, marginTop: SPACING.sm },
  modalInput: { backgroundColor: COLORS.surfaceContainerLow, borderRadius: BORDER_RADIUS.lg, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, fontSize: FONT_SIZES.md, color: COLORS.onSurface, borderWidth: 1, borderColor: COLORS.outlineVariant, marginBottom: SPACING.sm },
  modalInputMultiline: { minHeight: 80, textAlignVertical: 'top' },
  chipScroll: { marginBottom: SPACING.sm },
  chip: { marginRight: SPACING.sm },
  modalActions: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.lg },
  modalCancelBtn: { flex: 1 },
  modalConfirmBtn: { flex: 1 },
});
