import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface SecurityEvent {
  id: string;
  type: string;
  description: string;
  severity: string;
  date: string;
  resolved: boolean;
}

export const AiSecurityScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<SecurityEvent[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/ai/security');
      const json = await response.json();
      setEvents(json.data);
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
      <Text style={styles.title}>Sécurité</Text>
      <Text style={styles.subtitle}>Journal des événements de sécurité</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{events.filter((e) => !e.resolved).length}</Text>
          <Text style={styles.statLabel}>Non résolus</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{events.filter((e) => e.severity === 'critique').length}</Text>
          <Text style={styles.statLabel}>Critiques</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{events.filter((e) => e.resolved).length}</Text>
          <Text style={styles.statLabel}>Résolus</Text>
        </View>
      </View>

      {events.map((event) => (
        <View key={event.id} style={[styles.eventCard, event.resolved && styles.resolvedEvent]}>
          <View style={styles.eventHeader}>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(event.severity) + '20' }]}>
              <Text style={[styles.severityText, { color: getSeverityColor(event.severity) }]}>{event.severity}</Text>
            </View>
            <Text style={styles.eventDate}>{event.date}</Text>
          </View>
          <Text style={styles.eventType}>{event.type}</Text>
          <Text style={styles.eventDescription}>{event.description}</Text>
          <View style={styles.eventFooter}>
            <Text style={[styles.statusText, event.resolved ? styles.resolvedText : styles.unresolvedText]}>
              {event.resolved ? 'Résolu' : 'En cours'}
            </Text>
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
  eventCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  resolvedEvent: { opacity: 0.7 },
  eventHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  severityText: { fontSize: 12, fontWeight: '600' },
  eventDate: { fontSize: 12, color: '#999' },
  eventType: { fontSize: 14, fontWeight: '600', color: '#1565c0', marginBottom: 4, textTransform: 'uppercase' },
  eventDescription: { fontSize: 14, color: '#333', lineHeight: 20, marginBottom: 8 },
  eventFooter: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 8 },
  statusText: { fontSize: 12, fontWeight: '600' },
  resolvedText: { color: '#28a745' },
  unresolvedText: { color: '#dc3545' },
});
