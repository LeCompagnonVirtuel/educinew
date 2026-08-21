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

type FilterType = 'all' | 'school' | 'class' | 'urgent';

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: 'school' | 'class' | 'urgent' | 'general';
  target_role?: string;
  class_id?: string;
  created_at: string;
  author?: { name: string };
}

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  school: { label: 'École', color: COLORS.primary, bg: COLORS.primaryFixed, icon: 'school-outline' },
  class: { label: 'Classe', color: COLORS.secondary, bg: COLORS.secondaryFixed, icon: 'people-outline' },
  urgent: { label: 'Urgent', color: COLORS.error, bg: COLORS.errorContainer, icon: 'alert-circle-outline' },
  general: { label: 'Général', color: COLORS.onSurfaceVariant, bg: COLORS.surfaceContainerHigh, icon: 'megaphone-outline' },
};

export default function AnnouncementsScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const loadAnnouncements = useCallback(async () => {
    try {
      const data = await api.getAnnouncements();
      setAnnouncements(data || []);
    } catch (err) {
      console.error('[Announcements]', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadAnnouncements(); }, [loadAnnouncements]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAnnouncements();
  }, [loadAnnouncements]);

  const filtered = filter === 'all'
    ? announcements
    : announcements.filter((a) => a.type === filter || (filter === 'urgent' && a.type === 'urgent'));

  const openDetail = (item: Announcement) => {
    setSelectedAnnouncement(item);
    setDetailVisible(true);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  const truncateMessage = (msg: string, maxLen = 100) => {
    if (!msg) return '';
    return msg.length > maxLen ? msg.substring(0, maxLen) + '...' : msg;
  };

  const renderItem = ({ item }: { item: Announcement }) => {
    const typeCfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.general;
    const isUrgent = item.type === 'urgent';

    return (
      <TouchableOpacity
        style={[styles.card, isUrgent && styles.cardUrgent]}
        onPress={() => openDetail(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={[styles.iconCircle, { backgroundColor: typeCfg.bg }]}>
            <Ionicons name={typeCfg.icon as any} size={20} color={typeCfg.color} />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardDate}>{formatDate(item.created_at)}</Text>
          </View>
          {isUrgent && (
            <View style={styles.urgentDot}>
              <Text style={styles.urgentText}>!</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardMessage} numberOfLines={2}>{truncateMessage(item.message)}</Text>
        <View style={styles.cardFooter}>
          <View style={[styles.typeBadge, { backgroundColor: typeCfg.bg }]}>
            <Ionicons name={typeCfg.icon as any} size={12} color={typeCfg.color} />
            <Text style={[styles.typeBadgeText, { color: typeCfg.color }]}>{typeCfg.label}</Text>
          </View>
          {item.target_role && (
            <Text style={styles.targetRole}>{item.target_role}</Text>
          )}
          <Ionicons name="chevron-forward" size={16} color={COLORS.outlineVariant} style={{ marginLeft: 'auto' }} />
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
        <Text style={styles.headerTitle}>Annonces</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {(['all', 'school', 'class', 'urgent'] as FilterType[]).map((f) => {
          const isActive = filter === f;
          const count = f === 'all' ? announcements.length : announcements.filter((a) => a.type === f).length;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              {f !== 'all' && (
                <Ionicons
                  name={TYPE_CONFIG[f]?.icon as any}
                  size={14}
                  color={isActive ? COLORS.onPrimary : TYPE_CONFIG[f]?.color}
                />
              )}
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {f === 'all' ? 'Toutes' : TYPE_CONFIG[f]?.label} ({count})
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
            <Ionicons name="megaphone-outline" size={56} color={COLORS.outlineVariant} />
            <Text style={styles.emptyTitle}>Aucune annonce</Text>
            <Text style={styles.emptySubtitle}>
              {filter === 'all' ? "Aucune annonce pour le moment" : `Aucune annonce de type "${TYPE_CONFIG[filter]?.label}"`}
            </Text>
          </View>
        }
      />

      <Modal visible={detailVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedAnnouncement && (
                <>
                  <View style={styles.modalHeader}>
                    <View style={[styles.modalIcon, { backgroundColor: TYPE_CONFIG[selectedAnnouncement.type]?.bg }]}>
                      <Ionicons
                        name={TYPE_CONFIG[selectedAnnouncement.type]?.icon as any}
                        size={24}
                        color={TYPE_CONFIG[selectedAnnouncement.type]?.color}
                      />
                    </View>
                    <TouchableOpacity onPress={() => setDetailVisible(false)} style={styles.modalClose}>
                      <Ionicons name="close" size={22} color={COLORS.onSurfaceVariant} />
                    </TouchableOpacity>
                  </View>

                  <View style={[styles.modalTypeBadge, { backgroundColor: TYPE_CONFIG[selectedAnnouncement.type]?.bg }]}>
                    <Ionicons
                      name={TYPE_CONFIG[selectedAnnouncement.type]?.icon as any}
                      size={14}
                      color={TYPE_CONFIG[selectedAnnouncement.type]?.color}
                    />
                    <Text style={[styles.modalTypeText, { color: TYPE_CONFIG[selectedAnnouncement.type]?.color }]}>
                      {TYPE_CONFIG[selectedAnnouncement.type]?.label}
                    </Text>
                  </View>

                  <Text style={styles.modalTitle}>{selectedAnnouncement.title}</Text>

                  <View style={styles.modalMeta}>
                    <Ionicons name="time-outline" size={14} color={COLORS.onSurfaceVariant} />
                    <Text style={styles.modalDate}>
                      {formatDate(selectedAnnouncement.created_at)} à {formatTime(selectedAnnouncement.created_at)}
                    </Text>
                  </View>

                  {selectedAnnouncement.author && (
                    <View style={styles.modalMeta}>
                      <Ionicons name="person-outline" size={14} color={COLORS.onSurfaceVariant} />
                      <Text style={styles.modalDate}>{selectedAnnouncement.author.name}</Text>
                    </View>
                  )}

                  {selectedAnnouncement.target_role && (
                    <View style={styles.modalMeta}>
                      <Ionicons name="people-outline" size={14} color={COLORS.onSurfaceVariant} />
                      <Text style={styles.modalDate}>Destinataire: {selectedAnnouncement.target_role}</Text>
                    </View>
                  )}

                  <View style={styles.modalDivider} />

                  <Text style={styles.modalBody}>{selectedAnnouncement.message}</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
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
  cardUrgent: { borderLeftWidth: 4, borderLeftColor: COLORS.error },

  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  iconCircle: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.onSurface },
  cardDate: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  urgentDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentText: { color: COLORS.onError, fontSize: 12, fontWeight: '800' },

  cardMessage: { fontSize: 14, color: COLORS.onSurfaceVariant, lineHeight: 20, marginBottom: 12 },

  cardFooter: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: { fontSize: 11, fontWeight: '700' },
  targetRole: { fontSize: 11, color: COLORS.onSurfaceVariant },

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
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  modalClose: { padding: 4 },

  modalTypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  modalTypeText: { fontSize: 12, fontWeight: '700' },

  modalTitle: { fontSize: 22, fontWeight: '800', color: COLORS.onSurface, marginBottom: 12 },

  modalMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  modalDate: { fontSize: 13, color: COLORS.onSurfaceVariant },

  modalDivider: { height: 1, backgroundColor: COLORS.surfaceContainer, marginVertical: 16 },

  modalBody: { fontSize: 15, color: COLORS.onSurface, lineHeight: 24, paddingBottom: 20 },
});
