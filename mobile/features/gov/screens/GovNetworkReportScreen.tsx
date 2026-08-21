import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

export const GovNetworkReportScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/gov/networks/reports');
      const data = await response.json();
      setItems(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rapports Réseau</Text>
      {items.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card}
          onPress={() => navigation.navigate('GovNetworkReportDetail', { id: item.id })}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.country}</Text>
          <Text style={[styles.badge, { backgroundColor: item.status === 'active' ? '#4caf50' : '#f44336' }]}>
            {item.status}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1a1a1a' },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1a1a1a' },
  cardSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  badge: { fontSize: 12, color: '#fff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, alignSelf: 'flex-start', marginTop: 8, overflow: 'hidden' },
});
