import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  actionable: boolean;
}

export const AiRecommendationsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch('/api/ai/recommendations');
      const json = await response.json();
      setRecommendations(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'haute': return '#dc3545';
      case 'moyenne': return '#ffc107';
      case 'basse': return '#28a745';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Recommandations</Text>
      <Text style={styles.subtitle}>Recommandations personnalisées par IA</Text>

      {recommendations.map((rec) => (
        <TouchableOpacity key={rec.id} style={styles.recCard}>
          <View style={styles.cardHeader}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{rec.category}</Text>
            </View>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(rec.priority) + '20' }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(rec.priority) }]}>{rec.priority}</Text>
            </View>
          </View>
          <Text style={styles.recTitle}>{rec.title}</Text>
          <Text style={styles.recDescription}>{rec.description}</Text>
          {rec.actionable && (
            <View style={styles.actionBadge}>
              <Text style={styles.actionText}>Actionnable</Text>
            </View>
          )}
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
  recCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  categoryBadge: { backgroundColor: '#e8eaf6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  categoryText: { fontSize: 12, fontWeight: '600', color: '#3f51b5' },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  priorityText: { fontSize: 12, fontWeight: '600' },
  recTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  recDescription: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 8 },
  actionBadge: { alignSelf: 'flex-start', backgroundColor: '#d4edda', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  actionText: { fontSize: 12, fontWeight: '600', color: '#155724' },
});
