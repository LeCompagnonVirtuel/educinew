import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../../services/api';
import { supabase } from '../../services/supabase';

type DocumentCategory = 'all' | 'bulletin' | 'certificate' | 'receipt';

interface StudentDocument {
  id: string;
  name: string;
  type: 'bulletin' | 'certificate' | 'receipt' | string;
  file_url?: string;
  url?: string;
  created_at: string;
  period?: string;
  description?: string;
}

const CATEGORY_CONFIG: Record<string, { label: string; icon: string; color: string; bg: string }> = {
  bulletin: { label: 'Bulletins', icon: 'document-text-outline', color: COLORS.primary, bg: COLORS.primaryFixed },
  certificate: { label: 'Certificats', icon: 'ribbon-outline', color: COLORS.success, bg: '#ECFDF5' },
  receipt: { label: 'Reçus', icon: 'receipt-outline', color: COLORS.tertiary, bg: COLORS.tertiaryFixed },
};

export default function StudentDocumentsScreen({ navigation }: any) {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState<DocumentCategory>('all');

  const loadDocuments = useCallback(async () => {
    if (!user?.id) return;
    try {
      const { data: student } = await supabase
        .from('students').select('id, school_id').eq('user_id', user.id).single();
      if (!student?.id) {
        setDocuments([]);
        return;
      }

      const docs = await api.getChildDocuments(student.id);
      if (docs && docs.length > 0) {
        setDocuments(docs.map((d: any) => ({
          id: d.id, name: d.title || d.name || 'Document', type: d.type || 'other',
          file_url: d.url, url: d.url, created_at: d.date || new Date().toISOString(), period: d.period,
        })));
      } else {
        const bulletins = await api.getStudentBulletins(student.id);
        const mappedDocs: StudentDocument[] = (bulletins || []).map((b: any) => ({
          id: b.id,
          name: `Bulletin ${b.period?.name || ''}`,
          type: 'bulletin',
          file_url: b.fileUrl || b.file_url,
          url: b.url,
          created_at: b.createdAt || new Date().toISOString(),
          period: b.period?.name,
        }));
        setDocuments(mappedDocs);
      }
    } catch (err) {
      console.error('[StudentDocuments]', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [user?.id]);

  useEffect(() => { loadDocuments(); }, [loadDocuments]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadDocuments();
  }, [loadDocuments]);

  const filtered = category === 'all'
    ? documents
    : documents.filter((d) => d.type === category);

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

  const handleDownload = async (doc: StudentDocument) => {
    const url = doc.file_url || doc.url;
    if (!url) return;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (err) {
      console.error('[Documents] download error', err);
    }
  };

  const getDocIcon = (type: string) => {
    const cfg = CATEGORY_CONFIG[type];
    if (cfg) return cfg;
    return { label: type, icon: 'document-outline', color: COLORS.onSurfaceVariant, bg: COLORS.surfaceContainerHigh };
  };

  const getCategoryCount = (cat: string) => {
    if (cat === 'all') return documents.length;
    return documents.filter((d) => d.type === cat).length;
  };

  const renderItem = ({ item }: { item: StudentDocument }) => {
    const typeCfg = getDocIcon(item.type);
    const hasUrl = !!(item.file_url || item.url);

    return (
      <View style={styles.card}>
        <View style={[styles.cardIcon, { backgroundColor: typeCfg.bg }]}>
          <Ionicons name={typeCfg.icon as any} size={24} color={typeCfg.color} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.cardMeta}>
            <Ionicons name="calendar-outline" size={12} color={COLORS.onSurfaceVariant} />
            <Text style={styles.cardDate}>{formatDate(item.created_at)}</Text>
          </View>
          {item.period && (
            <Text style={styles.cardPeriod}>{item.period}</Text>
          )}
        </View>
        {hasUrl && (
          <TouchableOpacity style={styles.downloadBtn} onPress={() => handleDownload(item)}>
            <Ionicons name="download-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
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
        <Text style={styles.headerTitle}>Documents</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.categoryGrid}>
        {(['all', 'bulletin', 'certificate', 'receipt'] as DocumentCategory[]).map((cat) => {
          const isActive = category === cat;
          const cfg = cat === 'all' ? null : CATEGORY_CONFIG[cat];
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryCard, isActive && styles.categoryCardActive]}
              onPress={() => setCategory(cat)}
            >
              <Ionicons
                name={(cat === 'all' ? 'apps-outline' : cfg?.icon) as any}
                size={22}
                color={isActive ? COLORS.onPrimary : (cfg?.color || COLORS.onSurfaceVariant)}
              />
              <Text style={[styles.categoryLabel, isActive && styles.categoryLabelActive]}>
                {cat === 'all' ? 'Tous' : cfg?.label}
              </Text>
              <Text style={[styles.categoryCount, isActive && styles.categoryCountActive]}>
                {getCategoryCount(cat)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

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
            <Ionicons name="folder-open-outline" size={56} color={COLORS.outlineVariant} />
            <Text style={styles.emptyTitle}>Aucun document</Text>
            <Text style={styles.emptySubtitle}>
              {category === 'all'
                ? "Vos documents apparaîtront ici"
                : `Aucun document de type "${CATEGORY_CONFIG[category]?.label}"`}
            </Text>
          </View>
        }
      />
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

  categoryGrid: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 10,
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 4,
  },
  categoryCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryLabel: { fontSize: 11, fontWeight: '600', color: COLORS.onSurfaceVariant },
  categoryLabelActive: { color: COLORS.onPrimary },
  categoryCount: { fontSize: 18, fontWeight: '800', color: COLORS.onSurface },
  categoryCountActive: { color: COLORS.onPrimary },

  list: { paddingHorizontal: 16, paddingBottom: 100 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  cardIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '700', color: COLORS.onSurface },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  cardDate: { fontSize: 12, color: COLORS.onSurfaceVariant },
  cardPeriod: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 2 },
  downloadBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryFixed,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.onSurface, marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: COLORS.onSurfaceVariant, marginTop: 6, textAlign: 'center' },
});
