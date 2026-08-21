import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function MarketplaceListScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadMarketplace();
  }, []);

  const loadMarketplace = async () => {
    try {
      const response = await fetch('/api/integration/marketplace');
      const json = await response.json();
      setItems(json.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Marketplace</Text>
      {items.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.card} 
          onPress={() => router.push(`/integration/marketplace/${item.id}`)}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{item.price === 0 ? 'Free' : `$${item.price}`}</Text>
            </View>
          </View>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <Text style={styles.cardCategory}>Category: {item.category}</Text>
          <Text style={styles.cardStats}>Rating: {item.rating}/5 | Installs: {item.installCount}</Text>
          <Text style={styles.cardVendor}>By: {item.vendor}</Text>
        </TouchableOpacity>
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
  priceTag: { backgroundColor: '#4CAF50', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  priceText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardDescription: { fontSize: 14, color: '#666', marginTop: 8 },
  cardCategory: { fontSize: 14, color: '#888', marginTop: 4 },
  cardStats: { fontSize: 12, color: '#999', marginTop: 4 },
  cardVendor: { fontSize: 12, color: '#666', marginTop: 4 },
});