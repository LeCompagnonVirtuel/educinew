import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

interface OfflineItem {
  id: string;
  title: string;
  type: string;
  size: string;
  downloadedDate: string;
}

export const LxpOfflineContentScreen: React.FC<{ navigation: unknown }> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<OfflineItem[]>([]);

  useEffect(() => {
    fetchOfflineContent();
  }, []);

  const fetchOfflineContent = async () => {
    try {
      const response = await fetch('/api/lxp/offline-content');
      const json = await response.json();
      setItems(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await fetch(`/api/lxp/offline-content/${id}`, { method: 'DELETE' });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loader} />;

  return (
    <ScrollView style={styles.container}>
      {items.length === 0 && (
        <Text style={styles.empty}>No offline content</Text>
      )}
      {items.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.info}>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.meta}>{item.size} • Downloaded: {item.downloadedDate}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { textAlign: 'center', color: '#666', marginTop: 32 },
  card: { backgroundColor: '#fff', padding: 16, marginHorizontal: 16, marginVertical: 4, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1 },
  type: { fontSize: 10, color: '#4CAF50', fontWeight: '600', textTransform: 'uppercase' },
  title: { fontSize: 16, fontWeight: '600', marginTop: 4 },
  meta: { fontSize: 12, color: '#999', marginTop: 4 },
  deleteButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center' },
  deleteText: { fontSize: 14, color: '#f44336' },
});
