import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const AiDocumentUploadScreen: React.FC<{ navigation: { goBack: () => void } }> = ({ navigation }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const documentTypes = [
    { id: 'cours', label: 'Cours', icon: '📚' },
    { id: 'exercice', label: 'Exercice', icon: '✏️' },
    { id: 'evaluation', label: 'Évaluation', icon: '📝' },
    { id: 'presentation', label: 'Présentation', icon: '📊' },
    { id: 'autre', label: 'Autre', icon: '📁' },
  ];

  const handleUpload = async () => {
    setUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigation.goBack();
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Téléchargement Document</Text>
      <Text style={styles.subtitle}>Ajoutez un document pour analyse IA</Text>

      <View style={styles.dropZone}>
        <Text style={styles.dropIcon}>📤</Text>
        <Text style={styles.dropText}>Appuyez pour sélectionner un fichier</Text>
        <Text style={styles.dropHint}>PDF, DOCX, images acceptés</Text>
      </View>

      <Text style={styles.sectionTitle}>Type de document</Text>
      <View style={styles.typesGrid}>
        {documentTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[styles.typeButton, selectedType === type.id && styles.typeButtonActive]}
            onPress={() => setSelectedType(type.id)}
          >
            <Text style={styles.typeIcon}>{type.icon}</Text>
            <Text style={[styles.typeLabel, selectedType === type.id && styles.typeLabelActive]}>{type.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.uploadButton, (!selectedType || uploading) && styles.uploadButtonDisabled]}
        onPress={handleUpload}
        disabled={!selectedType || uploading}
      >
        {uploading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.uploadButtonText}>Télécharger et analyser</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  dropZone: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#ddd', borderStyle: 'dashed', borderRadius: 12, padding: 40, alignItems: 'center', marginBottom: 20 },
  dropIcon: { fontSize: 48, marginBottom: 12 },
  dropText: { fontSize: 16, color: '#333', marginBottom: 4 },
  dropHint: { fontSize: 13, color: '#999' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' },
  typesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20 },
  typeButton: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, alignItems: 'center', borderWidth: 2, borderColor: '#ddd' },
  typeButtonActive: { borderColor: '#1565c0', backgroundColor: '#e3f2fd' },
  typeIcon: { fontSize: 24, marginBottom: 8 },
  typeLabel: { fontSize: 14, color: '#333' },
  typeLabelActive: { color: '#1565c0', fontWeight: '600' },
  uploadButton: { backgroundColor: '#1565c0', borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  uploadButtonDisabled: { backgroundColor: '#ccc' },
  uploadButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
