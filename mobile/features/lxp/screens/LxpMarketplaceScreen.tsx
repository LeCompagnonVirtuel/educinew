import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
}

export const LxpMarketplaceScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MarketplaceItem[]>([]);

  useEffect(() => {
    fetchMarketplace();
  }, []);

  const fetchMarketplace = async () => {
    try {
      const response = await fetch('/api/lxp/marketplace');
      const json = await response.json();
      setItems(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card} onPress={() => navigation.navigate('MarketplaceDetail', { id: item.id })}>
          <View style={styles.header}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.footer}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.rating}>★ {item.rating.toFixed(1)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 8, borderRadius: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '600', flex: 1 },
  price: { fontSize: 16, fontWeight: '700', color: '#4CAF50' },
  description: { fontSize: 14, color: '#666', marginTop: 4 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  category: { fontSize: 12, color: '#2196F3', backgroundColor: '#E3F2FD', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  rating: { fontSize: 12, color: '#FFC107' },
});
