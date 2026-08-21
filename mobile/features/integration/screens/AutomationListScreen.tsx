import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function AutomationListScreen() {
  const [automations, setAutomations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadAutomations();
  }, []);

  const loadAutomations = async () => {
    try {
      const response = await fetch('/api/integration/automations');
      const json = await response.json();
      setAutomations(json.data || []);
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
        <Text style={styles.title}>Automations</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/integration/automations/new')}>
          <Text style={styles.addButtonText}>+ Add Automation</Text>
        </TouchableOpacity>
      </View>
      
      {automations.map((automation) => (
        <TouchableOpacity 
          key={automation.id} 
          style={styles.card} 
          onPress={() => router.push(`/integration/automations/${automation.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{automation.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: automation.isActive ? '#4CAF50' : '#FF9800' }]}>
              <Text style={styles.statusText}>{automation.isActive ? 'Active' : 'Inactive'}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{automation.description}</Text>
          <Text style={styles.cardTrigger}>Trigger: {automation.trigger}</Text>
          <Text style={styles.cardStats}>Runs: {automation.runCount} | Last: {automation.lastRunAt || 'Never'}</Text>
        </TouchableOpacity>
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
  cardDescription: { fontSize: 14, color: '#666', marginTop: 8 },
  cardTrigger: { fontSize: 14, color: '#888', marginTop: 4 },
  cardStats: { fontSize: 12, color: '#999', marginTop: 4 },
});