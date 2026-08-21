import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

interface AuditEntry {
  id: string;
  action: string;
  user: string;
  resource: string;
  timestamp: string;
  status: string;
}

export const AiAuditScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [entries, setEntries] = useState<AuditEntry[]>([]);

  useEffect(() => {
    fetchAuditEntries();
  }, []);

  const fetchAuditEntries = async () => {
    try {
      const response = await fetch('/api/ai/audit');
      const json = await response.json();
      setEntries(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succès': return '#28a745';
      case 'échec': return '#dc3545';
      case 'avertissement': return '#ffc107';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Audit</Text>
      <Text style={styles.subtitle}>Journal d'audit des actions IA</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{entries.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#28a745' }]}>{entries.filter((e) => e.status === 'succès').length}</Text>
          <Text style={styles.statLabel}>Succès</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: '#dc3545' }]}>{entries.filter((e) => e.status === 'échec').length}</Text>
          <Text style={styles.statLabel}>Échecs</Text>
        </View>
      </View>

      {entries.map((entry) => (
        <View key={entry.id} style={styles.auditCard}>
          <View style={styles.auditHeader}>
            <Text style={styles.auditAction}>{entry.action}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(entry.status) + '20' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(entry.status) }]}>{entry.status}</Text>
            </View>
          </View>
          <View style={styles.auditBody}>
            <View style={styles.auditRow}>
              <Text style={styles.auditLabel}>Utilisateur</Text>
              <Text style={styles.auditValue}>{entry.user}</Text>
            </View>
            <View style={styles.auditRow}>
              <Text style={styles.auditLabel}>Ressource</Text>
              <Text style={styles.auditValue}>{entry.resource}</Text>
            </View>
          </View>
          <Text style={styles.auditTimestamp}>{entry.timestamp}</Text>
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
  auditCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  auditHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  auditAction: { fontSize: 16, fontWeight: '600', color: '#333', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { fontSize: 12, fontWeight: '600' },
  auditBody: { marginBottom: 8 },
  auditRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  auditLabel: { fontSize: 13, color: '#666' },
  auditValue: { fontSize: 13, color: '#333', fontWeight: '500' },
  auditTimestamp: { fontSize: 12, color: '#999', textAlign: 'right' },
});
