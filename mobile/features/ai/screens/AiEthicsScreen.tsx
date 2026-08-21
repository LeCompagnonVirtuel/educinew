import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface EthicsPrinciple {
  id: string;
  title: string;
  description: string;
  compliance: number;
  status: string;
}

export const AiEthicsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [principles, setPrinciples] = useState<EthicsPrinciple[]>([]);

  useEffect(() => {
    fetchPrinciples();
  }, []);

  const fetchPrinciples = async () => {
    try {
      const response = await fetch('/api/ai/ethics');
      const json = await response.json();
      setPrinciples(json.data);
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
      <Text style={styles.title}>Éthique IA</Text>
      <Text style={styles.subtitle}>Principes éthiques et conformité</Text>

      <View style={styles.overallCard}>
        <Text style={styles.overallLabel}>Conformité globale</Text>
        <Text style={styles.overallValue}>
          {principles.length > 0 ? Math.round(principles.reduce((a, b) => a + b.compliance, 0) / principles.length) : 0}%
        </Text>
      </View>

      {principles.map((principle) => (
        <View key={principle.id} style={styles.principleCard}>
          <Text style={styles.principleTitle}>{principle.title}</Text>
          <Text style={styles.principleDescription}>{principle.description}</Text>
          <View style={styles.complianceContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${principle.compliance}%` }]} />
            </View>
            <Text style={styles.complianceText}>{principle.compliance}%</Text>
          </View>
          <View style={[styles.statusBadge, principle.compliance >= 80 ? styles.goodBadge : styles.warningBadge]}>
            <Text style={[styles.statusText, principle.compliance >= 80 ? styles.goodText : styles.warningText]}>{principle.status}</Text>
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
  overallCard: { backgroundColor: '#1565c0', borderRadius: 12, padding: 20, marginBottom: 20, alignItems: 'center' },
  overallLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 },
  overallValue: { fontSize: 40, fontWeight: 'bold', color: '#fff' },
  principleCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  principleTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  principleDescription: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 12 },
  complianceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  progressBar: { flex: 1, height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, overflow: 'hidden', marginRight: 12 },
  progressFill: { height: '100%', backgroundColor: '#28a745', borderRadius: 4 },
  complianceText: { fontSize: 14, fontWeight: '600', color: '#333', width: 40, textAlign: 'right' },
  statusBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  goodBadge: { backgroundColor: '#d4edda' },
  warningBadge: { backgroundColor: '#fff3cd' },
  statusText: { fontSize: 12, fontWeight: '600' },
  goodText: { color: '#155724' },
  warningText: { color: '#856404' },
});
