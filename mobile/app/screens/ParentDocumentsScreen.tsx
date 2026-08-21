import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, withAlpha } from '../../constants/colors';
import { useChild } from '../context/ChildContext';
import { api } from '../../services/api';
import ChildSelector from '../../components/ChildSelector';

interface Document {
  id: string;
  title: string;
  type: 'bulletin' | 'certificate' | 'receipt' | 'attestation' | 'convocation' | 'other';
  url: string;
  date: string;
  size?: string;
  period?: string;
}

export default function ParentDocumentsScreen({ navigation }: any) {
  const { selectedChild } = useChild();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = [
    { key: 'all', label: 'Tous', icon: 'documents-outline' },
    { key: 'bulletin', label: 'Bulletins', icon: 'newspaper-outline' },
    { key: 'receipt', label: 'Reçus', icon: 'receipt-outline' },
    { key: 'certificate', label: 'Certificats', icon: 'ribbon-outline' },
    { key: 'other', label: 'Autres', icon: 'folder-outline' },
  ];

  const loadDocuments = useCallback(async () => {
    if (!selectedChild) return;
    try {
      const data = await api.getChildDocuments(selectedChild.id);
      setDocuments(data || []);
    } catch (err) {
      console.error('[ParentDocuments]', err);
    } finally {
      setLoading(false);
    }
  }, [selectedChild?.id]);

  useEffect(() => { setLoading(true); loadDocuments(); }, [loadDocuments]);

  const filtered = selectedType === 'all' ? documents : documents.filter((d) => d.type === selectedType);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bulletin': return { icon: 'newspaper-outline', color: '#4F46E5' };
      case 'certificate': return { icon: 'ribbon-outline', color: '#10B981' };
      case 'receipt': return { icon: 'receipt-outline', color: '#F59E0B' };
      case 'attestation': return { icon: 'document-attach-outline', color: '#8B5CF6' };
      case 'convocation': return { icon: 'mail-outline', color: '#EF4444' };
      default: return { icon: 'document-outline', color: COLORS.onSurfaceVariant };
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      await Linking.openURL(doc.url);
    } catch {
      Alert.alert('Erreur', 'Impossible d\'ouvrir le document.');
    }
  };

  const renderDocument = ({ item }: { item: Document }) => {
    const typeInfo = getTypeIcon(item.type);
    return (
      <TouchableOpacity style={styles.docCard} onPress={() => handleDownload(item)} activeOpacity={0.7}>
        <View style={[styles.docIcon, { backgroundColor: typeInfo.color + '15' }]}>
          <Ionicons name={typeInfo.icon as any} size={20} color={typeInfo.color} />
        </View>
        <View style={styles.docInfo}>
          <Text style={styles.docTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.docMeta}>
            {new Date(item.date).toLocaleDateString('fr-FR')}
            {item.period ? ` • ${item.period}` : ''}
            {item.size ? ` • ${item.size}` : ''}
          </Text>
        </View>
        <Ionicons name="download-outline" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Documents</Text>
        <View style={{ width: 24 }} />
      </View>

      <ChildSelector />

      {/* Type Filter */}
      <FlatList
        horizontal
        data={types}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.typeFilters}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.typeChip, selectedType === item.key && styles.typeChipActive]}
            onPress={() => setSelectedType(item.key)}
          >
            <Ionicons
              name={item.icon as any}
              size={14}
              color={selectedType === item.key ? COLORS.onPrimary : COLORS.onSurfaceVariant}
            />
            <Text style={[styles.typeChipText, selectedType === item.key && styles.typeChipTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {loading ? (
        <View style={styles.loadingCenter}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderDocument}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Ionicons name="documents-outline" size={40} color={COLORS.outlineVariant} />
              <Text style={styles.emptyText}>Aucun document disponible</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.onSurface },
  typeFilters: { paddingHorizontal: 16, gap: 8, marginBottom: 12 },
  typeChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: COLORS.surfaceContainerLow },
  typeChipActive: { backgroundColor: COLORS.primary },
  typeChipText: { fontSize: 12, fontWeight: '600', color: COLORS.onSurfaceVariant },
  typeChipTextActive: { color: COLORS.onPrimary },
  loadingCenter: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: 16, paddingBottom: 40 },
  docCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 14, padding: 14, marginBottom: 8,
  },
  docIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  docInfo: { flex: 1 },
  docTitle: { fontSize: 14, fontWeight: '600', color: COLORS.onSurface },
  docMeta: { fontSize: 11, color: COLORS.onSurfaceVariant, marginTop: 3 },
  emptyBox: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { fontSize: 14, color: COLORS.onSurfaceVariant },
});
