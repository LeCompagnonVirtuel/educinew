import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function ThreatListScreen() {
  const [threats, setThreats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadThreats();
  }, []);

  const loadThreats = async () => {
    try {
      const response = await fetch('/api/integration/security/threats');
      const json = await response.json();
      setThreats(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Threat Detections</Text>
      {threats.map((threat) => (
        <View key={threat.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{threat.type}</Text>
            <View style={[styles.severityBadge, { backgroundColor: threat.severity === 'critical' ? '#FF3B30' : threat.severity === 'high' ? '#FF9800' : threat.severity === 'medium' ? '#FFCC00' : '#4CAF50' }]}>
              <Text style={styles.severityText}>{threat.severity}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{threat.description}</Text>
          <Text style={styles.cardSource}>Source IP: {threat.sourceIp}</Text>
          <Text style={styles.cardTarget}>Target: {threat.target}</Text>
          <Text style={styles.cardStatus}>Status: {threat.status}</Text>
          <Text style={styles.cardDate}>Detected: {threat.detectedAt}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', padding: 16 },
  card: { backgroundColor: '#fff', margin: 8, padding: 16, borderRadius: 8, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', flex: 1 },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  severityText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardDescription: { fontSize: 14, color: '#666', marginTop: 8 },
  cardSource: { fontSize: 14, color: '#888', marginTop: 4, fontFamily: 'monospace' },
  cardTarget: { fontSize: 14, color: '#666', marginTop: 4 },
  cardStatus: { fontSize: 14, color: '#333', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#999', marginTop: 4 },
});