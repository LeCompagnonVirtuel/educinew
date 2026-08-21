import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';
import { supabase } from '../../services/supabase';

type FilterStatus = 'all' | 'pending' | 'submitted' | 'graded';

interface Assignment {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  max_score?: number;
  subject?: { id: string; name: string };
  class?: { id: string; name: string };
  created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  pending: { label: 'En attente', color: COLORS.warning, bg: '#FEF3C7', icon: 'time-outline' },
  submitted: { label: 'Soumis', color: COLORS.secondary, bg: COLORS.secondaryFixed, icon: 'paper-plane-outline' },
  graded: { label: 'Corrigé', color: COLORS.success, bg: '#ECFDF5', icon: 'checkmark-circle-outline' },
};

export default function StudentAssignmentsScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const loadAssignments = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { data: student } = await supabase
        .from('students').select('id, class_id').eq('user_id', user.id).single();
      if (!student?.class_id) return;
      const { data } = await supabase
        .from('assignments')
        .select('*, subject:subjects(*), class:classes(*)')
        .eq('class_id', student.class_id)
        .order('due_date', { ascending: false });
      setAssignments(data || []);
    } catch (err) {
      console.error('[StudentAssignments]', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  useEffect(() => { loadAssignments(); }, [loadAssignments]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAssignments();
  }, [loadAssignments]);

  const filtered = filter === 'all'
    ? assignments
    : assignments.filter((a) => a.status === filter);

  const openDetail = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setDetailVisible(true);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'graded' || status === 'submitted') return false;
    return new Date(dueDate) < new Date();
  };

  const renderItem = ({ item }: { item: Assignment }) => {
    const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
    const overdue = isOverdue(item.due_date, item.status);

    return (
      <TouchableOpacity style={styles.card} onPress={() => openDetail(item)} activeOpacity={0.7}>
        <View style={styles.cardHeader}>
          <View style={[styles.statusBadge, { backgroundColor: statusCfg.bg }]}>
            <Ionicons name={statusCfg.icon as any} size={14} color={statusCfg.color} />
            <Text style={[styles.statusText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
          </View>
          {overdue && (
            <View style={styles.overdueBadge}>
              <Ionicons name="alert-circle" size={12} color={COLORS.error} />
              <Text style={styles.overdueText}>En retard</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        {item.subject && (
          <Text style={styles.cardSubject}>{item.subject.name}</Text>
        )}
        <View style={styles.cardFooter}>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.onSurfaceVariant} />
            <Text style={[styles.dueDate, overdue && { color: COLORS.error }]}>
              {formatDate(item.due_date)}
            </Text>
          </View>
          {item.status === 'graded' && item.score != null && (
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>
                {item.score}/{item.max_score || 20}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Devoirs</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {(['all', 'pending', 'submitted', 'graded'] as FilterStatus[]).map((f) => {
          const isActive = filter === f;
          const count = f === 'all' ? assignments.length : assignments.filter((a) => a.status === f).length;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {f === 'all' ? 'Tous' : STATUS_CONFIG[f]?.label} ({count})
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.primary} colors={[COLORS.primary]} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={56} color={COLORS.outlineVariant} />
            <Text style={styles.emptyTitle}>Aucun devoir</Text>
            <Text style={styles.emptySubtitle}>
              {filter === 'all' ? "Aucun devoir pour votre classe" : `Aucun devoir ${STATUS_CONFIG[filter]?.label.toLowerCase()}`}
            </Text>
          </View>
        }
      />

      <Modal visible={detailVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedAssignment && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{selectedAssignment.title}</Text>
                    <TouchableOpacity onPress={() => setDetailVisible(false)} style={styles.modalClose}>
                      <Ionicons name="close" size={22} color={COLORS.onSurfaceVariant} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.modalBadges}>
                    <View style={[styles.statusBadge, { backgroundColor: STATUS_CONFIG[selectedAssignment.status]?.bg }]}>
                      <Ionicons name={STATUS_CONFIG[selectedAssignment.status]?.icon as any} size={14} color={STATUS_CONFIG[selectedAssignment.status]?.color} />
                      <Text style={[styles.statusText, { color: STATUS_CONFIG[selectedAssignment.status]?.color }]}>
                        {STATUS_CONFIG[selectedAssignment.status]?.label}
                      </Text>
                    </View>
                    {selectedAssignment.subject && (
                      <View style={styles.subjectBadge}>
                        <Text style={styles.subjectBadgeText}>{selectedAssignment.subject.name}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.detailSection}>
                    <View style={styles.detailRow}>
                      <Ionicons name="calendar-outline" size={18} color={COLORS.primary} />
                      <Text style={styles.detailLabel}>Date limite</Text>
                      <Text style={styles.detailValue}>{formatDate(selectedAssignment.due_date)}</Text>
                    </View>
                    {selectedAssignment.class && (
                      <View style={styles.detailRow}>
                        <Ionicons name="school-outline" size={18} color={COLORS.primary} />
                        <Text style={styles.detailLabel}>Classe</Text>
                        <Text style={styles.detailValue}>{selectedAssignment.class.name}</Text>
                      </View>
                    )}
                    {selectedAssignment.status === 'graded' && selectedAssignment.score != null && (
                      <View style={styles.detailRow}>
                        <Ionicons name="trophy-outline" size={18} color={COLORS.success} />
                        <Text style={styles.detailLabel}>Note</Text>
                        <Text style={[styles.detailValue, { color: COLORS.success, fontWeight: '700' }]}>
                          {selectedAssignment.score}/{selectedAssignment.max_score || 20}
                        </Text>
                      </View>
                    )}
                  </View>

                  {selectedAssignment.description && (
                    <View style={styles.detailSection}>
                      <Text style={styles.detailSectionTitle}>Description</Text>
                      <Text style={styles.descriptionText}>{selectedAssignment.description}</Text>
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText: { color: COLORS.onSurfaceVariant, fontSize: 14 },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: COLORS.onSurface },

  filterRow: { paddingHorizontal: 16, paddingBottom: 12, gap: 8 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  filterText: { fontSize: 13, fontWeight: '600', color: COLORS.onSurfaceVariant },
  filterTextActive: { color: COLORS.onPrimary },

  list: { paddingHorizontal: 16, paddingBottom: 100 },

  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: { fontSize: 12, fontWeight: '700' },
  overdueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: COLORS.errorContainer,
  },
  overdueText: { fontSize: 11, fontWeight: '600', color: COLORS.error },

  cardTitle: { fontSize: 16, fontWeight: '700', color: COLORS.onSurface, marginBottom: 4 },
  cardSubject: { fontSize: 13, color: COLORS.onSurfaceVariant, marginBottom: 10 },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  dueDate: { fontSize: 12, color: COLORS.onSurfaceVariant },
  scoreBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
  },
  scoreText: { fontSize: 13, fontWeight: '700', color: COLORS.success },

  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface, marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: COLORS.onSurfaceVariant, marginTop: 6, textAlign: 'center' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '80%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.outlineVariant,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: COLORS.onSurface, flex: 1, marginRight: 12 },
  modalClose: { padding: 4 },

  modalBadges: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  subjectBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.primaryFixed,
  },
  subjectBadgeText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },

  detailSection: { marginBottom: 20 },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainer,
    gap: 10,
  },
  detailLabel: { fontSize: 14, color: COLORS.onSurfaceVariant, flex: 1 },
  detailValue: { fontSize: 14, fontWeight: '600', color: COLORS.onSurface },
  detailSectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.onSurface, marginBottom: 8 },
  descriptionText: { fontSize: 14, color: COLORS.onSurfaceVariant, lineHeight: 22 },
});
