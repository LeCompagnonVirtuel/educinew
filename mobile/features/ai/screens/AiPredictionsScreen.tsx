import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface Prediction {
  id: string;
  subject: string;
  studentName: string;
  predictedScore: number;
  confidence: number;
  riskLevel: string;
}

export const AiPredictionsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await fetch('/api/ai/predictions');
      const json = await response.json();
      setPredictions(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'élevé': return '#dc3545';
      case 'moyen': return '#ffc107';
      case 'faible': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Prédictions</Text>
      <Text style={styles.subtitle}>Prédictions de performance par IA</Text>

      {predictions.map((prediction) => (
        <View key={prediction.id} style={styles.predictionCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.studentName}>{prediction.studentName}</Text>
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(prediction.riskLevel) + '20' }]}>
              <Text style={[styles.riskText, { color: getRiskColor(prediction.riskLevel) }]}>{prediction.riskLevel}</Text>
            </View>
          </View>
          <Text style={styles.subject}>{prediction.subject}</Text>
          <View style={styles.predictionBody}>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>Score prédit</Text>
              <Text style={styles.predictionValue}>{prediction.predictedScore}%</Text>
            </View>
            <View style={styles.predictionItem}>
              <Text style={styles.predictionLabel}>Confiance</Text>
              <Text style={styles.predictionValue}>{prediction.confidence}%</Text>
            </View>
          </View>
          <View style={styles.confidenceBar}>
            <View style={[styles.confidenceFill, { width: `${prediction.confidence}%` }]} />
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
  predictionCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  studentName: { fontSize: 16, fontWeight: '600', color: '#333' },
  subject: { fontSize: 14, color: '#666', marginBottom: 12 },
  riskBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  riskText: { fontSize: 12, fontWeight: '600' },
  predictionBody: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  predictionItem: { alignItems: 'center' },
  predictionLabel: { fontSize: 12, color: '#666', marginBottom: 4 },
  predictionValue: { fontSize: 20, fontWeight: 'bold', color: '#1565c0' },
  confidenceBar: { height: 6, backgroundColor: '#e0e0e0', borderRadius: 3, overflow: 'hidden' },
  confidenceFill: { height: '100%', backgroundColor: '#1565c0', borderRadius: 3 },
});
