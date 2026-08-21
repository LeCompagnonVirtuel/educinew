import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface VisionFeature {
  id: string;
  title: string;
  description: string;
  accuracy: number;
}

export const AiVisionScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<VisionFeature[]>([]);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/ai/vision/features');
      const json = await response.json();
      setFeatures(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Traitement Visuel</Text>
      <Text style={styles.subtitle}>Analyse d'images et reconnaissance visuelle</Text>

      <TouchableOpacity style={styles.uploadZone}>
        <Text style={styles.uploadIcon}>📷</Text>
        <Text style={styles.uploadText}>Analyser une image</Text>
        <Text style={styles.uploadHint}>Capturez ou sélectionnez une image</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Fonctionnalités</Text>
      {features.map((feature) => (
        <View key={feature.id} style={styles.featureCard}>
          <Text style={styles.featureTitle}>{feature.title}</Text>
          <Text style={styles.featureDescription}>{feature.description}</Text>
          <View style={styles.accuracyContainer}>
            <Text style={styles.accuracyLabel}>Précision :</Text>
            <View style={styles.accuracyBar}>
              <View style={[styles.accuracyFill, { width: `${feature.accuracy}%` }]} />
            </View>
            <Text style={styles.accuracyValue}>{feature.accuracy}%</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  uploadZone: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#1565c0', borderStyle: 'dashed', borderRadius: 16, padding: 32, alignItems: 'center', marginBottom: 20 },
  uploadIcon: { fontSize: 48, marginBottom: 12 },
  uploadText: { fontSize: 16, fontWeight: '600', color: '#1565c0', marginBottom: 4 },
  uploadHint: { fontSize: 13, color: '#666' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  featureCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  featureTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  featureDescription: { fontSize: 14, color: '#666', marginBottom: 12 },
  accuracyContainer: { flexDirection: 'row', alignItems: 'center' },
  accuracyLabel: { fontSize: 13, color: '#333', marginRight: 8 },
  accuracyBar: { flex: 1, height: 6, backgroundColor: '#e0e0e0', borderRadius: 3, overflow: 'hidden', marginRight: 8 },
  accuracyFill: { height: '100%', backgroundColor: '#28a745', borderRadius: 3 },
  accuracyValue: { fontSize: 13, fontWeight: '600', color: '#28a745', width: 40 },
});
