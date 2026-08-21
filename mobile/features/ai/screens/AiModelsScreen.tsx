import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';

interface AiModel {
  id: string;
  name: string;
  description: string;
  version: string;
  status: string;
  capabilities: string[];
}

export const AiModelsScreen: React.FC<{ navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void } }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState<AiModel[]>([]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/ai/models');
      const json = await response.json();
      setModels(json.data);
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
      <Text style={styles.title}>Modèles IA</Text>
      <Text style={styles.subtitle}>Gestion des modèles d'intelligence artificielle</Text>
      {models.map((model) => (
        <TouchableOpacity
          key={model.id}
          style={styles.card}
          onPress={() => navigation.navigate('AiModelDetail', { id: model.id })}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{model.name}</Text>
            <View style={[styles.statusBadge, model.status === 'actif' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{model.status}</Text>
            </View>
          </View>
          <Text style={styles.cardSubtitle}>{model.description}</Text>
          <Text style={styles.cardMeta}>Version: {model.version}</Text>
          <View style={styles.capabilitiesContainer}>
            {model.capabilities.map((capability, index) => (
              <View key={index} style={styles.capabilityBadge}>
                <Text style={styles.capabilityText}>{capability}</Text>
              </View>
            ))}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 16, fontWeight: '600', flex: 1 },
  cardSubtitle: { fontSize: 14, color: '#666', marginBottom: 8 },
  cardMeta: { fontSize: 12, color: '#999', marginBottom: 8 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusActive: { backgroundColor: '#d4edda' },
  statusInactive: { backgroundColor: '#f8d7da' },
  statusText: { fontSize: 12, fontWeight: '600', color: '#333' },
  capabilitiesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  capabilityBadge: { backgroundColor: '#e3f2fd', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  capabilityText: { fontSize: 11, color: '#1565c0' },
});
