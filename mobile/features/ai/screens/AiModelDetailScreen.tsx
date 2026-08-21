import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface ModelDetail {
  id: string;
  name: string;
  description: string;
  version: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  accuracy: number;
  latency: number;
  usageCount: number;
  capabilities: string[];
  parameters: { key: string; value: string }[];
}

export const AiModelDetailScreen: React.FC<{ route: { params: { id: string } } }> = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [model, setModel] = useState<ModelDetail | null>(null);

  useEffect(() => {
    fetchModelDetail();
  }, []);

  const fetchModelDetail = async () => {
    try {
      const response = await fetch(`/api/ai/models/${route.params.id}`);
      const json = await response.json();
      setModel(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!model) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Modèle non trouvé</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{model.name}</Text>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{model.status}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.sectionText}>{model.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métriques</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{model.accuracy}%</Text>
            <Text style={styles.metricLabel}>Précision</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{model.latency}ms</Text>
            <Text style={styles.metricLabel}>Latence</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{model.usageCount}</Text>
            <Text style={styles.metricLabel}>Utilisations</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Capacités</Text>
        <View style={styles.capabilitiesContainer}>
          {model.capabilities.map((capability, index) => (
            <View key={index} style={styles.capabilityBadge}>
              <Text style={styles.capabilityText}>{capability}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paramètres</Text>
        {model.parameters.map((param, index) => (
          <View key={index} style={styles.paramRow}>
            <Text style={styles.paramKey}>{param.key}</Text>
            <Text style={styles.paramValue}>{param.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informations</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>{model.version}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Créé le</Text>
          <Text style={styles.infoValue}>{model.createdAt}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Mis à jour le</Text>
          <Text style={styles.infoValue}>{model.updatedAt}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#1a1a1a' },
  statusBadge: { alignSelf: 'flex-start', backgroundColor: '#d4edda', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, marginBottom: 16 },
  statusText: { fontSize: 14, fontWeight: '600', color: '#155724' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#333' },
  sectionText: { fontSize: 14, color: '#666', lineHeight: 20 },
  metricsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  metricCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, marginHorizontal: 4, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  metricValue: { fontSize: 20, fontWeight: 'bold', color: '#1565c0' },
  metricLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  capabilitiesContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  capabilityBadge: { backgroundColor: '#e3f2fd', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  capabilityText: { fontSize: 13, color: '#1565c0' },
  paramRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  paramKey: { fontSize: 14, color: '#333' },
  paramValue: { fontSize: 14, color: '#666' },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  infoLabel: { fontSize: 14, color: '#333' },
  infoValue: { fontSize: 14, color: '#666' },
});
