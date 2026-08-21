import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface VoiceFeature {
  id: string;
  title: string;
  description: string;
  status: string;
}

export const AiVoiceScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<VoiceFeature[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/ai/voice/features');
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
      <Text style={styles.title}>Traitement Vocal</Text>
      <Text style={styles.subtitle}>Reconnaissance et synthèse vocale</Text>

      <View style={styles.recorderCard}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordButtonActive]}
          onPress={() => setIsRecording(!isRecording)}
        >
          <Text style={styles.recordIcon}>{isRecording ? '⏹️' : '🎙️'}</Text>
          <Text style={styles.recordLabel}>{isRecording ? 'Arrêter' : 'Enregistrer'}</Text>
        </TouchableOpacity>
        {isRecording && (
          <View style={styles.waveformContainer}>
            <View style={styles.waveform}>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <View key={i} style={[styles.waveBar, { height: Math.random() * 30 + 10 }]} />
              ))}
            </View>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>Fonctionnalités</Text>
      {features.map((feature) => (
        <View key={feature.id} style={styles.featureCard}>
          <Text style={styles.featureTitle}>{feature.title}</Text>
          <Text style={styles.featureDescription}>{feature.description}</Text>
          <View style={[styles.statusBadge, feature.status === 'disponible' ? styles.availableBadge : styles.unavailableBadge]}>
            <Text style={[styles.statusText, feature.status === 'disponible' ? styles.availableText : styles.unavailableText]}>{feature.status}</Text>
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
  recorderCard: { backgroundColor: '#fff', borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  recordButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1565c0', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  recordButtonActive: { backgroundColor: '#dc3545' },
  recordIcon: { fontSize: 32 },
  recordLabel: { fontSize: 14, color: '#fff', marginTop: 4 },
  waveformContainer: { marginTop: 16 },
  waveform: { flexDirection: 'row', alignItems: 'center', gap: 4, height: 40 },
  waveBar: { width: 4, backgroundColor: '#1565c0', borderRadius: 2 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  featureCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12 },
  featureTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  featureDescription: { fontSize: 14, color: '#666', marginBottom: 8 },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  availableBadge: { backgroundColor: '#d4edda' },
  unavailableBadge: { backgroundColor: '#f8d7da' },
  statusText: { fontSize: 12, fontWeight: '600' },
  availableText: { color: '#155724' },
  unavailableText: { color: '#721c24' },
});
