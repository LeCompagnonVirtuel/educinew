import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function FirewallListScreen() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadRules();
  }, []);

  const loadRules = async () => {
    try {
      const response = await fetch('/api/integration/firewall/rules');
      const json = await response.json();
      setRules(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Firewall Rules</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/integration/firewall/rules/new')}>
          <Text style={styles.addButtonText}>+ Add Rule</Text>
        </TouchableOpacity>
      </View>
      
      {rules.map((rule) => (
        <View key={rule.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{rule.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: rule.isActive ? '#4CAF50' : '#FF9800' }]}>
              <Text style={styles.statusText}>{rule.isActive ? 'Active' : 'Inactive'}</Text>
            </View>
          </View>
          <Text style={styles.cardAction}>Action: {rule.action}</Text>
          <Text style={styles.cardDirection}>Direction: {rule.direction}</Text>
          <Text style={styles.cardSource}>Source: {rule.source}</Text>
          <Text style={styles.cardDestination}>Destination: {rule.destination}</Text>
          <Text style={styles.cardPort}>Port: {rule.port}</Text>
          <Text style={styles.cardProtocol}>Protocol: {rule.protocol}</Text>
          <Text style={styles.cardStats}>Hits: {rule.hitCount} | Last Hit: {rule.lastHitAt || 'Never'}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
  addButton: { backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: '600' },
  card: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardAction: { fontSize: 14, color: '#666', marginTop: 8 },
  cardDirection: { fontSize: 14, color: '#888', marginTop: 4 },
  cardSource: { fontSize: 14, color: '#666', marginTop: 4, fontFamily: 'monospace' },
  cardDestination: { fontSize: 14, color: '#888', marginTop: 4, fontFamily: 'monospace' },
  cardPort: { fontSize: 14, color: '#666', marginTop: 4 },
  cardProtocol: { fontSize: 14, color: '#888', marginTop: 4 },
  cardStats: { fontSize: 12, color: '#999', marginTop: 4 },
});