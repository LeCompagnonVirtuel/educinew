import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../../services/supabase';
import { COLORS } from '../../constants/colors';

interface Document {
  id: string;
  title: string;
  type: string;
  url: string;
  status: string;
  created_at: string;
}

const DOC_ICONS: Record<string, string> = {
  bulletin: 'school-outline',
  student_card: 'card-outline',
  teacher_badge: 'person-outline',
  receipt: 'receipt-outline',
  invoice: 'document-text-outline',
  certificate: 'ribbon-outline',
  attestation: 'document-outline',
  enrollment_form: 'clipboard-outline',
};

const DOC_LABELS: Record<string, string> = {
  bulletin: 'Bulletin scolaire',
  student_card: 'Carte d\'élève',
  teacher_badge: 'Badge enseignant',
  staff_badge: 'Badge personnel',
  receipt: 'Reçu de paiement',
  invoice: 'Facture',
  certificate: 'Certificat',
  attestation: 'Attestation',
  enrollment_form: 'Fiche d\'inscription',
};

const STATUS_COLORS: Record<string, string> = {
  READY: '#059669',
  PENDING: '#D97706',
  ERROR: '#DC2626',
};

export default function DocumentViewerScreen({ navigation }: any) {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    if (!user?.schoolId) return;
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('school_id', user.schoolId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        setDocuments(data as Document[]);
      }
    } catch (err) {
      console.error('Load documents error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function handleRefresh() {
    setRefreshing(true);
    loadDocuments();
  }

  async function openDocument(doc: Document) {
    if (!doc.url) {
      Alert.alert('Indisponible', 'Ce document n\'est pas encore prêt.');
      return;
    }
    try {
      await Linking.openURL(doc.url);
    } catch {
      Alert.alert('Erreur', 'Impossible d\'ouvrir le document.');
    }
  }

  async function generateDocument(type: string) {
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;
      if (!token) return;

      const resp = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/generate-pdf`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type,
            data: { userId: user?.id, studentName: user?.name },
          }),
        }
      );

      if (resp.ok) {
        Alert.alert('Succès', 'Document généré avec succès');
        loadDocuments();
      } else {
        const err = await resp.json();
        Alert.alert('Erreur', err.error || 'Échec de la génération');
      }
    } catch (err: any) {
      Alert.alert('Erreur', err.message || 'Échec de la génération');
    }
  }

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  function renderDocument({ item }: { item: Document }) {
    const icon = DOC_ICONS[item.type] || 'document-outline';
    const label = DOC_LABELS[item.type] || item.type;
    const statusColor = STATUS_COLORS[item.status] || '#6B7280';

    return (
      <TouchableOpacity style={styles.docCard} onPress={() => openDocument(item)}>
        <View style={styles.docIcon}>
          <Ionicons name={icon as any} size={24} color={COLORS.primary} />
        </View>
        <View style={styles.docInfo}>
          <Text style={styles.docTitle}>{item.title || label}</Text>
          <Text style={styles.docDate}>{formatDate(item.created_at)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '15' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {item.status === 'READY' ? 'Prêt' : item.status === 'PENDING' ? 'En cours' : 'Erreur'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={COLORS.onSurfaceVariant} />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mes Documents</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Ionicons name="refresh-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
      ) : documents.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="folder-open-outline" size={64} color={COLORS.onSurfaceVariant} />
          <Text style={styles.emptyTitle}>Aucun document</Text>
          <Text style={styles.emptyText}>Vos bulletins, attestations et reçus apparaîtront ici.</Text>
        </View>
      ) : (
        <FlatList
          data={documents}
          keyExtractor={(item) => item.id}
          renderItem={renderDocument}
          contentContainerStyle={styles.list}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}

      <View style={styles.quickActions}>
        <Text style={styles.quickTitle}>Générer un document</Text>
        <View style={styles.quickGrid}>
          {['bulletin', 'attestation', 'certificate'].map((type) => (
            <TouchableOpacity key={type} style={styles.quickBtn} onPress={() => generateDocument(type)}>
              <Ionicons name={(DOC_ICONS[type] || 'document-outline') as any} size={20} color={COLORS.primary} />
              <Text style={styles.quickLabel}>{DOC_LABELS[type]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14 },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.onSurface },
  loader: { flex: 1 },
  list: { paddingHorizontal: 20, paddingBottom: 16 },
  docCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 14, marginBottom: 10, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
  docIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  docInfo: { flex: 1 },
  docTitle: { fontSize: 14, fontWeight: '700', color: COLORS.onSurface },
  docDate: { fontSize: 12, color: COLORS.onSurfaceVariant, marginTop: 2 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginRight: 8 },
  statusText: { fontSize: 11, fontWeight: '700' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: COLORS.onSurface },
  emptyText: { fontSize: 13, color: COLORS.onSurfaceVariant, textAlign: 'center', paddingHorizontal: 40 },
  quickActions: { paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  quickTitle: { fontSize: 13, fontWeight: '700', color: COLORS.onSurfaceVariant, marginBottom: 10 },
  quickGrid: { flexDirection: 'row', gap: 10 },
  quickBtn: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 12, backgroundColor: '#EEF2FF', borderRadius: 12 },
  quickLabel: { fontSize: 11, fontWeight: '600', color: COLORS.primary, textAlign: 'center' },
});
