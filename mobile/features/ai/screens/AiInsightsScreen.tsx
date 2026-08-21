import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface Insight {
  id: string;
  title: string;
  description: string;
  type: string;
  impact: string;
  date: string;
}

export const AiInsightsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const response = await fetch('/api/ai/insights');
      const json = await response.json();
      setInsights(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance': return '#1565c0';
      case 'tendance': return '#9c27b0';
      case 'alerte': return '#dc3545';
      case 'optimisation': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Insights</Text>
      <Text style={styles.subtitle}>Analyses et recommandations IA</Text>

      {insights.map((insight) => (
        <View key={insight.id} style={styles.insightCard}>
          <View style={styles.cardHeader}>
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor(insight.type) + '20' }]}>
              <Text style={[styles.typeText, { color: getTypeColor(insight.type) }]}>{insight.type}</Text>
            </View>
            <Text style={styles.date}>{insight.date}</Text>
          </View>
          <Text style={styles.insightTitle}>{insight.title}</Text>
          <Text style={styles.insightDescription}>{insight.description}</Text>
          <View style={styles.impactContainer}>
            <Text style={styles.impactLabel}>Impact :</Text>
            <Text style={[styles.impactValue, { color: insight.impact === 'élevé' ? '#dc3545' : insight.impact === 'moyen' ? '#ffc107' : '#28a745' }]}>{insight.impact}</Text>
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
  insightCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  typeText: { fontSize: 12, fontWeight: '600', textTransform: 'capitalize' },
  date: { fontSize: 12, color: '#999' },
  insightTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  insightDescription: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 12 },
  impactContainer: { flexDirection: 'row', alignItems: 'center' },
  impactLabel: { fontSize: 13, color: '#333', marginRight: 6 },
  impactValue: { fontSize: 13, fontWeight: '600' },
});
