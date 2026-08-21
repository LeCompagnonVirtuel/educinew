import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: string;
}

export const AiDocumentsScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/ai/documents');
      const json = await response.json();
      setDocuments(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'image': return '🖼️';
      case 'video': return '🎥';
      default: return '📁';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AiDocumentUpload')}>
          <Text style={styles.addButtonText}>+ Ajouter</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Gestion des documents éducatifs</Text>

      {documents.map((doc) => (
        <TouchableOpacity key={doc.id} style={styles.documentCard}>
          <Text style={styles.docIcon}>{getTypeIcon(doc.type)}</Text>
          <View style={styles.docInfo}>
            <Text style={styles.docName}>{doc.name}</Text>
            <Text style={styles.docMeta}>{doc.type.toUpperCase()} - {doc.size}</Text>
            <Text style={styles.docDate}>{doc.uploadedAt}</Text>
          </View>
          <View style={[styles.statusBadge, doc.status === 'analyse' ? styles.analyzedBadge : styles.pendingBadge]}>
            <Text style={[styles.statusText, doc.status === 'analyse' ? styles.analyzedText : styles.pendingText]}>{doc.status}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  addButton: { backgroundColor: '#1565c0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  addButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  documentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  docIcon: { fontSize: 28, marginRight: 12 },
  docInfo: { flex: 1 },
  docName: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 4 },
  docMeta: { fontSize: 12, color: '#666', marginBottom: 2 },
  docDate: { fontSize: 11, color: '#999' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  analyzedBadge: { backgroundColor: '#d4edda' },
  pendingBadge: { backgroundColor: '#fff3cd' },
  statusText: { fontSize: 11, fontWeight: '600' },
  analyzedText: { color: '#155724' },
  pendingText: { color: '#856404' },
});
