import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface ModerationItem {
  id: string;
  content: string;
  type: string;
  severity: string;
  status: string;
  date: string;
}

export const AiModerationScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ModerationItem[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/ai/moderation');
      const json = await response.json();
      setItems(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critique': return '#dc3545';
      case 'élevé': return '#fd7e14';
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
      <Text style={styles.title}>Modération</Text>
      <Text style={styles.subtitle}>Surveillance et modération du contenu IA</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{items.filter((i) => i.status === 'en attente').length}</Text>
          <Text style={styles.statLabel}>En attente</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{items.filter((i) => i.status === 'traité').length}</Text>
          <Text style={styles.statLabel}>Traités</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{items.filter((i) => i.severity === 'critique').length}</Text>
          <Text style={styles.statLabel}>Critiques</Text>
        </View>
      </View>

      {items.map((item) => (
        <View key={item.id} style={styles.moderationCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.contentType}>{item.type}</Text>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) + '20' }]}>
              <Text style={[styles.severityText, { color: getSeverityColor(item.severity) }]}>{item.severity}</Text>
            </View>
          </View>
          <Text style={styles.content}>{item.content}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.status}>{item.status}</Text>
            <Text style={styles.date}>{item.date}</Text>
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
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 16, marginHorizontal: 4, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#1565c0' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  moderationCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  contentType: { fontSize: 13, fontWeight: '600', color: '#1565c0', textTransform: 'uppercase' },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  severityText: { fontSize: 12, fontWeight: '600' },
  content: { fontSize: 14, color: '#333', lineHeight: 20, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 },
  status: { fontSize: 12, color: '#666' },
  date: { fontSize: 12, color: '#999' },
});
